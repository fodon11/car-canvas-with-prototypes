window.onload = function() {
  // the road is is not visible before the game starts 
  document.getElementById("game-board").style.display = 'none';
  document.getElementById("scoreDiv").style.display = "none";
  var currentGame;
  var currentCar;
  var myCanvas = document.getElementById("theCanvas");
  var ctx = myCanvas.getContext("2d");
  var board = {
    score: 0,
    frames: 0
  }


  // Game constructor function
  var Game = function(){
    this.car = {};
    this.obstacles = [];
  }

  // Car constructor function
  var Car = function(){
    this.x = 220;
    this.y = 520;
    this.width = 50;
    this.height = 80;
    this.img = 'images/car.png'
  }

  Car.prototype.drawCar = function(){
    // console.log("what is this: ", this)
    var carImage = new Image();
    carImage.src = this.img;
    // console.log("out of function: ", this.x)
    var that = this;
    // carImage.onload = function(){
      // console.log("inside: ", that.x)
      ctx.drawImage(carImage, that.x, that.y, that.width, that.height)
    // }
  }

  Car.prototype.move = function(number){
    ctx.clearRect(this.x, this.y, this.width, this.height)
    switch(number){
      case 37:
      if(this.x > 20){
        this.x -= 10;
      }
        break;
      case 39: 
      if(this.x < 430){
        this.x += 10;
      }
        break;
      default:
        console.log("Are you lost?")
    }
    this.drawCar()
  }


// Obstacles constructor function
function Obstacle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Obstacle.prototype.createObstacle = function(){
  ctx.fillStyle = "yellow";
  ctx.fillRect(this.x, this.y, this.width, this.height)
}

Obstacle.prototype.left = function(){
  return this.x
}

Obstacle.prototype.right = function(){
  return this.x + this.width
}

Obstacle.prototype.top = function(){
  return this.y
}

Obstacle.prototype.bottom = function(){
  return this.y + this.height
}

Obstacle.prototype.checkCollision = function(obstacle){
  return !((currentCar.y + 5 > obstacle.bottom()) || 
  (currentCar.x + 40 < obstacle.left()) || 
  (currentCar.x + 40 > obstacle.right()))
}

  

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    console.log("works");
    // make the road visible now
    document.getElementById("game-board").style.display = 'block';
    document.getElementById("scoreDiv").style.display = "block";
    // document.getElementById("score").innerHTML = board.score;
    currentGame = new Game();
    currentCar = new Car();
    currentGame.car = currentCar;
    currentGame.car.drawCar();
    // interval();
    currentGame.update()
  }


  document.onkeydown = function(e){
    var whereToGo = e.keyCode;
    // console.log("whereToGo: ", whereToGo);
    currentGame.car.move(whereToGo);
  }

  // function update(){
  //   console.log("hey: ", currentGame.car)
  //   // console.log("obs array: ", currentGame.obstacles)
  // }

  Game.prototype.update = function(){
    // console.log("blah: ", currentGame);
    ctx.clearRect(0, 0, 500, 600);
    currentGame.car.drawCar();
    board.frames++;
    if (board.frames % 60 === 1){
      obstacleX = 60 + Math.floor(Math.random() * 300);
      obstacleY = 0;
      obstacleWidth = 100;
      obstacleHeight = 20;
      currentGame.obstacles.push(new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight));  
    }
    for(var i = 0; i < currentGame.obstacles.length; i++){
      currentGame.obstacles[i].y += 10;
      currentGame.obstacles[i].createObstacle();
      if(currentGame.obstacles[i].checkCollision(currentGame.obstacles[i]) === true){
        console.log("collision detected");
        // setTimeout(function(){
          alert("Crashed!");
        // }, 30)
        board.score = 0;
        document.getElementById("score").innerHTML = board.score;
        board.frames = 0;
        currentGame.obstacles = [];
        startGame();
      }
    

      if(currentGame.obstacles[i].y > 600){
        currentGame.obstacles.splice(i, 1);
        board.score++;
        document.getElementById("score").innerHTML = board.score;

        console.log("score: ", board.score)
      }

    }
    // console.log("blahhhhhh: ", currentGame);
    // var fps = 25
    function animate() {
      setTimeout(function() {
      requestAnimationFrame(currentGame.update);
      }, 40);
      // 1000 / fps);
    }
    animate();
    

  }

};
