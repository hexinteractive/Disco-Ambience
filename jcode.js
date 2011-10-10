

$(document).ready(function(){

  function getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  var createLights = function(num, startOn){
    
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
      return $(lights).addClass(classes.join(' ')); //.addClass('on');
      
    }).appendTo('body'); 
  };
  window.percent = 60;
  window.lights = 740;
  // window.level = lights * (percent/100);
  // window.level = function(){return lights * (percent/100);};
  window.level = window.lights * (window.percent/100);
  var lightsOn = document.getElementsByClassName('on');
  var lightsOff = document.getElementsByClassName('off');
  var wall = createLights(lights);
  
	
  // var setLights = function(){
  //   wall.find('.light').each(function(index,elem){
  //       if(lightsOn.length < level){
  //         $(this).addClass( Math.round( Math.random() ) ? 'on' : '' );
  //       }else{
  //         $(this).removeClass( Math.round( Math.random() ) ? 'on' : '' );
  //       }
  // 
  //     });
  // };
  // 
  //   setInterval(setLights,1000);
  
  
  // var setLights = function(){
  //   wall.find('.light').eq(getRandomInt(0,wall.find('.light').length) ).each(function(){
  //       // debugger;
  //       if(lightsOn.length < level){
  //         $(this).addClass( Math.round( Math.random() ) ? 'on' : '' );
  //       }else{
  //         $(this).removeClass( Math.round( Math.random() ) ? 'on' : '' );
  //       }
  // 
  //     });
  //     console.log({'level':level, 'lightsOn':lightsOn.length});
  // };
  // 
  //   setInterval(setLights,100);  
  
  
  
  
  var setLights = function(){
    // wall.find('.light').eq(getRandomInt(0,wall.find('.light').length) ).each(function(){
    //       // todo: make the addClass('on') only happen to 'off' lights and visa versa;
    //       if(lightsOn.length < level){
    //         $(this).addClass('on');
    //       }else{
    //         $(this).removeClass('on');
    //       }
    // 
    //     });
    if(lightsOn.length <= level){
      $(lightsOff[ getRandomInt(0,lightsOff.length) ]).addClass('on').removeClass('off');
    }
    if(lightsOn.length >= level){
      $(lightsOn[ getRandomInt(0,lightsOn.length) ]).addClass('off').removeClass('on');
    }    
    // console.log({'level':level(), 'lightsOn':lightsOn.length});
	};
	
  setInterval(setLights,100);
  
  
  $(document).keydown(function(event){
    switch(event.keyCode){
    case 38: // up
      percent = Math.min(percent + 5, 100);
    break;
    case 40: // down
      percent = Math.max(percent - 5, 0);
    break;
    }
    console.log('percent',percent);
    
    window.level = window.lights * (window.percent/100);
    if($('#pct').length == 0){
      $('<p id="pct"/>').appendTo('body');
    }
    clearTimeout(window.hideControls);
    var maggie = $('#pct');
    $('#pct').text(window.percent).css({
          'opacity':'0.5'//,
          // 'width':maggie.width(),
          // 'margin':'0 auto',
          // 'top':($(window).css('height')/2) - (maggie.css('height')/2)
        });
    window.hideControls = setTimeout(function(){$('#pct').css('opacity','0');},2000);
    
    
  });
  
  wall.delegate('.light', 'hover', function(){
    $(this).toggleClass('on');
  });
  
	
});//end of ready








