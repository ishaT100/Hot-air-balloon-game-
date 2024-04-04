var bg, bgImg
var bottomground
var topground
var balloon, balloonImg
var obstacletop, obstacletop1, obstacletop2
var obstaclebottom, obstaclebottom1, obstaclebottom2, obstaclebottom3
var gameState="play"
var topobstaclegroup
var bottomobstaclegroup

function preload() {
  bgImg = loadImage("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obstacletop1 = loadImage("assets/obsTop1.png")
  obstacletop2 = loadImage("assets/obsTop2.png")
  obstaclebottom1 = loadImage("assets/obsBottom1.png")
  obstaclebottom2 = loadImage("assets/obsBottom2.png")
  obstaclebottom3 = loadImage("assets/obsBottom3.png")
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")

}
function setup() {
  //background image
  bg = createSprite(165, 485, 1, 1)
  bg.addImage(bgImg)
  bg.scale = 1.3
  //create top and bottom ground 
  bottomground = createSprite(200, 390, 800, 20)
  topground = createSprite(200, 10, 800, 20)
  topground.visible = false
  bottomground.visible = false
  //creating balloon
  balloon = createSprite(100, 200, 20, 50)
  balloon.addAnimation("balloon", balloonImg)
  balloon.scale = 0.2
  //making group
  topobstaclegroup=new Group()
  bottomobstaclegroup=new Group()
  //creating gameover and restart
  gameOver=createSprite(220,200)
  gameOver.addImage(gameOverImg)
  restart=createSprite(220,240)
  restart.addImage(restartImg)
  gameOver.visible=false
  restart.visible=false

}

function draw() {
  background("black")
  if(gameState=="play"){
  //making the hot air balloon jump 
  if (keyDown("space")) {
    balloon.velocityY = -6
  }
  //adding gravity
  balloon.velocityY = balloon.velocityY + 2
  spawnobstacles()
  spawnobstaclesbottom()
  bar()
  //condition to check collision 
if(topobstaclegroup.isTouching(balloon)|| bottomobstaclegroup.isTouching(balloon)){
  gameState="end"
}
}
if(gameState=="end"){
  gameOver.visible=true
  balloon.velocityX=0
  restart.visible=true
  topobstaclegroup.destroyEach()
  bottomobstaclegroup.destroyEach()
}
  drawSprites()
}
function spawnobstacles() {
  if (World.frameCount % 60 == 0) {

    obstacletop = createSprite(400, 50, 40, 50)
    obstacletop.velocityX = -4;
    //random y-position for obstacles
    var rand=Math.round(random(1,2))
    switch(rand){
      case 1:obstacletop.addImage(obstacletop1)
      break 
      case 2:obstacletop.addImage(obstacletop2)
      break
    }
    obstacletop.scale=0.1
    obstacletop.y=Math.round(random(10,100))
    balloon.depth=balloon.depth+1
    obstacletop.lifetime=100
    topobstaclegroup.add(obstacletop)
  
  }
}
function bar(){
  if(World.frameCount%60==0){
    var bar=createSprite(400,200,10,800)
    bar.velocityX=-6
    bar.depth=balloon.depth
    bar.lifetime=70
    bar.visible=false
  }
}

function spawnobstaclesbottom(){
  if(frameCount%60==0){
    obstaclebottom = createSprite(400,350,40,50)
    obstaclebottom.addImage(obstaclebottom1)
    obstaclebottom.velocityX = -4;
    obstaclebottom.scale=0.08
    bottomobstaclegroup.add(obstaclebottom)
    //random y-position for obstacles
    var rand=Math.round(random(1,3))
    switch (rand){
      case 1:obstaclebottom.addImage(obstaclebottom1)
      break
      case 2: obstaclebottom.addImage(obstaclebottom2)
      break
      case 3: obstaclebottom.addImage(obstaclebottom3)
      break
      default:
      break
    }
    
  }
}
