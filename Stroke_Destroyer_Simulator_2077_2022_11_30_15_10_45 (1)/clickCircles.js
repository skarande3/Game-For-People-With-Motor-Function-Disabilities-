const clickCircles = (() => {
  let targetList = [];
  let started = false;
  let gameOver = false;
  let numClicks = 0;
  let gameDifficulty = 1;
  const targetCount = 10;
  const OFFSET = 64;
  let radius = 35;
  const NUM_COL = 4;
  const NUM_ROW = 2;

  const play = (difficulty) => {
    if (!started) {
      clearAll();
      initialize(difficulty);
    }
    if (!gameOver) {
      background("gray");
      drawTargets();
    }
  };
  
  const clickTarget = () => {
    if(gameOver) return;
    
    numClicks++;
    
    
    targetList.forEach(t => {
      if(mouseInTarget(t)) {
        t.kill();
        fadeInstruction();
        drawTargets();
        if(targetList.length === 0) {
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
    });
    // ...readable enough :(
  }

  const initialize = (difficulty) => {
    started = true;
    gameOver = false;
    numClicks = 0;
    let bg = createDiv();
    bg.position(0, 0);
    bg.addClass("click-circle-bg");
    createInstruction("Click all the circles!", 50);
    
    // set difficulty
    console.log("difficulty is set to " + difficulty);
    switch(difficulty) {
      case 0:
        radius = 45;
        break;
      case 1:
        radius = 35;
        break;
      case 2:
        radius = 25;
        break;
      default:
        throw "no such difficulty";
    }
    
    spawnTargets();
  };
  
  function mouseInTarget(target) {
    let mousePoint = new myPoint(mouseX, mouseY);
    return (getDistance(mousePoint, new myPoint(target.x, target.y)) <= radius);
  }
  
  function calculateScore() {
    if(numClicks === 0) return -1;
    return NUM_ROW * NUM_COL / numClicks * 100;
  }

  function spawnTargets() {
    const X_OFFSET = (SCREEN_WIDTH-OFFSET*2) / NUM_COL;
    const Y_OFFSET = (SCREEN_HEIGHT-OFFSET*2) / NUM_ROW;
    for(let i=OFFSET; i<SCREEN_WIDTH-OFFSET; i+=X_OFFSET) {
      for(let j=OFFSET; j<SCREEN_HEIGHT-OFFSET; j+=Y_OFFSET) {
        targetList.push(new target(i, j, radius));
      }
    }
  }

  function drawTargets() {
    clear();
    targetList.forEach((t) => {
      t.show();
      t.move();
    });
  }

  function vector(x, y) {
    this.x = x;
    this.y = y;
    this.normalize = () => {
      let h = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      if (this.x === 0 && this.y === 0) this.y += 1;
      this.x /= h;
      this.y /= h;
    };
  }

  class target {
    constructor(x, y, rad) {
      this.x = x;
      this.y = y;
      this.rad = rad;
      this.vec = new vector(randRange(-1, 1), randRange(-1, 1));
      this.vec.normalize();
      this.speed = 4;
      this.randomizeColor();
      this.died = false;
    }

    move() {
      this.processCollision();
      this.updateLocation();
    }

    show() {
      noStroke();
      fill(this.color);
      if(mouseInTarget(this)) this.color.setAlpha(255);
      else this.color.setAlpha(175);
      circle(this.x, this.y, this.rad * 2);
    }

    randomizeColor() {
      this.color = color(
        randRange(0, 255),
        randRange(0, 255),
        randRange(0, 255)
      );
      this.color.setAlpha(175);
    }

    processCollision() {
      this.collideBorders();
      this.collideOthers();
    }

    updateLocation() {
      this.x = clamp(
        this.x + this.vec.x * this.speed, 
        this.rad, 
        SCREEN_WIDTH-this.rad
      );
      
      this.y = clamp(
        this.y + this.vec.y * this.speed, 
        this.rad, 
        SCREEN_HEIGHT-this.rad);
    }
    
    collideBorders() {
      if (this.x >= SCREEN_WIDTH-this.rad || 
        this.x <= this.rad) {
        this.vec.x = -this.vec.x;
        this.randomizeColor();
      }
      if (this.y >= SCREEN_HEIGHT-this.rad || 
          this.y <= this.rad) {
        this.vec.y = -this.vec.y;
        this.randomizeColor();
      }
    }

    collideOthers() {
      let dx = this.vec.x * this.speed;
      let dy = this.vec.y * this.speed;
      let p = new myPoint(this.x + dx, this.y + dy);
      targetList.forEach((c) => {
        if (getDistance(p, c) <= this.rad + c.rad) {
          let temp = this.vec;
          this.vec = c.vec;
          c.vec = temp;
          return;
        }
      });
    }

    kill() {
      let index = targetList.indexOf(this);
      targetList.splice(index, 1);
    }
  }

  return {
    play,
    clickTarget,
  };
})();

function mouseClicked() {
  clickCircles.clickTarget();
}
