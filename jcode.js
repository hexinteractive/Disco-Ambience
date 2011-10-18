
var Disco = function(){
  
  this.percent = 0;
	this.lights = 740;
	this.interval = 100;
	this.level = 0;
  this.loop = null;
  this.wall = null;
	this.lightsOn = null;
	this.lightsOff = null;
	this.dimmer = null;
	this.hideDimmerTimer = null;
  this.init();
};

Disco.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Disco.prototype.createLights = function(num, startOn){
  
  return $('<ul id="wall" />').append(function(){
    // console.log('num', num);      
    var lights = [];
    while(num > lights.length){
      lights.push(document.createElement('li'));
    }
    // console.log('num', num);
    // console.log(lights.length);
    var classes = ['light']; // 'light ';
    classes.push(startOn == true ? 'on' : 'off');
    return $(lights).addClass(classes.join(' '));
  }).appendTo('body'); 
};


Disco.prototype.setLights = function(){
  if(this.lightsOn.length <= this.level){
    this.toggleLight(this.lightsOff);
  }
  if(this.lightsOn.length >= this.level){
    this.toggleLight(this.lightsOn);
  } 
};

Disco.prototype.toggleLight = function(list){
  $(list[ this.getRandomInt(0,list.length) ]).toggleClass('off on');
};

Disco.prototype.startLoop = function(){
  var context = this;
  this.loop = setInterval(function(){context.setLights();},this.interval);
};

Disco.prototype.stopLoop = function(){
  clearInterval(this.loop);
  this.loop = null;
};

Disco.prototype.init = function(){
  this.wall = this.createLights(740,false);
  this.setPercent(60);
  this.createDimmer();
  this.lightsOn = document.getElementsByClassName('on');
  this.lightsOff = document.getElementsByClassName('off');
  this.bindEvents();
  this.startLoop();
};

Disco.prototype.createDimmer = function(){
  this.dimmer = $('<p id="dimmer"/>').prependTo('body');
};

Disco.prototype.hideDimmer = function(){
  var context = this;
  clearTimeout(context.hideDimmerTimer);
  this.hideDimmerTimer = setTimeout(function(){context.dimmer.css('opacity','0');},2000);
};

Disco.prototype.adjustPercent = function(delta){
  this.setPercent(this.percent + delta);
};

Disco.prototype.setPercent = function(val){
  var tempPercent = val;
  tempPercent = Math.min(tempPercent, 100);
  tempPercent = Math.max(tempPercent, 0);
  this.percent = tempPercent;
  this.setLevel();
};

Disco.prototype.setLevel = function(){
  this.level = this.lights * (this.percent/100);
};

Disco.prototype.bindEvents = function(){
  var context = this;
  $(document).keydown(function(event){
    var caught = true;
    // console.log('event.keyCode ',event.keyCode);
    switch(event.keyCode){
    case 38: // up
      context.adjustPercent(5);
    break;
    case 40: // down
      context.adjustPercent(-5);
    break;
    case 32: //space
      if(context.loop == null){//paused
        context.startLoop();//unpause
      }else{//running
        context.stopLoop();//pause
      }
    break;
    default:
      caught = false;
    break;
    }
    
    if(caught){
      event.preventDefault();
      console.log('context.dimmer ',context.dimmer);
      context.dimmer.text(context.percent).css({
            'opacity':'0.7',
            // 'width':context.dimmer.width(),
            'left':($(window).width()/2) - (context.dimmer.width()/2),
            'top':($(window).height()/2) - (context.dimmer.height()/2)
          });
      context.hideDimmer();
    }
  });
  
  this.wall.delegate('.light', 'hover', function(){
    $(this).toggleClass('on off');
  });
  
};


$(document).ready(function(){

  window.disco = new Disco();  

});








