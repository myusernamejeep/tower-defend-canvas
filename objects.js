//Tower @OBJECT
function Tower(x, y, imgsrc){
  //Declare object variables
  this.img = new Image();
  this.img.src = imgsrc;
  this.width = this.img.width;
  this.height = this.img.height;
  this.speed = 2;
  this.destEnemy = allEnemies[0];
  this.range = 150 //Range in pixels(ish)
  this.damage = 10;
  this.cost = 50;
  this.bulletSize = 2.5;
  this.bulletColor = "rgb(0,0,0)";
  this.rangeFlag = -1; //display range flag bool -1 = false, 1 = true
  this.bulletSpeed = 2;
  this.upgrades = new Array();
  this.upgradeButtons = new Array();
  //Subtracting half of width and height centers object on mouse cursor
  this.x = x;
  this.y = y;
  //Firing timer
  this.fTimer = 0;
  //Firing bool
  this.isFiring = false;
  //Array of bullets for this Tower
  this.allBullets = new Array();
  //List of methods for object
  this.draw = draw;
  this.shoot = shoot;
  this.getEnemy = getEnemy;
  this.detectBulletCollision = detectBulletCollision;
  //METHODS:
  function draw(){
	//Draw tower so it's centered around its coordinates 
        //ctx.strokeRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	ctx.drawImage(this.img,this.x-(this.width/2), this.y-(this.height/2));
	//Draw range circle
	if(this.rangeFlag==1){
            ctx.fillStyle = "rgba(100,100,200,.2)";
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.range,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgb(0,0,0)";

	}
	//End draw range circle
	if(this.fTimer>=_FPS/this.speed){
	  this.destEnemy = this.getEnemy();
	  this.shoot(this.destEnemy);
	  this.fTimer = 0;
	}
	this.fTimer++;
  }  
  function shoot(destEnemy){
	  //Calculate speed of bullet to shoot at enemy
	  var modx = 0;
	  var mody = 0;
	  var hyp = 0;
	  //Judge distance
	  modx = destEnemy.x - this.x;
	  mody = destEnemy.y - this.y;
	  //Normalize speed
	  hyp = Math.sqrt(Math.pow(modx,2)+Math.pow(mody,2));
	  modx = (modx*this.bulletSpeed)/hyp;
	  mody = (mody*this.bulletSpeed)/hyp;
	  //Aim slightly in front of enemy
	  modx += (destEnemy.modx);
	  mody += (destEnemy.mody);
	  
	  this.allBullets.push(new Bullet(this.x,this.y,modx,mody,this.bulletSize,this.bulletSize,this.bulletColor));	  
  }
  function getEnemy(){
	  //Declare variables
	  var whichEnemy=new Array();
	  var isValid = true;
	  var dist1=0;
	  var dist2=1;
	  var temp; //temporary number storage for switching elements
	  //Select which enemy to get based on location
	  for(var i=0;i<allEnemies.length;i++){		  
		  dist1 = distance(this.x,this.y,allEnemies[i].x,allEnemies[i].y);
		  if(dist1<this.range)
		    whichEnemy.push(i);
	  }
	  for(var i=0;i<whichEnemy.length;i++){ 
	  	  dest1 = distance(this.x,this.y,allEnemies[whichEnemy[i]].x,allEnemies[whichEnemy[i]].y);
		  dest2 = distance(this.x,this.y,allEnemies[whichEnemy[0]].x,allEnemies[whichEnemy[0]].y);
		  if(dest1<dest2){
		    temp = whichEnemy[0];
			whichEnemy[0] = whichEnemy[i];
			whichEnemy[i] = temp;
		  }
	  }//end for
	  if(whichEnemy[0]!=null)
	    return allEnemies[whichEnemy[0]];
	  return false;
  }
  
  function detectBulletCollision(bulletNum,enemyArray){
	var bullet = this.allBullets[bulletNum];
    for(var i=0;i<enemyArray.length;i++){
	  if(bullet.x<enemyArray[i].x+enemyArray[i].width && bullet.x>enemyArray[i].x-enemyArray[i].width)
	    if(bullet.y<enemyArray[i].y+enemyArray[i].height && bullet.y>enemyArray[i].y-enemyArray[i].height)
		  return i;
	}//end for
	if(this.destEnemy)
		return -1;
	else
		return -2;
  }
  
}

