//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, angelImage, bulletImage, devilImage, gameOverImage;

let gameOver= false //true 이면 게임 끝, devil이 바닥에 닿으면 true로 바꾼다 , main 함수를 중지시키는 방법
let score =0;

//천사좌표
let angelX = canvas.width / 2 - 32;
let angelY = canvas.height - 64;

let bulletList=[] //총알들을 저장하는 list

const Bullet=function() {
  this.x=0
  this.y=0
  this.init=function(){
    this.x =angelX 
    this.y= angelY - 20
    this.alive = true;
    bulletList.push(this)
  }
  this.update = function(){
    this.y -= 7
  }
  this.checkHit =function(){
    for(let i =0 ; i<devilList.length; i++){
    if(this.y <= devilList[i].y && this.x+32 >= devilList[i].x && this.x <= devilList[i].x +40) { //적군과 총알이 닿으면
      //총알이 죽게됨 ,점수 획득
      score ++;
      this.alive =false
      devilList.splice(i,1)
    }
    }
  }
}

function generateRandomValue(min,max){
  let randomNum=Math.random()*(max-min)+min
  return randomNum
}


let devilList=[]

const Devil=function(){
  this.x=0
  this.y=0
  this.init=function(){
    this.y=0  
    this.x=generateRandomValue(0,canvas.width-64)
    devilList.push(this)
  }
  this.update=function(){
    this.y += 2
    if(this.y>=canvas.height-64){
      gameOver=true
      
    }
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

function createBullet(){
  console.log("총알 생성")
  let b= new Bullet()
  b.init()
  console.log('총알',bulletList)
}

function createDevil(){
  const interval =setInterval(function(){ //1초마다 적군생성
    let d= new Devil()
    d.init()  
  },1000)    
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
    if(bulletList[i].alive){
      bulletList[i].checkHit()
      bulletList[i].update()
    }
  }

  for(let i=0; i<devilList.length; i++){
    devilList[i].update()
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(angelImage, angelX, angelY);
  ctx.fillText(`Score:${score}`, 10, 20) //스코어 보여주기 ,10,20 위치
  ctx.fillStyle="white" //스코어 색상
  ctx.font ="20px Arial"
  for(let i =0; i<bulletList.length; i++){
    if(bulletList[i].alive){
      ctx.drawImage(bulletImage,bulletList[i].x ,bulletList[i].y)
    }
  }

  for(let i=0; i<devilList.length; i++){
    ctx.drawImage(devilImage,devilList[i].x ,devilList[i].y)
  }
}

function main() {
  if(gameOver===false){
  update(); //좌표값 업데이트하고
  render(); //그려주고
  requestAnimationFrame(main);
  }else{
    ctx.drawImage(gameOverImage,10,100,380,380)  //10,100 위치에 380,380 사이즈로 그려줌
  }
}

loadImage();
setupKeyboardListener();
createDevil()
main();

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x 값은 스페이스를 누른 순간의 x 좌표
//3. 발사된 총알들은 배열에 저장
//4. 총알들은 x,y좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 한다 // 그려준다



//적군이 죽는다, 총알이 닫는다