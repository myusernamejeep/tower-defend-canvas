// JavaScript Document
//TOWER @SUB_CLASSES//////////////
//
//
//////////////////////////////////
function bigTower(x, y){
  this.name = "Big Tower";
  this.inheritFrom = Tower;
  this.inheritFrom(x,y,"bigun.jpg");
  //Declare object variables
  this.speed = 1;
  this.range = 150 //Range in pixels(ish)
  this.rangeFlag = -1; //display range flag bool -1 = false, 1 = true
  this.bulletSize = 5;
  this.damage = 20;
  this.bulletColor = "rgba(0,0,0,1)";
  this.cost = 100;
  this.bulletSpeed = 2;
  //Firing timer
  this.fTimer = 0;
  this.upgrades.push(flameEx);
  this.copy = copy;

  function copy(x,y){
      return new bigTower(x, y);
  }
  
}
    //bigTower @UPGRADES/////////////////
    //These are only upgrades. Not to be directly purchased.
    //
    ////////////////////////////////////////
    function flameTower(x, y){
      this.name = "Flame Tower";
      this.inheritFrom = Tower;
      this.inheritFrom(x,y,"flamer.jpg");
      this.speed = 15;
      this.range = 100;
      this.bulletSize = 5;
      this.damage = 2;
      this.bulletColor = "rgba(255,0,0,1)";
      this.cost = 75;
      this.bulletSpeed = 10;
      this.copy = copy;

      function copy(x,y){
          return new flameTower(x, y);
      }
    }

function littleTower(x, y){
  this.name = "Little Tower";
  this.inheritFrom = Tower;
  this.inheritFrom(x,y,"littleun.jpg");
  //Declare object variables
  this.speed = 2;
  this.range = 100 //Range in pixels(ish)
  this.bulletSize = 2.5;
  this.damage = 13;
  this.bulletColor = "rgba(0,0,0,1)";
  this.cost = 50;
  //Firing timer
  this.fTimer = 0;
  this.upgrades.push(laserEx);
  this.copy = copy;

  function copy(x,y){
      return new littleTower(x, y);
  }  
}
    //littleTower @UPGRADES/////////////////
    //These are only upgrades. Not to be directly purchased.
    //
    ////////////////////////////////////////
    function laserTower(x, y){
      this.name = "Laser Tower";
      this.inheritFrom = Tower;
      this.inheritFrom(x,y,"laser.jpg");
      this.speed = 1.5;
      this.range = 150;
      this.bulletSize = 2.5;
      this.damage = 15;
      this.bulletColor = "rgba(180,0,255,.7)";
      this.cost = 150;
      this.bulletSpeed = 10;
      this.upgrades.push(laserEx2);
	  this.copy = copy;
	  
      function copy(x,y){
          return new laserTower(x, y);
      }
    }
	
		//laserTower @UPGRADES/////////////////
		//These are only upgrades. Not to be directly purchased.
		//
		////////////////////////////////////////
		function laserTower2(x, y){
		  this.name = "Upgrade";
		  this.inheritFrom = Tower;
		  this.inheritFrom(x,y,"laser2.jpg");
		  this.speed = 2;
		  this.range = 200;
		  this.bulletSize = 3;
		  this.damage = 17;
		  this.bulletColor = "rgba(180,0,255,.7)";
		  this.cost = 200;
		  this.bulletSpeed = 12;
		  this.copy = copy;
		  
		  function copy(x,y){
			  return new laserTower2(x, y);
		  }
		}


function deleteTower(){
	this.name = "Delete";
	this.cost = "";
}

//ENEMY @SUB_CLASSES//////////////
//
//
//////////////////////////////////
function littleEnemy(x,y){
  //TODO: Finish enemy subclasses and implement "wave system"
  //September 10, 2010
  ///////////////////////////////////////////////////////////
  this.inheritFrom = Enemy;
  this.inheritFrom(x,y);
  this.color = "rgb(0,0,0)";
  this.healthColor = "rgb(255,255,255)";
  this.reward = 25;
  this.copy = copy;

  function copy(x,y){
      return new littleEnemy(x, y);
  }
}

function bigEnemy(x,y){
  this.inheritFrom = Enemy;
  this.inheritFrom(x,y);
  this.width = 40;
  this.height = 40;
  this.health = 200;
  this.reward = 50;
  this.color = "rgb(150,10,10)";
  this.healthColor = "rgb(255,255,255)";
  this.copy = copy;

  function copy(x,y){
      return new bigEnemy(x, y);
  }
}