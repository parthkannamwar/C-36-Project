var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedDog;
var foodObj,ft,ft2;


var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);


  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feeddog=createButton("Feed the Dog");
  feeddog.position(500,95);
  feeddog.mousePressed(feedDog);


}

function draw()
 {

  background(46,139,87);
  foodObj.display();

  

  ft3 = database.ref('FeedTime');
  
  ft3.on("value",(data)=>
  {
       ft3=data.val();
  });  

/*console.log("hello")

  if(ft3<=12)
  {
    ft3=ft3-12 +" PM" 
  }*/

 /* else
  {
    ft3=ft3-0+ " AM"
  }*/
  
  
  console.log("hello")
  drawSprites();

  fill("yellow")
  textSize(20)

if(ft3>12)
{
  text("Last Fed : " + ft3%12 + " PM" ,50,300);
}

if(ft3<12 && ft3>0)
{
  text("Last Fed : " + ft3 + " AM", 50,300)
}

if(ft3 == 0)
{
  text("Last Fed : 12 AM",50,300 )
}

if(ft3 == 12)
{
  text("Last Fed : 12 PM",50,300 )
}

}

//function to read food Stock
function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog()
{
  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();

    foodS--;
  database.ref('/').update({
    Food:foodS
  })

  
  database.ref('/').update({
    FeedTime:hour()
  })

}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
