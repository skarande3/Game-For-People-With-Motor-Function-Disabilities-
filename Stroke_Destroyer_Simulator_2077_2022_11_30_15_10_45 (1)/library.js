function clearAll() {
  clear();
  removeElements();
}

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function wait(interval) {
  let time = millis();
  while (millis() - time <= interval) {}
}

function getDistance(p, q) {
  return Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2));
}

function createInstruction(s, offset = 0) {
    let inst = createElement("span", s);
    inst.addClass("game-inst");
    inst.position(SCREEN_WIDTH / 3.5 + offset, 48);
}

function displayUpdate(s, offset = 0) {
    let update = document.querySelector('.update');
    if(!update) {
      update = createElement("span", s);
      update.addClass('update');
      update.position(SCREEN_WIDTH / 3.5 + offset, 48);
      return;
    }
    update.textContent = s;
}

function fadeUpdate() {
  document.querySelector('.update').style.opacity = 0;
}

function fadeInstruction() {
    document.querySelector(".game-inst").style.opacity = 0;
}

function myPoint(x, y) {
  this.x = x;
  this.y = y;
}