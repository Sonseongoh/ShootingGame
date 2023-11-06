//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, angelImage, bulletImage, devilImage, gameOverImage;

//천사좌표
let angelX = canvas.width / 2 - 32;
let angelY = canvas.height - 64;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

  angelImage = new Image();
  angelImage.src = "images/angel.png";

  devilImage = new Image();
  devilImage.src = "images/devil.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.jpg";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
  });
}

function update() {
  if (39 in keysDown) {
    angelX += 3;

  }
  if(37 in keysDown){
    angelX -= 3;
  }
  if(angelX<=0){
    angelX=0
  }
  if(angelX>=canvas.width-64){
    angelX=canvas.width-64

  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(angelImage, angelX, angelY);
}

function main() {
  update(); //좌표값 업데이트하고
  render(); //그려주고
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
