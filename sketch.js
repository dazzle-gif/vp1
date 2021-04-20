//Create variables here
var dog, happyDog,foodS,foodStock,database;
function preload(){
  //load images here
  dogImg= loadImage("images/dogImg.png");
  dogImg1= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  dog = createSprite(500/2,500/2,40,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background("white");
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1)
  }

  if (foodS ===  0){
//    dog.addImage(dogImg1);
    text("Yay you did it !Drago's food is completed",200,150)
  }
  drawSprites();
  //add styles here
  stroke(20)
  stroke("yellow")
  textSize(15)
  text("NOTE: Press UP_ARROW key to feed drago milk",110,20)
  text( "Food remaining:"+foodS,150,100);

}

//function to read values in DB
function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

//function to write values in DB
function writeStock (x){
  if(x <= 0){
    x=0;
    }
    else{
    x=x-1;
    }
  database.ref('/').update({
    Food:x
  })
}

