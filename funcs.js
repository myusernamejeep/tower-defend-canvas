


//Basic extension functions
function distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function enemyLoop(){
   var loc;
   //Randomly select a position for the new enemy
   switch(Math.floor(Math.random()*4)){
     case 0:
	   loc = "bottom";
	   break;
	 case 1:
	   loc = "top";
	   break;
	 case 2:
	   loc = "left";
	   break;
	 case 3:
	   loc = "right";
	   break;
   }	   
   var i = 2;
   waveTime = _WAVE[_WAVECOUNT][0];
   _WAVETIME = _WAVE[_WAVECOUNT][0]*1000; 
   var spawnTimer = setInterval(function(){if(i<_WAVE[_WAVECOUNT].length){allEnemies.push(_WAVE[_WAVECOUNT][i].copy(_DESTARRAY[0][0],_DESTARRAY[0][1]));i++}else{clearInterval(spawnTimer);_WAVECOUNT++;}},_WAVE[_WAVECOUNT][1]);
}                  

function checkClick(x,y){
  var returnBool;
  if(notInPolygon(x,y)){  
	  for(var i=0;i<allTowers.length;i++){
		if(allTowers[i].rangeFlag == 1){
			allTowers[i].rangeFlag = -1;
			selectedTower = -1;
			for(var i2=0;i2<allTowers[i].upgrades.length;i2++){
			  allTowers[i].upgradeButtons[i2].x = -100;
			  allTowers[i].upgradeButtons[i2].y = -100;
			  
			}
			return true;
		}
		if(x<allTowers[i].x+allTowers[i].width && x>allTowers[i].x-allTowers[i].width){
		  if(y<allTowers[i].y+allTowers[i].height && y>allTowers[i].y-allTowers[i].height){ 					  
				 if(_CURRTOWER==""){				
		          for(var i2=0;i2<allTowers.length;i2++){
					  allTowers[i2].rangeFlag = -1; 
				  }
				   allTowers[i].rangeFlag *= -1;
				 }
				  if(allTowers[i].rangeFlag == 1){
				   selectedTower = i;
					for(var i2=0;i2<allTowers[i].upgrades.length;i2++){
					  if(allTowers[i].upgrades[i2].name != "Delete")
						allTowers[i].upgradeButtons[i2] = new Button(allTowers[i].x-110/2,allTowers[i].y+allTowers[i].height/2+10+i2*30,110,25,allTowers[i].upgrades[i2].name+" $"+allTowers[i].upgrades[i2].cost,allTowers[i].upgrades[i2]);
					 else
						allTowers[i].upgradeButtons[i2] = new Button(allTowers[i].x-55/2,allTowers[i].y+allTowers[i].height/2+10+i2*30,55,25,allTowers[i].upgrades[i2].name,allTowers[i].upgrades[i2]);
					}
				  }
				  return true;
			}    
		}
	  }
    return false;
  }
  return true;
}

function notInPolygon(x,y)
{
    crossPts=[];
	linesLeft=[];
	
    //Find all edges left of the point and crossing it vertically
    var lines=[];
    for(var i=0,l=_POLYARRAY.length;i<l;++i)
    {
	    //At least one point left
        if( !(_POLYARRAY[i][0]>x && _POLYARRAY[(i+1)%l][0]>x) )
        {
		    //Endpoints above and below
            if( (_POLYARRAY[i][1]>=y && _POLYARRAY[(i+1)%l][1]<y) ||
                (_POLYARRAY[i][1]<y && _POLYARRAY[(i+1)%l][1]>=y) )
            {
                lines.push(_POLYARRAY[i]);
                lines.push(_POLYARRAY[(i+1)%l]);
            }
        }
    }
    
    var leftCount=0;
    for(var i=0;i<lines.length;i+=2)
    {
	    //Both endpoints left (line is left)
        if(lines[i][0]<x && lines[i+1][0]<x)
		{
            ++leftCount;
			
			linesLeft.push(lines[i]);
			linesLeft.push(lines[i+1]);
		}
		//One endpoint left (test)
        else
        {
		    var x1=lines[i][0];
		    var y1=lines[i][1];
		    var x2=lines[i+1][0];
		    var y2=lines[i+1][1];
			var y=y;
            var specialX = (y-y1)*((x2-x1)/(y2-y1)) + x1;
			//line is left
			if(specialX<x)
			{
			    ++leftCount;
			
				linesLeft.push(lines[i]);
				linesLeft.push(lines[i+1]);
			}
			//Line is not left (fail);
        }
    }
	if(leftCount&1)
        return false;
	else
        return true;
}