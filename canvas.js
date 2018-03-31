//get the canvas object from the DOM
var canvas = document.querySelector('canvas');

//return an object with methods and properties to draw on the canvas
var c = canvas.getContext('2d');

//set the canvas dimension to the size of the window
canvas.height = window.innerHeight
canvas.width = window.innerWidth;



//constructor function - javascript object maker
function Circle(x,y,dx,dy,radius){
    
    //color property set with a randomized color value and an alpha value of .5
    this.color = `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${.5})`
   
    // x location property
    this.x  = x;
    
    //y location property
    this.y =  y;
    
    // x velocity property
    this.dx  = dx;
    
    //y velocity property
    this.dy =  dy;
    
    // radius property
    this.radius = radius;
    
    //method to draw the circle
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI *2,false);
        c.fillStyle=this.color;
        c.fill();
    };

    //method for changing the circle location
    this.update = function(){

        //conditional for reversing x velocity
        if (this.x + this.radius + chromeScrollBarWidth >= canvas.width || this.x - this.radius  <= 0){
        this.dx = -this.dx;

        //conditional for reducing the radius of the circle when hitting the sides of the window
        if (this.radius >=2){
        this.radius-=2;}
        }
    
        //conditional for reversing y velocity
        if (this.y - this.radius <= 0 || this.y + this.radius + chromeScrollBarWidth >= canvas.height){
        this.dy =-this.dy;

        //conditional for reducing the radius of the circle when hitting the top and bottom of the window
        if (this.radius >=2 ){
        this.radius-=2;}
        }
            
        //move the circle dx pixel(s) to the right or left every frame refresh based on whether dx is postive or negative
        this.x += this.dx;
    
        //move the circle dy pixel(s) to the top or bottom every frame refresh based on whether dy is postive or negative
        this.y += this.dy;

        //call the draw method after updating the position
        this.draw();
    };

    
}

//array for circle objects
var circleArray = [];

//filling the empty array with circle objects
for (var i=0; i<150;i++){

    //width of the Chrome browser scroll bar
    var chromeScrollBarWidth = 17;
    
    //random radius within a specified range
    var radius = Math.random() * 60;
    
    //random x position within the browser window including a Chrome scroll bar on the right of the screen
    var x = Math.random() * (canvas.width- (radius*2 + chromeScrollBarWidth))+ radius;

    //random y position within the browser window including a Chrome scroll bar on the bottom of the screen
    var y = Math.random() * (canvas.height - (radius *2 + chromeScrollBarWidth)) + radius;


    //random x velocity within a specified range - positive or negative values
    var dx = (Math.random() - .5) * 16;

    //random y velocity within a specified range - positive or negative values
    var dy = (Math.random() - .5) * 16;


    //add a new random circle object to the array
    circleArray.push(new Circle(x,y,dx,dy,radius));
    console.log(circleArray);
}

//function where the animation happens
function animate(){
    
    //special function to create animation
    requestAnimationFrame(animate);
    
    //clear the entire canvas before redrawing the circle
    c.clearRect(0,0,canvas.width,canvas.height);
    
    //looping through each circle object in the circle array and updating its position and then redrawing it
    for (var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
    
}

//animate function is called
animate();