var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=0;
var gameState= PLAY;
var gameOver,gameOveri;
var restart,restarti;
var jumps, dies;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
 // jumps= loadSound("jump.mp3");
 // dies= loadSound("die.mp3");
  
  gameOveri= loadImage("gameOver.png");
  restarti= loadImage("restart.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  trex = createSprite(displayWidth/2-100,displayHeight-400,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  
  
  ground = createSprite(displayWidth/2,displayHeight-400,displayWidth,displayHeight);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.width=displayWidth*8
  ground.velocityX = -4;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight-350,displayWidth*4,50);
  invisibleGround.visible = false;
  
  gameOver=createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOveri);
  gameOver.scale=0.5;
  restart=createSprite(displayWidth/2,displayHeight/2);
  restart.addImage(restarti);
  restart.scale=0.5;
  
  
  gameOver.visible=false;
  restart.visible=false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
  
  score = score + Math.round(getFrameRate()/60);
 
  if(keyDown("space")) {
    trex.velocityY = -25;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
 if(trex.isTouching(obstaclesGroup)){
   gameState=END;
   
 }
  spawnClouds();
  spawnObstacles();
    
  }
  
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
    
  }
    
  drawSprites();
  trex.collide(invisibleGround);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var cloud = createSprite(displayWidth,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1000;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-400,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 1500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}