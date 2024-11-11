const gameOverScreen = (() => {
  const show = (score, cb1, cb2) => {
    let overlay = createDiv();
    overlay.position(0, 0);
    overlay.id("overlay");
    overlay.addClass("finished");

    let overText = createElement("span", "Game Over!");
    overText.position(SCREEN_WIDTH / 3, 0);
    overText.id("over-text");
    overText.addClass("finished");

    let scoreText = createElement("span", "Score: " + score.toFixed(2) + "%");
    scoreText.position(SCREEN_WIDTH / 3 + 32, 200);
    scoreText.id("score-text");
    scoreText.addClass("finished");

    let tryAgain = createButton("Try Again");
    tryAgain.position(SCREEN_WIDTH / 3 + 64, 250);
    tryAgain.id("try-again");
    tryAgain.addClass("finished");
    tryAgain.mouseClicked(() => {
      cb1();
    });

    let goBack = createButton("Main Menu");
    goBack.position(SCREEN_WIDTH / 3 + 57, 280);
    goBack.id("go-back");
    goBack.addClass("finished");
    goBack.mouseClicked(() => {
      cb2();
    });
  }
  
  return {
    show,
  }
})();