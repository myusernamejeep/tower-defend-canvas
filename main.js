// JavaScript Document

//Declare constants
var canvas;
var ctx;
var _WIDTH = 0;
var _HEIGHT = 0;
var _FPS = 60;
var _MOUSEX;
var _MOUSEY;
var _ESPEED=1;
var _WAVECOUNT=0;
var _WAVETIME = 30000;//ten seconds

//Object stacks
var allTowers = new Array();
var allEnemies = new Array();

//Other globals
var player;
var button = new Array();
var towerButtons = new Array();
var selectedTower = -1;

//We even have variables for our timers
var enemyTimer;
var spawnTimer;
var waveTimer;
var waveTime = "Soon...";

var _CURRTOWER = ""; //Current tower global (Which tower will be built upon click)

//Reference towers
var littleEx;
var bigEx;
var flameEx;
var deleteEx;
var laserEx;
var laserEx2;
//Reference enemies
var l;
var b;



//INIT FUNCTION
function init(){
	//Retrieves canvas pointer, gets context, validates constants...
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
        canvas.width = _BG.width;
        canvas.height = _BG.height;
	_WIDTH = canvas.width;
	_HEIGHT = canvas.height;
	
	//Player object
	player = new Player(200,100);
	document.title += ": "+_WIDTH + "x" + _HEIGHT;
	
	
	button[0] = new Button(_WIDTH-120,10,50,30,_ESPEED);
	button[1] = new Button(_WIDTH-60,10,50,30,_ESPEED);
	button[2] = new Button(_WIDTH-180,10,50,30,"Delete",function(){if(selectedTower!=-1){allTowers.splice(selectedTower,1);selectedTower=-1}});
	
	towerButtons[0] = new Button(_WIDTH-150, _HEIGHT-40, 65, 30, "Little 'un");
	towerButtons[1] = new Button(_WIDTH-80, _HEIGHT-40, 65, 30, "Big 'un");
	
	littleEx = new littleTower(-10,-10,"littleun.jpg");
		laserEx = new laserTower(-10,-10);
			laserEx2 = new laserTower2(-10,-10);
	bigEx = new bigTower(-10,-10,"bigun.jpg");
        flameEx = new flameTower(-10,-10);
	deleteEx = new deleteTower();	
	l = new littleEnemy(-10,-10);
	b = new bigEnemy(-10,-10);
	l.destArray = null;
	b.destArray = null;
	initWave();
	

	
	
	//button1 = new Button(_WIDTH-150,20,100,30);
    //Mouse event handler
	canvas.addEventListener("click", function(e){clickHandler(e)}, false);
	canvas.addEventListener("mousemove", function(e){_MOUSEX = e.clientX-canvas.offsetLeft;_MOUSEY = e.clientY-canvas.offsetTop;}, false);
    
	
	//Call render function loop
        enemyLoop();
	enemyTimer = setInterval("enemyLoop()",_WAVETIME);
    waveTimer = setInterval(function(){waveTime-=1;},1000);
	setInterval("draw()",1000/_FPS);
}

//Load init 
window.onload = init;
var DRAWPATHFLAG = 0; //change to 1 to display enemy path

