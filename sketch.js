var jack, bg ,obstacle , coins;
var jackAnim ,obstacleI , coinsI , bgI;
var obstaclesG , coinsG;
var roof;
var gameState = "start";
var score , coinsCollected = 0;
var gameover,coincollect;
var title , gamo , titleI , gamoI;


function preload()
{
  jackAnim = loadAnimation("c11.png" , "c12.png");
  obstacleI = loadImage("rovket.png")
  coinsI = loadImage("COIN-1.png")
  bgI = loadImage("pixil-frame-0 (2).png")
  gameover = loadSound("Game-over-loser.mp3")
  coincollect = loadSound("Coin-collect-sound-effect.mp3")
  tiltlI =loadImage("title.png")
  gamoI = loadImage("gameover.png")
  
}

function setup() 
{
  createCanvas(400,400);
  bg = createSprite(200,200,400,800)
  bg.addImage("bg",bgI)
  bg.scale = 0.35;
  jack = createSprite(200,200,20,20)
  jack.addAnimation("jack",jackAnim)
  jack.scale = 0.08;
  roof = createSprite(200,15,400,20)
  roof.visible=false;
  title = createSprite(200,130,30,30)
  title.addImage(tiltlI)
  title.scale = 0.14
  title.visible = false
  gamo = createSprite(200,130,30,30)
  gamo.addImage(gamoI)
  gamo.scale = 0.14
  gamo.visible = false
  
  
  
  coinsG = new Group();
  obstaclesG =new Group();
  
  
  jack.setCollider("rectangle" , 0,0,500,450)
  
  
}

function draw() 
{
    background("white")
    drawSprites();
    bg.velocityX = -4;
  
    if(gameState === "play")
{
      title.visible = false
    
      score = frameCount;
      gamo.visible = false;
      fill("white")
      text("score:" + score , 10,20)
      text("coins: " + coinsCollected, 350,20)
   
      if (bg.x === 40)
      {
        bg.x = 200;
      }
  
    jack.velocityY = jack.velocityY+0.8;
  
      if(keyDown("space"))
      {
        jack.velocityY   =-5;
      }
      
      jack.collide(roof  )
        coin();
        rocket();
    
    if (coinsG.isTouching(jack))
    {
      coins.destroy();
      coincollect.play();
      coinsCollected =coinsCollected+1;
    }
  
    if (obstaclesG.isTouching(jack) || jack.y > 300)
    {
      gameover.play();
      obstaclesG.destroyEach();
      bg.velocityX = 0;
      coinsG.destroyEach();
      jack.y = 200;
      score = 0;
      frameCount = 0;
      coinsCollected = 0;
      gameState = "end"
      
    }
 
    
}
  
  
  if (gameState === "end")
  {
    gamo.visible = true
    textSize(20 )
    fill("white")
    text("click space to start" , 20 ,350)
    
    jack.y = 200 ;
    bg.velocityX = 0;
    score = 0;
    
    if(keyWentDown("space"))
    {
      
      gameState = "play"
    }
    
    
    
    
  }
  
  if(gameState === "start")
  {
    title.visible = true
    textSize(20 )
    fill("white")
    text("click space to start and jump" , 90,350)
    text("Made by Abhinav V.M",100,250);
    jack.y = 200 ;
    bg.velocityX = 0;
    score = 0;
    
      if(keyWentDown("space"))
      {
        gameState = "play"
      }
    
  }
}

function coin()
{
  if(frameCount%70 === 0)
  {
    coins  = createSprite(400,random(100,300) ,10,10)
    coins.addImage(coinsI);
    coins.velocityX = -3;
    coins.lifetime = 450;
    coins.scale = 0.05;
    coinsG.add(coins);
  }
}

function rocket()
{
  if(frameCount%100 === 0)
  {
    obstacle  = createSprite(400,random(100,300) ,10,10)
    obstacle.addImage(obstacleI);
    obstacle.velocityX = -7;
    obstacle.lifetime = 450;
    obstacle.scale = 0.1;
    obstaclesG.add(obstacle); 
  }
}