//Enemy @OBJECT
function Enemy(x,y){
	//Set object size and declare object variables
	this.width = 25;
	this.height = 25;
	this.x = x;
	this.y = y;
	this.modx = 0;
	this.mody = 0;
	this.draw = draw;
	this.flag = false;
	this.goTo = goTo;
	this.destI = 1;
	this.destArray = _DESTARRAY;
	this.goTo(this.destArray[this.destI][0],this.destArray[this.destI][1]);
	this.isMoving = true;
        this.reward = 20;
    this.color = "rgb(0,0,0)";
	this.healthColor = "rgb(255,255,255)";
	this.health = 100;
	
	//METHODS:
	function draw(){	   
      if(this.destI < this.destArray.length){			
	  if(this.isMoving == true){
	  	if((Math.floor(this.x) > this.destArray[this.destI][0]-5 && Math.floor(this.x) < this.destArray[this.destI][0]+5)
		   && 
		   (Math.floor(this.y) > this.destArray[this.destI][1]-5) && (Math.floor(this.y) < this.destArray[this.destI][1]+5))
		  this.isMoving = false
	  }else{		  	
		this.destI++;
		this.goTo(this.destArray[this.destI][0],this.destArray[this.destI][1]);
		this.isMoving = true;
	  }

	//this.goTo(this.destArray[this.destI][0],this.destArray[this.destI][1]);
	  	
	  this.x += this.modx;
	  this.y += this.mody;
	  }
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height);
	  ctx.fillStyle = this.healthColor;
	  //Draw enemy health on top of enemy
  	  ctx.font = "bold 12px sans-serif";
 	  ctx.fillText(this.health, this.x-this.width/2,this.y);
	  //ctx.fillText("X: "+Math.floor(this.x)+"/Y: "+Math.floor(this.y),this.x-this.width,this.y+this.height);
	}
	function goTo(x,y){
	  //alert("x: "+x+" y: "+y);
      var modx = x - this.x;
	  var mody = y - this.y;
	  var hyp = 0;
	  //Normalize speed
	  hyp = Math.sqrt(Math.pow(modx,2)+Math.pow(mody,2));
	  modx = (modx)/hyp;
	  mody = (mody)/hyp;
	  this.modx = modx*_ESPEED;
	  this.mody = mody*_ESPEED;
	}	
}

//Bullet @OBJECT
function Bullet(x,y,modx,mody,width,height,color){
	//Bullet's position on the canvas
	this.x=x;
	this.y=y;
	this.width = width;
	this.height = height;
	this.color = color;
	//Modifiers decide which way the bullet should go
	this.modx = modx;
	this.mody = mody;
	//List of methods for this object
	this.shootTowards = shootTowards;
	this.draw = draw;
	//METHODS:
	function shootTowards(){
		this.x+=this.modx;
		this.y+=this.mody;
	 	this.draw();
	}
	function draw(){
		ctx.beginPath();
		var temp = ctx.fillStyle;
		ctx.fillStyle = this.color;
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = temp;
	}
}

//Player @OBJECT
function Player(money,health){
	//Declare player variables
	this.money = money;
	this.health = health;
	this.maintenance = maintenance;
	function maintenance(){
	  if(this.health<0)
	    youLose();
	}
	
}

function Button(x,y,width,height, text, value){
    this.x=x;
    this.y=y;
    this.width = width;
    this.height = height;
    this.wasIClickedOn = wasIClickedOn;
	this.draw = draw;
	this.fill = "rgb(0,0,0)";
	this.text = text;
        this.value = value;
	
    
    function wasIClickedOn(){
      if(_MOUSEX<this.x+this.width && _MOUSEX>this.x-this.width){
        if(_MOUSEY<this.y+this.height && _MOUSEY>this.y-this.height){
  	      return true;  
          }    
      } 
      return false;
    }
    
    function draw(){
      ctx.fillStyle = this.fill;
      ctx.fillRect(this.x,this.y,this.width,this.height);
  	  ctx.font = "bold 12px sans-serif";
	  ctx.fillStyle = "rgb(255,255,255)";
 	  ctx.fillText(this.text, this.x+5, this.y+this.height/2);
	  ctx.fillStyle = "rgb(0,0,0)";
    }		
}

