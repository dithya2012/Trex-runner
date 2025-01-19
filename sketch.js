var cloudImg, gameOverImg, groundImg,obs, obs1, obs2, obs3, obs4, obs5, obs6, restartImg, trexCollidedImg, trexImg
var cpSound, dieSound, jumpSound
var ground, trex,fakeGround,cloud
var obstGroup, cloudGroup
var gamestate = "play"
var restart,gameOver
var score=0


// preload the assets to use in code
function preload(){
    cloudImg = loadImage("assets/cloud.png")
    cpSound = loadSound("assets/checkPoint.mp3")
    dieSound = loadSound("assets/die.mp3")
    gameOverImg = loadImage("assets/gameOver.png")
    groundImg = loadImage("assets/ground2.png")
    jumpSound = loadSound("assets/jump.mp3")
    obs1 = loadImage("assets/obstacle1.png")
    obs2 = loadImage("assets/obstacle2.png")
    obs3 = loadImage("assets/obstacle3.png")
    obs4 = loadImage("assets/obstacle4.png")
    obs5 = loadImage("assets/obstacle5.png")
    obs6 = loadImage("assets/obstacle6.png")
    restartImg = loadImage("assets/restart.png")
    trexCollidedImg = loadImage("assets/trex_collided.png")
    trexImg = loadAnimation("assets/trex1.png","assets/trex3.png","assets/trex4.png")

}

// runs only once
function setup(){
    createCanvas(400,200)
    ground = createSprite(200,170);
    ground.addImage(groundImg)
    fakeGround=createSprite(200,175,300,2);
    fakeGround.visible=false;
    trex = createSprite(80,160);
    trex.addAnimation("run", trexImg);
    trex.addAnimation("stop", trexCollidedImg);
    // trex.debug= false
    // trex.setCollider("rectangle" ,0,0,350,60)
    trex.scale=0.3;
    obstGroup = createGroup()
    cloudGroup = createGroup()
    restart=createSprite(200,100);
    restart.addImage(restartImg);
    restart.scale=0.4;
    gameOver=createSprite(200,70)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5;
    

}


//runs every framecount
function draw(){
    background("black")   
    trex.collide(fakeGround);
    trex.velocityY=trex.velocityY+0.8;
    textSize(15)
    fill("white")
    text("Score : " + score,20,20 )
    
    
    if(gamestate=="play"){
        trex.changeAnimation("run");
        ground.velocityX=-(5+score/30);
        
        if(ground.x<0){
            ground.x=ground.width/2
        }
        if(keyDown("space") && trex.y>140){
            trex.velocityY=-9;
            jumpSound.play();

        }
        

        // if(trex.isTouching(obstGroup)){
        //     trex.velocityY=-7;
        //     jumpSound.play();

        // }
        
        if (trex.isTouching(obstGroup) ){
            gamestate = "end"
            dieSound.play();
        }
        clouds();
        cactus();
        gameOver.visible=false;
        restart.visible=false;
        if(frameCount%3 == 0 ){
            score=score+1;
        }
        // % is called modulo or modulus, it gives you the remainder between two numbers.
        if(score%50 == 0   && score != 0){ 
            cpSound.play();

        }
        
    }
    
    if(gamestate == "end"){
        trex.changeAnimation("stop");
        ground.velocityX=0;
        obstGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        if(mousePressedOver(restart)){
            gamestate="play";
            cloudGroup.destroyEach();
            obstGroup.destroyEach();
            score=0;
        }
        gameOver.visible=true;
        restart.visible=true;
     }
                                                                                                                                            
    
     drawSprites()
  
   

}
   
    
function clouds(){
    if(frameCount%60==0){
        cloud = createSprite(400,70)
        cloud.addImage(cloudImg);
        cloud.scale=random(0.3,0.6);
        cloud.velocityX=-(3+score/30);
        cloud.y=random(30,110)
        cloudGroup.add(cloud)


    }
}
function cactus(){
    if(frameCount%70==0){
        obs = createSprite(400,160)
        var r = Math.round(random(1,5))
        
        switch(r){
            case 1:obs.addImage(obs1) 
            break;    
            case 2:obs.addImage(obs2)
            break;
            case 3:obs.addImage(obs3)
            break;
            case 4:obs.addImage(obs4)
            break;
            case 5:obs.addImage(obs5)
            break;
          

        }
        
        obs.scale=0.38;
        obs.velocityX=-(5+score/30);
        obstGroup.add(obs);
    }
}

// Assignment : Add code logic to make this game AI, without you doing anything, trex will play on its own.
