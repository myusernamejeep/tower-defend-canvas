// JavaScript Document
var _DESTARRAY = new Array();

_DESTARRAY.push(new Array(330, 4));
_DESTARRAY.push(new Array(336, 347));
_DESTARRAY.push(new Array(617, 341));
_DESTARRAY.push(new Array(622, 507));
_DESTARRAY.push(new Array(206, 506));
_DESTARRAY.push(new Array(205, 186));
_DESTARRAY.push(new Array(64, 188));
_DESTARRAY.push(new Array(75, 610));

var _POLYARRAY = new Array();

_POLYARRAY.push(new Array(303, 1));
_POLYARRAY.push(new Array(300, 379));
_POLYARRAY.push(new Array(590, 382));
_POLYARRAY.push(new Array(589, 472));
_POLYARRAY.push(new Array(243, 472));
_POLYARRAY.push(new Array(244, 161));
_POLYARRAY.push(new Array(39, 160));
_POLYARRAY.push(new Array(39, 600));
_POLYARRAY.push(new Array(116, 599));
_POLYARRAY.push(new Array(113, 223));
_POLYARRAY.push(new Array(173, 225));
_POLYARRAY.push(new Array(172, 535));
_POLYARRAY.push(new Array(659, 536));
_POLYARRAY.push(new Array(658, 317));
_POLYARRAY.push(new Array(375, 314));
_POLYARRAY.push(new Array(373, 2));


var _WAVE = new Array();

function initWave(){//requires initialized variables
    _WAVE[0] = new Array(30,1000,l,l,l);
    _WAVE[1] = new Array(30,1000,l,l,l,l,l,l);
    _WAVE[2] = new Array(50,800,l,l,l,l,l,l,l,l,b);
    _WAVE[3] = new Array(50,600,l,l,l,l,l,l,l,l,b,b);
    _WAVE[4] = new Array(50,500,l,l,l,l,l,l,l,l,l,l,b,b,b);
    _WAVE[5] = new Array(50,500,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b);
    _WAVE[6] = new Array(60,500,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b);
    _WAVE[7] = new Array(60,500,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b,b,b);
    _WAVE[8] = new Array(60,500,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b,b,b,b,b,b);
    _WAVE[8] = new Array(60,500,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,l,l,l,l,l,l,l,l,l,l,l,l,l);
    _WAVE[9] = new Array(60,500,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,l,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b);
}



   
   
var _BG = new Image(); // MUST BE SAME SIZE AS CANVAS
_BG.src = "bg.jpg";