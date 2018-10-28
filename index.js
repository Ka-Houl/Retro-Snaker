  window.onload = function(){
    init()
  }

  function init(){
    iniGame()
  }

  var iniGame = (function(){
    var wrap = document.getElementsByClassName('wrap')[0],
        t = null;
    var Snake = function(){
        this.arr = [
          {x: 0, y: 0},
          {x: 0, y: 20},
          {x: 0, y: 40},
          {x: 0, y: 60},
          {x: 0, y: 80},
          {x: 0, y: 100}
        ];       
        this.dir = 'DOWN';
    }

    Snake.prototype = {
      init: function(){
        this.createSnake();
        this.keepmove();
        this.bindEvent();
        this.createfood();
      },

      createSnake: function(){
        var len = this.arr.length,
            frag = document.createDocumentFragment(),
            round;
        for(var i = 0; i < len; i++){
          round = document.createElement('i');
          round.className = 'round';
          if(i === len -1){
            round.className = 'round head'
          }          
          round.style.top = this.arr[i].y;
          round.style.left = this.arr[i].x;
          frag.appendChild(round);  
        }
        wrap.appendChild(frag);
      },

      clearSnake: function(){
        var body = document.getElementsByClassName('round');

        while(body.length > 0){
          body[0].remove();
        }
      },

      moveSnake: function(){
        var len = this.arr.length;        
        for(var i = 0; i < len -1; i++){
          this.arr[i].x = this.arr[i+1].x;
          this.arr[i].y = this.arr[i+1].y;
         }
        switch(this.dir){
          case('LEFT'):
            this.arr[len - 1].x -= 20 ;
            break;
          case('UP'):
            this.arr[len - 1].y -= 20 ;
            break;              
          case('RIGHT'):
            this.arr[len - 1].x += 20 ;
            break;             
          case('DOWN'):
            this.arr[len - 1].y += 20 ;
            break;            
          default: 
            break;
        }
      },

      keepmove: function(){
        var _self = this;
         t = setInterval(function(){
          _self.clearSnake();
          _self.moveSnake();
          _self.createSnake();
          _self.touchwall();
          _self.eatfood();
          _self.touchbody();
        },100);
      },

      bindEvent: function(){
        var _self = this;
        addEvent(document, 'keydown', function(e){
          _self.changeDir(e);
        })
      },

      changeDir: function(e){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            code = e.keyCode;
        if(code === 37){
          if(this.dir !== 'RIGHT'){
           this.dir = 'LEFT';            
          }
        }
        else if(code === 38){
          if(this.dir !== 'DOWN'){
           this.dir = 'UP';            
          }
       }
        else if(code === 39){
          if(this.dir !== 'LEFT'){
           this.dir = 'RIGHT';            
          }
        }
        else if(code === 40){
           if(this.dir !== 'UP'){
           this.dir = 'DOWN';            
          }
       }
      },

      touchbody: function(){
        var len = this.arr.length,
            oarr = this.arr,
            i;
        for(i = 0; i <= len - 2; i++){
          if((oarr[len-1].x === oarr[i].x) && (oarr[len-1].y === oarr[i].y)){
            this.clearSnake();
            this.removefood();
            alert('游戏结束');
            clearInterval(t);
          }
        }


      },

      touchwall: function(){
        var len = this.arr.length,
        oarr = this.arr;
        if(oarr[len-1].x < 0 && (this.dir === 'LEFT')){
          oarr[len-1].x = getStyles(wrap,'width') -20;
        }
        if(oarr[len-1].x > getStyles(wrap,'width') - 20 && (this.dir === 'RIGHT')){
          oarr[len-1].x = 0;
        }
        if(oarr[len-1].y < 0 && (this.dir === 'UP')){
          oarr[len-1].y = getStyles(wrap,'height') - 20;
        }
        if(oarr[len-1].y > getStyles(wrap,'height') - 20 && (this.dir === 'DOWN')){
          oarr[len-1].y = 0;
        }
      },

      createfood: function(){
        var food = document.createElement('i');
        food.className = 'food'; 
        food.style.left = this.getposition(getStyles(wrap, 'width')) * 20 + 'px';
        food.style.top = this.getposition(getStyles(wrap, 'height')) * 20 + 'px';
        wrap.appendChild(food);
      },

      getposition: function(size){
        return(Math.floor(Math.random() * (size / 20)))
      },

      eatfood: function(){
        var food = document.getElementsByClassName('food')[0],
            len = this.arr.length;
        if(food){
          if(this.arr[len-1].x === getStyles(food,'left') && this.arr[len-1].y === getStyles(food,'top')){
          this.removefood();
          this.createfood();
          this.growbody();
          }
        }      
      },

      removefood: function(){
        var food = document.getElementsByClassName('food')[0];
        food.remove();
      },

      growbody: function(){
        var newgrow = {};
        if(this.arr[0].x === this.arr[1].x && this.arr[0].y > this.arr[1].y){
          newgrow.x = this.arr[0].x;
          newgrow.y = this.arr[0].y + 20;
        }
        else if(this.arr[0].x === this.arr[1].x && this.arr[0].y < this.arr[1].y){
          newgrow.x = this.arr[0].x;
          newgrow.y = this.arr[1].y + 20;          
        }
        else if(this.arr[0].y === this.arr[1].y && this.arr[0].x > this.arr[1].x){
          newgrow.x = this.arr[0].x - 20;
          newgrow.y = this.arr[0].y;            
        }
        else if(this.arr[0].y === this.arr[1].y && this.arr[0].x < this.arr[1].x){
          newgrow.x = this.arr[0].x - 20;
          newgrow.y = this.arr[0].y;            
        }
        this.arr.unshift(newgrow)
      },

    } 

    return new Snake().init()
  })
