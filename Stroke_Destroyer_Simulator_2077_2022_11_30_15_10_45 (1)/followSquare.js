const followSquare = (() => {
  const TOTAL_TIME = 20000; // 20 seconds
  let gameTime = TOTAL_TIME; 
  let started = false;
  let roundStarted = false;
  let gameOver = false;
  let square;
  let timeStamp;
  let accuracyDuration = 0;

  const play = (difficulty) => {
    if (!started) {
      clearAll();
      initialize(difficulty);
    }
    if (!gameOver) {
      square.move();
      square.show();
      
      if(!roundStarted) resolveRound();
      else processTime();
    }
  };

  function initialize(difficulty) {
    // initialize values
    gameOver = false;
    roundStarted = false;
    gameTime = TOTAL_TIME;
    timeStamp = undefined;
    accuracyDuration = 0;
    
    // set difficulty
    console.log('difficulty set to ' + difficulty);
    switch(difficulty) {
      case 0:
        square = new mySquare(100);
        break;
      case 1:
        square = new mySquare(80);
        break;
      case 2:
        square = new mySquare(60);
        break;
      default:
        throw "no such difficulty";
    }
    
    let bg = createDiv();
    bg.position(0, 0);
    bg.addClass("square-follow-bg");
    
    createInstruction("Click, Hold, and Follow the square!", -25);

    // make sure to run once per round
    started = true;
  }
  
  function resolveRound() {
    if(mouseIsPressed) {
      roundStarted = true;
      fadeInstruction();
    }
  }

  function processTime() {
    // calculate difference between timestamp & currentTime
    if(!timeStamp) timeStamp = millis();
    let currentTime = millis();
    let timeDiff = currentTime - timeStamp;
    gameTime = Math.max(0, gameTime - timeDiff)
    timeStamp = currentTime;
    
    // square being clicked: add accuracy duration
    if(square.mouseInside() && mouseIsPressed)
      accuracyDuration += timeDiff;
    
    // 10 seconds remaining: show time
    let displayTime = (gameTime/1000).toFixed(2);
    if(gameTime <= 10000)
      displayUpdate('Time Remaining: ' + displayTime + 's', -12);
    
    // time is up: end game
    if (gameTime <= 0) {
      fadeUpdate();
      
      gameOver = true;
      gameOverScreen.show(
        calculateScore(),
        () => {
          started = false;
        },
        () => {
          started = false;
          mode = gameMode.Main;
        }
      );
    }
  }

  function calculateScore() {
    return 100 * accuracyDuration / TOTAL_TIME;
  }
  
  class mySquare {
    constructor(size, borderRadius=15) {
      this.size = size;
      this.borderRadius = borderRadius;
      this.x = 0;
      this.y = 0;
      
      this.noiseTime = 0;
      this.noiseOffset = 5;
      this.noiseInc = 0.007;
    }
    
    move() {
      this.x = SCREEN_WIDTH * noise(this.noiseTime);
      this.y = SCREEN_HEIGHT * noise(this.noiseTime + this.noiseOffset);
      this.noiseTime += this.noiseInc;
    }
    
    show() {
      clear();
      
      if(this.mouseInside() && mouseIsPressed)
        fill("rgb(164,244,164)");
      else if(mouseIsPressed)
        fill("rgb(255,138,138)");
      else
        fill("white");
      
      noStroke();
      rect(this.x, this.y, this.size, this.size, this.borderRadius);   
    }
    
    mouseInside() {
      return mouseX >= this.x &&
             mouseX <= this.x + this.size &&
             mouseY >= this.y &&
             mouseY <= this.y + this.size;
    }
  }

  return {
    play,
  };
})();
