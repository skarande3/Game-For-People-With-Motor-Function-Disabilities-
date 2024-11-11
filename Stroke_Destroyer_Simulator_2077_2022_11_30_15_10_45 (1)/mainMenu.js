const mainMenu = (() => {
  let shown = false;

  const show = () => {
    if (!shown) {
      clearAll();
      drawMenu();
    }
    shown = true;
  };

  function drawMenu() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    let bg = createImg("background.gif", '');
    bg.position(0, 0);

    let strokeText = createElement("span", "Stroke");
    strokeText.position(64, 64);
    strokeText.id("stroke");
    strokeText.addClass("finished");

    let destroyText = createElement("span", "Destroyer");
    destroyText.position(SCREEN_WIDTH - 350, 85);
    destroyText.id("destroyer");
    destroyText.addClass("finished");

    let simulText = createElement("span", "Simulator");
    simulText.position(32, 195);
    simulText.id("simulator");
    simulText.addClass("finished");

    let yearText = createElement("span", "2077!");
    yearText.position(SCREEN_WIDTH - 350, 170);
    yearText.id("year");
    yearText.addClass("finished");

    let startBtn = createButton("Start");
    startBtn.position(SCREEN_WIDTH / 2 - 48, 350);
    startBtn.addClass("start-btn");
    startBtn.mouseClicked(() => {
      mode = gameMode.List;
      shown = false;
    });
  }

  return {
    show,
  };
})();