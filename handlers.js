//Click @HANDLER
function clickHandler(e){
	 var x = e.clientX-canvas.offsetLeft;
	 var y = e.clientY-canvas.offsetTop;
	 
	 if(e.which == 1){
            for(var i=0;i<allTowers.length;i++){
              for(var i2=0;i2<allTowers[i].upgradeButtons.length;i2++){
                if(allTowers[i].upgradeButtons[i2].wasIClickedOn()==true&&player.money>=allTowers[i].upgradeButtons[i2].value.cost&&allTowers[i].rangeFlag==1){
                    if(allTowers[i].upgradeButtons[i2].value.name != "Delete"){
						allTowers.push(allTowers[i].upgradeButtons[i2].value.copy(allTowers[i].x,allTowers[i].y));		
						player.money-=allTowers[i].upgradeButtons[i2].value.cost;
					}
                    allTowers.splice(i,1);
                }
              }
            }
		  for(var i=2;i<button.length;i++){
			  if(button[i].wasIClickedOn()==true){
				  button[i].value();
				  return;
			  }
		  }
	    if(button[0].wasIClickedOn()==true){
		    _ESPEED++;
            }else if(button[1].wasIClickedOn()==true){
                _ESPEED--;
            }else if(towerButtons[0].wasIClickedOn()==true){
                    _CURRTOWER = littleEx;
            }else if(towerButtons[1].wasIClickedOn()==true){
                    _CURRTOWER = bigEx;
            }else if(checkClick(x,y)==false && player.money>=50){
               if(player.money>=_CURRTOWER.cost){
                 allTowers.push(_CURRTOWER.copy(x,y));
                 player.money-=_CURRTOWER.cost;
               }
            }else{
                 _CURRTOWER = "";
            }
        }
}

