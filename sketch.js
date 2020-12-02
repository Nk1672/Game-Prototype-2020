var vaccum, vaccumImg, back, backgroundImg, cloudImg, smokeImg, roof, floor;

function preload() {
    backgroundImg = loadImage("sky.jpg")
    cloudImg = loadImage("cloud.png")
    smokeImg = loadImage("smoke.png")
    vaccumImg = loadImage("vaccum2.png")
}

function setup(){
    createCanvas(1500, 800)
    
    back=createSprite(600, 400, 2000,2000);
    back.addImage(backgroundImg);
    back.velocityX=-5
    roof=createSprite(750, 0, 1500, 10)
    roof.visible=false;
    floor=createSprite(750, 800, 1500, 10)
    floor.visible=false;
    vaccum=createSprite(100, 400, 10, 10);
    vaccum.addImage(vaccumImg);
    vaccum.scale=0.7
    vaccum.debug=false
    vaccum.setCollider("circle",5,5,160)
    smokeGroup = new Group();
    cloudGroup = new Group();

    score=0
    count=0
}

function draw(){
    background("lightblue");

    count=count+Math.round(getFrameRate()/45);
        
    if(back.x<300){
        back.x=back.width/2
    }
        
    if(keyDown(UP_ARROW)){
        vaccum.y=vaccum.y-10
    }

    if(keyDown(DOWN_ARROW)){
        vaccum.y=vaccum.y+10
    }

    vaccum.collide(roof);
    vaccum.collide(floor);

    spawnSmoke();
    spawnClouds();

    if(cloudGroup.isTouching(vaccum)){
        score=score-3
        cloudGroup.destroyEach();
    }

    if(smokeGroup.isTouching(vaccum)){
        score=score+4
        smokeGroup.destroyEach();
    }

    if(count>=1000 && count<2000){
        smokeGroup.setVelocityXEach(-8)
        cloudGroup.setVelocityXEach(-10)
    }

    if(count>=2000 && count<3000){
        smokeGroup.setVelocityXEach(-10)
        cloudGroup.setVelocityXEach(-12)
    }

    if(count>=3000 && count <4000){
        smokeGroup.setVelocityXEach(-12)
        cloudGroup.setVelocityXEach(-14)
    }

    if(count>=4000 && count<5000){
        smokeGroup.setVelocityXEach(-14)
        cloudGroup.setVelocityXEach(-16)
    }

    if(count>=5000){
        smokeGroup.setVelocityXEach(-16)
        cloudGroup.setVelocityXEach(-18)
    }

    drawSprites();

    fill("yellow");
    textFont("Algerian")
    textSize(30);
    text("Score: "+score,1250,50)

    // fill("yellow");
    // textFont("Algerian")
    // textSize(30);
    // text("Count: "+count,250,50)

   
}

function spawnSmoke(){
    if(frameCount % 125 === 0){
        var smoke = createSprite(1700,800,50,50)
        smoke.addImage(smokeImg)
        smoke.scale=0.4;
        smoke.velocityX= -7
        smoke.setCollider("circle",10,10,140)
        smokeGroup.add(smoke);
        smoke.y= Math.round(random(75,725))
        smoke.debug=false
    }
}

function spawnClouds(){
    if(frameCount % 130 === 0){
        var cloud = createSprite(1700,800,50,50)
        cloud.addImage(cloudImg)
        cloud.scale=0.1;
        cloud.velocityX= -9
        cloud.setCollider("circle",10,10,750)
        cloudGroup.add(cloud);
        cloud.y= Math.round(random(75,725))
        cloud.debug=false
    }
}

