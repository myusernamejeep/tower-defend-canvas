// JavaScript Document
var _BG = new Image()
_BG.src = "bg.jpg";
var _DESTARRAY = new Array();
var _POLYARRAY = new Array();
var canvas;
var ctx;
var _FPS=60;
var doneFlag = false;

//INIT FUNCTION
function init(){
	//Retrieves canvas pointer, gets context, validates constants...
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
        canvas.width = _BG.width;
        canvas.height = _BG.height;
	
    //Mouse event handler
	canvas.addEventListener("click", function(e){clickHandler(e)}, false);
	canvas.addEventListener("mousemove", function(e){_MOUSEX = e.clientX-canvas.offsetLeft;_MOUSEY = e.clientY-canvas.offsetTop;}, false);
    
	
	//Call render function loop
	setInterval("draw()",1000/_FPS);
}

//Load init 
window.onload = init;

//Render @FUNCTION (MAIN)
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //DRAW BG
  ctx.drawImage(_BG,0,0);
  //DRAW PATH SO FAR
  if(_DESTARRAY.length > 0){
  ctx.beginPath();
  ctx.moveTo(_DESTARRAY[0][0],_DESTARRAY[0][1]);
  for(var i=0;i<_DESTARRAY.length;i++){
	  ctx.lineTo(_DESTARRAY[i][0],_DESTARRAY[i][1]);
  }
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.stroke();
  }
  
  ctx.fillStyle = "rgba(0,0,200,0.7)";
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
	
	
	  
//Click @HANDLER
function clickHandler(e){
	 var x = e.clientX-canvas.offsetLeft;
	 var y = e.clientY-canvas.offsetTop;
	 var clickResult;
	 
	 if(e.which == 1 && doneFlag == false){
	   document.getElementById('code').value += "\n_DESTARRAY.push(new Array("+Math.floor(x)+", "+Math.floor(y)+"));";
	   _DESTARRAY.push(new Array(Math.floor(x),Math.floor(y)));		   
	 }
	 if (doneFlag == true){
	   document.getElementById('points').value += "\n_POLYARRAY.push(new Array("+Math.floor(x)+", "+Math.floor(y)+"));";
	   _POLYARRAY.push(new Array(Math.floor(x),Math.floor(y)));		
	 }
	    
	    
  }



	