const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;

const gameMode = {
  Main: 1,
  List: 2,
  FollowLine: 3,
  ClickCircles: 4,
  FollowSquare: 5,
};

let mode = gameMode.Main;
let game1Difficulty = 1;
let game2Difficulty = 1;
let game3Difficulty = 1;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function draw() {
  switch (mode) {
    case gameMode.Main:
      mainMenu.show();
      break;
    case gameMode.List:
      listMenu.show();
      break;
    case gameMode.FollowLine:
      followLine.play(game1Difficulty);
      break;
    case gameMode.ClickCircles:
      clickCircles.play(game2Difficulty);  
      break;
    case gameMode.FollowSquare:
      followSquare.play(game3Difficulty);
      break;
    default:
      throw "mode not found!";
  }
}