//Render @FUNCTION (MAIN)
function draw(){
  ctx.globalAlpha = 1;
  ctx.clearRect(0,0,_WIDTH,_HEIGHT);
  //DRAW BG
  ctx.drawImage(_BG,0,0);
  //DRAW ENEMY PATH
  if(DRAWPATHFLAG==1){
	  ctx.beginPath();
	  ctx.moveTo(_DESTARRAY[0][0],_DESTARRAY[0][1]);
	  for(var i=0;i<_DESTARRAY.length;i++){
		  ctx.lineTo(_DESTARRAY[i][0],_DESTARRAY[i][1]);
	  }
	    ctx.stroke();
	   ctx.fillStyle = "rgba(0,0,0,0.4)";
  		if(_POLYARRAY.length > 0){
 		  ctx.beginPath();
		  ctx.moveTo(_POLYARRAY[0][0],_POLYARRAY[0][1]);
		  for(var i=0;i<_POLYARRAY.length;i++){
			  ctx.lineTo(_POLYARRAY[i][0],_POLYARRAY[i][1]);
  		  }
  		  ctx.closePath();
  		  ctx.fill();
  		}
  }
  
  
	  
  
  //Handle towers
  for(var i=0;i<allTowers.length;i++){
	var collide = 0;//stores collision info
    allTowers[i].draw();
	//Handle tower bullets
	for(var i2=0;i2<allTowers[i].allBullets.length;i2++){
	  //Propel bullets
	  allTowers[i].allBullets[i2].shootTowards();
	  //Clean up bullets
	  collide = allTowers[i].detectBulletCollision(i2,allEnemies);
	  if(allTowers[i].allBullets[i2].x>=_WIDTH || allTowers[i].allBullets[i2].x<=0 || allTowers[i].allBullets[i2].y>=_HEIGHT || allTowers[i].allBullets[i2].y<=0 || collide>-1 || collide==-2){
		if(collide>-1){
			allEnemies[collide].health-=allTowers[i].damage;
		}
	    allTowers[i].allBullets.splice(i2,1);
	  }
	}
  }//End handling of towers
  
  //Handle enemies
  for(var i=0;i<allEnemies.length;i++){
	  if(allEnemies[i].x>_WIDTH || allEnemies[i].x<0 || allEnemies[i].y>_HEIGHT || allEnemies[i].y<0){
	    allEnemies.splice(i,1);
		player.health-=10;
	  }		  
	  if(allEnemies[i].health<=0){
		player.money+=allEnemies[i].reward;
		allEnemies.splice(i,1);
	  }
	  allEnemies[i].draw();   	  
  }//End handling of enemies
  
  for(var i=0;i<towerButtons.length;i++){
	  towerButtons[i].draw();
  }
  if(selectedTower==-1)
    button[2].fill = "rgba(240,0,50,.6)";
  else
    button[2].fill = "rgba(0,0,0,1)";
  for(var i=2;i<button.length;i++){
	  button[i].draw();
  }
  button[0].text = _ESPEED;
  button[1].text = _ESPEED
  button[0].draw();
  button[1].draw();
  
  //Draw upgrade buttons
  for(var i=0;i<allTowers.length;i++){
	for(var i2=0;i2<allTowers[i].upgradeButtons.length;i2++){
		if(allTowers[i].upgradeButtons[i2].value.cost > player.money){
		  allTowers[i].upgradeButtons[i2].fill = "rgba(255,10,10,.6)";
		}else
		  allTowers[i].upgradeButtons[i2].fill = "rgba(10,20,200,.8)";
		if(allTowers[i].rangeFlag == 1)
		allTowers[i].upgradeButtons[i2].draw();
	}
  }
  
  //Draw player stats
  ctx.font = "bold 12px sans-serif";
  ctx.fillText("Health: "+player.health, 0, 20);
  ctx.fillText("Money: "+player.money, 0, 40)
  ctx.fillText("Next Wave: "+waveTime,0,60);
  ctx.fillText("Wave: "+_WAVECOUNT+"/"+_WAVE.length,0,80);

  //Draw building preview
  ctx.globalAlpha = 0.5;
  if(!notInPolygon(_MOUSEX,_MOUSEY)&&_CURRTOWER!=""||player.money<_CURRTOWER.cost){
      ctx.fillStyle="rgba(255,20,20,1)";
      ctx.fillRect(_MOUSEX-(_CURRTOWER.width/2),_MOUSEY-(_CURRTOWER.height/2),_CURRTOWER.width,_CURRTOWER.height);
      ctx.fillStyle="rgba(0,0,0,1)";
  }
  ctx.drawImage(_CURRTOWER.img,_MOUSEX-(_CURRTOWER.width/2),_MOUSEY-(_CURRTOWER.height/2));
  
}