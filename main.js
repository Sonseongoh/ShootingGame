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

let bulletList=[] //총알들을 저장하는 list

function Bullet(){
  this.x=0
  this.y=0
  this.init=function(){
    this.x =angelX 
    this.y= angelY - 20

    bulletList.push(this)
  }
  this.update = function(){
    this.y -= 7
  }
}

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
    //눌렀을때
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function (event) {
    //뗏을때
    delete keysDown[event.keyCode];

    if (event.keyCode == 32)
      //32는 스페이스바
      createBullet();
  });
}

const createBullet=()=>{
  console.log("총알 생성")
  let b= new Bullet()
  b.init()
  console.log('총알',bulletList)
}

function update() {
  if (39 in keysDown) {
    angelX += 3;
  }
  if (37 in keysDown) {
    angelX -= 3;
  }
  if (angelX <= 0) {
    angelX = 0;
  }
  if (angelX >= canvas.width - 64) {
    angelX = canvas.width - 64;
  }

  //총알의 y좌표 업데이트 하는 함수 호출
  for(let i = 0; i<bulletList.length; i++){
    bulletList[i].update()
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(angelImage, angelX, angelY);
  
  for(let i =0; i<bulletList.length; i++){
    ctx.drawImage(bulletImage,bulletList[i].x ,bulletList[i].y)
  }
}

function main() {
  update(); //좌표값 업데이트하고
  render(); //그려주고
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x 값은 스페이스를 누른 순간의 x 좌표
//3. 발사된 총알들은 배열에 저장
//4. 총알들은 x,y좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 한다 // 그려준다
