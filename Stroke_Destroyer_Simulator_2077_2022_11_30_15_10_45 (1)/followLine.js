const followLine = (() => {
  let dp = new Map();
  let dataPoints = [];
  let curveLines = [];
  let started = false;
  let roundStarted = false;
  let gameOver = false;
  let redDist = 0;
  let gameOverIter = 0;
  let prevMouseX, prevMouseY;
  const BG_COL = "#494949";
  const CRV_COL = "#EFEFEF";
  const CRV_WGT = 20;
  const CRV_INTER = 8;
  const LINE_WGT = 15;
  const X_OFFSET = 16;
  let radiusTolerance = CRV_WGT * 0.65;

  const play = (difficulty) => {
    if (!started) {
      clearAll();
      initialize(difficulty);
    }
    if (!gameOver) {
      drawLine();
    }
  };

  function initialize(difficulty) {
    // initialize values
    dp = new Map();
    gameOver = false;
    roundStarted = false;
    redDist = 0;
    gameOverIter = 0;
    
    // set difficulty
    switch(difficulty) {
      case 0:
        radiusTolerance = CRV_WGT;
        break;
      case 1:
        radiusTolerance = CRV_WGT * 0.65;
        break;
      case 2:
        radiusTolerance = CRV_WGT * 0.4;
        break;
      default:
        throw "no such difficulty found"
    }

    generateCurve();

    // draw background
    let bg = createDiv();
    bg.position(0, 0);
    bg.addClass("line-trace-bg");

    createInstruction("Click, hold, drag to fill the line!")

    drawCurve();

    // make sure to run once per round
    started = true;
  }

  function generateCurve() {
    generateDataPoints();
    dp = new Map();
    generateCurveLines();
  }

  function generateCurveLines() {
    curveLines = [];
    let xPrev = X_OFFSET;
    let yPrev = interpolate(xPrev);
    for (
      let x = X_OFFSET + CRV_INTER;
      x <= SCREEN_WIDTH - X_OFFSET;
      x += CRV_INTER
    ) {
      let y = interpolate(x);
      curveLines.push({
        firstPoint: new myPoint(xPrev, yPrev),
        lastPoint: new myPoint(x, y),
        filled: false,
      });
      xPrev = x;
      yPrev = y;
    }
  }

  function getCurveLength() {
    if (curveLines.length <= 0) return;
    let sum = 0;
    curveLines.forEach((line) => {
      sum += getDistance(line.firstPoint, line.lastPoint);
    });
    return sum;
  }

  function drawCurve() {
    if (curveLines.length <= 0) return;
    stroke(CRV_COL);
    strokeWeight(CRV_WGT);
    for (let i = 1; i < curveLines.length - 1; ++i) {
      line(
        curveLines[i].firstPoint.x,
        curveLines[i].firstPoint.y,
        curveLines[i].lastPoint.x,
        curveLines[i].lastPoint.y
      );
    }
  }

  function calculateScore() {
    let filledLength = 0;
    // calculate filled length
    curveLines.forEach((e) => {
      if (e.filled) filledLength += getDistance(e.firstPoint, e.lastPoint);
    });
    let curveLength = getCurveLength();
    let missingLength = curveLength - filledLength;
    if (redDist <= missingLength) return (100 * filledLength) / curveLength;
    else return (100 * filledLength) / (curveLength + redDist - missingLength);
  }

  function drawLine() {
    if (!mouseIsPressed && roundStarted) {
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
      )
      return;
    }
    if (!mouseIsPressed) {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      return;
    }

    if (!roundStarted)
      fadeInstruction();

    // when mouse is pressed
    roundStarted = true;

    let currentPoint = new myPoint(mouseX, mouseY);
    let wrong = true;
    stroke("#CA5D5D");
    for (let i = 0; i < curveLines.length; ++i) {
      if (curveLines[i].lastPoint.x < currentPoint.x) continue;
      if (
        pointIntersects(
          curveLines[i].firstPoint,
          curveLines[i].lastPoint,
          currentPoint,
          radiusTolerance
        )
      ) {
        stroke("#A2DF95");
        curveLines[i].filled = true;
        wrong = false;
        break;
      }
    }

    if (wrong)
      redDist += getDistance(
        new myPoint(prevMouseX, prevMouseY),
        new myPoint(mouseX, mouseY)
      );

    strokeWeight(LINE_WGT);
    line(prevMouseX, prevMouseY, mouseX, mouseY);
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }

  function generateDataPoints() {
    const NUM_POINTS = 6;
    const X_OFFSET = 16;
    const Y_OFFSET = 160;
    const X_START = X_OFFSET;
    const X_END = SCREEN_WIDTH - X_OFFSET;

    let interval = (X_END - X_START) / (NUM_POINTS - 1);
    let x = X_START;
    let y = randRange(Y_OFFSET, SCREEN_HEIGHT - Y_OFFSET);

    dataPoints = [];
    for (let i = 0; i < NUM_POINTS; ++i) {
      dataPoints.push({ x: x, y: y });
      x += interval;
      y = randRange(Y_OFFSET, SCREEN_HEIGHT - Y_OFFSET);
    }
  }

  function interpolate(x) {
    if (dp.has(x)) return dp.get(x);
    let sum = 0;
    for (let i = 0; i < dataPoints.length; ++i) {
      let n = 1,
        d = 1;
      for (let j = 0; j < dataPoints.length; ++j) {
        if (i == j) continue;
        n *= x - dataPoints[j].x;
        d *= dataPoints[i].x - dataPoints[j].x;
      }
      sum += (n / d) * dataPoints[i].y;
    }
    dp.set(x, sum);
    return dp.get(x);
  }

  function pointIntersects(p, q, t, r) {
    if (!r) r = 0;
    let m = (q.y - p.y) / (q.x - p.x);
    let y = m * (t.x - p.x) + p.y;
    if (
      y <= Math.max(p.y, q.y) &&
      y >= Math.min(p.y, q.y) &&
      getDistance(new myPoint(t.x, y), t) <= r
    )
      return true;
    return false;
  }

  return {
    play,
  };
})();