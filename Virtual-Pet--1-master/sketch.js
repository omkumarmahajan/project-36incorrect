//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feed ;
var addFood;
var fedTime;
var lastFed;
var food ;

function preload()
{
	//load images here

  dogImage = loadImage("Dog.png")
  happyDog = loadImage("happydog.png")

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(200,300,50,50) 
 

  food = new Food (120,180,20,20)

  foodStock=database.ref('foodS/position');
  foodStock.on("value",readStock);

  var feed = createButton('Feed The Dog ')
  feed.position(700,95)
  feed.mousePressed( feedDog);

 
  var addFood = createButton('Add The Food')
  addFood.position(350,200)  
  addFood.mousePressed(addFoods)
   





      function draw(){
        background(46,139,87)

    fill(255,255,254);
    textSize(15);
    if(lastFed >= 12){
        text("Last Feed :" + lastFed%12 + "PM ",350,30);
      }
    else if (lastFed == 0){
        text("Last Feed : 12 AM ",350,30);
    } else {
      text(" Last Feed : " + lastFed + "AM ", 350,30)
    }


    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data){

    lastFed = data.val();
    });

    food.display();


        
          drawSprites();
        
      }

 function readStock(data){
    foodS = data.val();
 }

 function writeStock(x){
  database.ref('/').update({

   Food:x
  })

}

function feedDog(){
  dog.addImage(dogImage)
  dog.scale = 0.5;

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour ()
   })
}
