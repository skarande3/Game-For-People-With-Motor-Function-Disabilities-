const listMenu = (() => {
  let shown = false;

  const show = () => {
    if (!shown) {
      clearAll();
      drawMenu();
      shown = true;
    }
  };

  function drawMenu() {
    let bg = createDiv();
    bg.addClass("list-bg");
    bg.id("list-bg");
    bg.position(0, 0);

    let win = createDiv();
    win.addClass("list-win");
    win.id("list-win");
    win.parent("list-bg");

    let winTitle = createElement("span", "List of Games");
    winTitle.addClass("win-title");
    winTitle.parent("list-win");

    let gameBtn1 = createButton("Trace the Line");
    gameBtn1.addClass("game-btn selected");
    gameBtn1.id('game1');
    gameBtn1.parent("list-win");
    gameBtn1.mouseClicked(() => {
      //mode = gameMode.FollowLine;
      
      selectBtn(gameBtn1);
      //shown = false;
    });
    
    let game1Detail = createDiv();
    game1Detail.addClass('game-detail');
    game1Detail.id('game1-detail');
    game1Detail.parent('game1');
    
    let game1Desc = createDiv();
    game1Desc.addClass('game-desc');
    game1Desc.id('game1-desc');
    game1Desc.parent('game1-detail');
    
    let game1Gif = createElement('img');
    game1Gif.addClass('game-gif');
    game1Gif.attribute('src', './game1.gif');
    game1Gif.parent('game1-desc');
    
    let game1Para = createElement(
      'p', 
      'Click, hold and follow the line!</br></br>' +
      'If you miss, the line will be red.</br>' +
      'If you don\'t, the line will be green!</br></br>' +
      'Choose a difficulty, then click play!'
    );
    game1Para.addClass('game-para');
    game1Para.parent('game1-desc');
    
    let game1Diff = createDiv();
    game1Diff.addClass('game-diff');
    game1Diff.id('game1-diff');
    game1Diff.parent('game1-detail');
    
    let game1Easy = createButton('Easy');
    game1Easy.addClass('game1-diff-btn diff-btn easy');
    game1Easy.parent('game1-diff');
    game1Easy.mouseClicked(() => {
      game1Difficulty = 0;
      selectBtn(game1Easy, '.game1-diff-btn');
    })
    
    let game1Normal = createButton('Normal');
    game1Normal.addClass('game1-diff-btn diff-btn normal selected ');
    game1Normal.parent('game1-diff');
    game1Normal.mouseClicked(() => {
      game1Difficulty = 1;
      selectBtn(game1Normal, '.game1-diff-btn');
    })
    game1Difficulty = 1;
    
    let game1Hard = createButton('Hard');
    game1Hard.addClass('game1-diff-btn diff-btn hard');
    game1Hard.parent('game1-diff');
    game1Hard.mouseClicked(() => {
      game1Difficulty = 2;
      selectBtn(game1Hard, '.game1-diff-btn');
    })
    
    let game1Play = createButton("Play!");
    game1Play.addClass('game-play-btn');
    game1Play.parent('game1-detail');
    game1Play.mouseClicked(() => {
      mode = gameMode.FollowLine;
      shown = false;
    })
    
    let gameBtn2 = createButton("Click the Circles");
    gameBtn2.addClass("game-btn");
    gameBtn2.id('game2');
    gameBtn2.parent("list-win");
    gameBtn2.mouseClicked(() => {
      //mode = gameMode.ClickCircles;
      //selectBtn(gameBtn2);
      selectBtn(gameBtn2);
      //shown = false;
    })
    
    let game2Detail = createDiv();
    game2Detail.addClass('game-detail');
    game2Detail.id('game2-detail');
    game2Detail.parent('game2');
    
    let game2Desc = createDiv();
    game2Desc.addClass('game-desc');
    game2Desc.id('game2-desc');
    game2Desc.parent('game2-detail');
    
    let game2Gif = createElement('img');
    game2Gif.addClass('game-gif');
    game2Gif.attribute('src', './game2.gif');
    game2Gif.parent('game2-desc');
    
    let game2Para = createElement(
      'p', 
      'Click and pop all the circles!</br></br>' +
      'If you miss, point will be deducted.</br>' +
      'If you don\'t, you keep your points!</br></br>' +
      'Choose a difficulty, then click play!'
    );
    game2Para.addClass('game-para');
    game2Para.parent('game2-desc');
    
    let game2Diff = createDiv();
    game2Diff.addClass('game-diff');
    game2Diff.id('game2-diff');
    game2Diff.parent('game2-detail');
    
    let game2Easy = createButton('Easy');
    game2Easy.addClass('game2-diff-btn diff-btn easy');
    game2Easy.parent('game2-diff');
    game2Easy.mouseClicked(() => {
      game2Difficulty = 0;
      selectBtn(game2Easy, '.game2-diff-btn');
    })
    
    let game2Normal = createButton('Normal');
    game2Normal.addClass('game2-diff-btn diff-btn normal selected ');
    game2Normal.parent('game2-diff');
    game2Normal.mouseClicked(() => {
      game2Difficulty = 1;
      selectBtn(game2Normal, '.game2-diff-btn');
    })
    game2Difficulty = 1;
    
    let game2Hard = createButton('Hard');
    game2Hard.addClass('game2-diff-btn diff-btn hard');
    game2Hard.parent('game2-diff');
    game2Hard.mouseClicked(() => {
      game2Difficulty = 2;
      selectBtn(game2Hard, '.game2-diff-btn');
    })
    
    let game2Play = createButton("Play!");
    game2Play.addClass('game-play-btn');
    game2Play.parent('game2-detail');
    game2Play.mouseClicked(() => {
      mode = gameMode.ClickCircles;
      shown = false;
    })

    let gameBtn3 = createButton("Follow the Square");
    gameBtn3.addClass("game-btn");
    gameBtn3.id('game3');
    gameBtn3.parent("list-win");
    gameBtn3.mouseClicked((() => {
      //mode = gameMode.FollowSquare;
      selectBtn(gameBtn3);
      //shown = false;
    }))
    
        let game3Detail = createDiv();
    game3Detail.addClass('game-detail');
    game3Detail.id('game3-detail');
    game3Detail.parent('game3');
    
    let game3Desc = createDiv();
    game3Desc.addClass('game-desc');
    game3Desc.id('game3-desc');
    game3Desc.parent('game3-detail');
    
    let game3Gif = createElement('img');
    game3Gif.addClass('game-gif');
    game3Gif.attribute('src', './game3.gif');
    game3Gif.parent('game3-desc');
    
    let game3Para = createElement(
      'p', 
      'Click, hold, follow the square!</br></br>' +
      'Try and keep the square green</br>' +
      'Otherwise you will lose points!</br></br>' +
      'Choose a difficulty, then click play!'
    );
    game3Para.addClass('game-para');
    game3Para.parent('game3-desc');
    
    let game3Diff = createDiv();
    game3Diff.addClass('game-diff');
    game3Diff.id('game3-diff');
    game3Diff.parent('game3-detail');
    
    let game3Easy = createButton('Easy');
    game3Easy.addClass('game3-diff-btn diff-btn easy');
    game3Easy.parent('game3-diff');
    game3Easy.mouseClicked(() => {
      game3Difficulty = 0;
      selectBtn(game3Easy, '.game3-diff-btn');
    })
    
    let game3Normal = createButton('Normal');
    game3Normal.addClass('game3-diff-btn diff-btn normal selected ');
    game3Normal.parent('game3-diff');
    game3Normal.mouseClicked(() => {
      game3Difficulty = 1;
      selectBtn(game3Normal, '.game3-diff-btn');
    })
    game3Difficulty = 1;
    
    let game3Hard = createButton('Hard');
    game3Hard.addClass('game3-diff-btn diff-btn hard');
    game3Hard.parent('game3-diff');
    game3Hard.mouseClicked(() => {
      game3Difficulty = 2;
      selectBtn(game3Hard, '.game3-diff-btn');
    })
    
    let game3Play = createButton("Play!");
    game3Play.addClass('game-play-btn');
    game3Play.parent('game3-detail');
    game3Play.mouseClicked(() => {
      mode = gameMode.FollowSquare;
      shown = false;
    })

    let backBtn = createButton("Main Menu");
    backBtn.addClass("back-btn");
    backBtn.position(16, 16);
    backBtn.mouseClicked(() => {
      mode = gameMode.Main;
      shown = false;
    });
  }
  
  function selectBtn(btn, c = '.game-btn') {
      btnList = document.querySelectorAll(c);
      btnList.forEach(b => { b.classList.remove('selected'); })
      btn.addClass('selected');
  }

  return {
    show,
  };
})();