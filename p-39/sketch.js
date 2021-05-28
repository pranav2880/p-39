
//declearing variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,ground_img,invisibleground;
var gamestate  = "play";




function preload(){
  
  gameover_img = loadImage("gameover.png.jpg")
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 ground_img=loadImage("jungle.webp");
}



function setup() {
//creating canvas  
createCanvas(400,400)
 
//invisible ground creation  
invisibleground=createSprite(0,350,800,10)  
invisibleground.visible=false;  
  
  
//creating ground  
ground = createSprite(400,250,10,10)
//moving ground  
ground.velocityX=-4;  
//infnite ground   
//ground.x=ground.width/2;
console.log(ground.x)  
//ground image
ground.addImage(ground_img);  
//scaling
ground.scale=2.5;  
 
  //creating sprite for monkey  
monkey=createSprite(80,315,20,20)  
//adding animation  
monkey.addAnimation("moving",monkey_running) //scaling monkey 
monkey.scale=0.1;

  FoodGroup=new Group(); 
 obstacleGroup=new Group(); 
}


function draw() {
//creating background  
background("white");
//drawing sprites  
drawSprites(); 
  var survivaltime=0;
  stroke("white");
  textSize(20);
  fill("white");
  text("score;"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("survivaltime:"+survivaltime,100,50);
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  monkey.collide(invisibleground);
   if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
 if(FoodGroup.isTouching(monkey)&&FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
   monkey.scale=0.1;
 }
  
if(obstacleGroup.isTouching(monkey)){
gamestate = "end";


  
} 
if(gamestate==="end"){
  var gameover = createSprite(100,250,50,50)
  gameover.addImage(gameover_img);
  ground.velocityX = 0
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  gameover.scale=0.6
} 
  rocks();
  fruit();
  camera.x = monkey.x;
  camera.y = monkey.y;
}

function fruit(){

if(frameCount%150===0){
banana=createSprite(400,50,10,10)  
banana.y=Math.round(random(60,200));
banana.addImage(bananaImage); 
banana.scale=0.1;  
banana.velocityX=-3;   
banana.lifetime=150;   
FoodGroup.add(banana);  
  

  
   }
}

function rocks(){
if(frameCount%400===0) {
  
  obstacle=createSprite(400,330,10,10);
  obstacle.addImage( obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5
  obstacle.lifetime=150;
  obstacleGroup.add(obstacle);
  
} 
  
}



