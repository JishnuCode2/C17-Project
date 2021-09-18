
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var rand;
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var fruitCuttingSound, gameOverSound ;




function preload(){
  //loading the images
    knifeImage = loadImage("knife.png");
    monsterImage = loadAnimation("alien1.png","alien2.png")
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    gameOverImage = loadImage("gameover.png");

  //loading the sounds
    fruitCuttingSound = loadSound("knifeSwoosh.mp3");
    gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  //crearing the canvas
   createCanvas(600, 600);
  
  //creating knife
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //setting collider for knife
   knife.setCollider("rectangle",0,0,30,80);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
     fruits();
     Monster();
    
    // Move the knife with mouse
     knife.y=World.mouseY;
     knife.x=World.mouseX;
  
    // Increase score if sword touches fruit
     if(fruitGroup.isTouching(knife)){
       fruitGroup.destroyEach();
       fruitCuttingSound.play();
       score=score+2;
      }
    // End the game if knife touches monster 
     if(monsterGroup.isTouching(knife)){
        gameState=END;
        gameOverSound.play();
      }        

    
      if(gameState === END ){
        // Destroy all the sprites
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;

      }

    }
  
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(600,400,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX = -( 8 + score/10 );
    monster.setLifetime=100;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,400,20,20);
    if(position==1){
     fruit.x=600;
     fruit.velocityX=-(7+ score/4);
    }else{
      if(position==2){
      fruit.x=0;
      fruit.velocityX= (7+score/4);
      }
    }
    
    fruit.scale=0.2;
    fruit.debug=true;

    rand=Math.round(random(1,4));
    switch(rand){
      case 1 :fruit.addImage(fruit1);
      break;
      case 2 :fruit.addImage(fruit2);
      break;
      case 3 :fruit.addImage(fruit3);
      break;
      case 4 :fruit.addImage(fruit4);
      default : break;
    }

    fruit.y=Math.round(random(50,550));
    
    fruit.setLifetime=200;
    
    fruitGroup.add(fruit);
  }
}