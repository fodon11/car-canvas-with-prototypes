// in style.css we added background image in the #game-board
// in index.html we added canvas tag
// in index.html we added div with the score
// the steps: 
        // 1. get the canvas, 
        // 2. create Game constructor function,
        // 3. in startGame function create new game using "new" key word (that's currentGame) 
        // 4. create Car constructor function,
        // 5. create drawCar() function on Car prototype
        // 6. in startGame function create new car using "new" key word (that's currentCar)
        // 7. tie the currentCar to the currentGame 
        // 8. in startGame function let's create car using drawCar function
        // 9. let's give some movement to the car (move() function and using keyCode thingy)
        // 10. create Obstacle constructor function,
        // 11. create createObstacle() function
        // 12. create update function on Game prototype and use something to animate your canvas
        //     ( in the 1st example we used setInterval() and in this example we used requestAnimationFrame )
        //     SURPRISE ME WITH THE 3RD WAY :) IN YOUR GAME
        // 13. create left(), right(), top() and bottom() functions on Obstacle prototype to pick up the position and dimension of the obstacles
        // 14. create checkCollision() to see where is the obstacle comparing to the currentCar (or currentGame.car)
        // 15. set the score
        // 16. what happens when the car hits the obstacle
        // 17. for your games: do the restart button and nice ending of the game with the score and question: Wanna play again? :)

        //  GOOD LUCK DEVELOPERS!



window.onload = function() {
  // make road not visible before the game starts 
  document.getElementById("game-board").style.display = 'none';
  // make score not visible before the game starts 
  document.getElementById("scoreDiv").style.display = "none";

  // global variables
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
    this.car = {}; // car => OBJECT 
    this.obstacles = []; // obstacles => ARRAY
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
    // this.x, this.y, this.width, this.height ====> refers to the CAR
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
    // make the score visible now
    document.getElementById("scoreDiv").style.display = "block";
    // document.getElementById("score").innerHTML = board.score;
    currentGame = new Game();
    currentCar = new Car();
    currentGame.car = currentCar;
    currentGame.car.drawCar();
    currentGame.update()
  }


  document.onkeydown = function(e){
    var whereToGo = e.keyCode;
    // console.log("whereToGo: ", whereToGo);
    currentGame.car.move(whereToGo);
  }

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
          alert("Crashed!");
        board.score = 0;
        document.getElementById("score").innerHTML = board.score;
        board.frames = 0;
        currentGame.obstacles = [];
        // startGame();
      }
    

      if(currentGame.obstacles[i].y > 600){
        currentGame.obstacles.splice(i, 1);
        board.score++;
        document.getElementById("score").innerHTML = board.score;

        console.log("score: ", board.score)
      }

    }
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
