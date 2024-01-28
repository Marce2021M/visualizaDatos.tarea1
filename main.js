// Get the canvas element
var canvas = document.getElementById("myCanvas");

// Set the canvas size to full screen
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// Get the drawing context
var ctx = canvas.getContext("2d");

//Fill the canvas with dark gray:
ctx.fillStyle = "#222"; // set the color
ctx.fillRect(0, 0, canvas.width, canvas.height);  //apply the color to the whole canvas


// ------------------------------------------------------------
// Your drawing code goes here:

//Let's create some synthetic data:
let N = 10;
let X = [];
let Y = [];

// Move the origin to the center of the canvas:
ctx.translate(canvas.width/2, canvas.height/2);
// Flip the y-axis:
ctx.scale(1,-1);
// This line sets the color used for strokes (lines).
ctx.strokeStyle = "#FFFFFF";
// Set the line width:
ctx.lineWidth = 3;

for (let i = 0; i < N; i++) {
    X.push(Math.random()-0.5)
    Y.push(Math.random()-0.5)
}

function drawscatterpoints(X,Y,color){
    let Npoints = X.length;
    ctx.fillStyle = color;
    for (let i = 0; i < Npoints; i++) {
        // Create a circle:
        ctx.beginPath();
        ctx.arc(X[i] * canvas.width, Y[i] * canvas.height, 10, 0, 2 * Math.PI)
        //ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

function draw_elipse(){
    // Save the original transformation matrix:
    let theT = ctx.getTransform();

    // Draw the elipse by transforming the canvas:
    ctx.scale(1,5);
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI)
    ctx.closePath();
    
    // Restore the original transformation matrix:
    ctx.setTransform(theT);
    ctx.fill();
    ctx.stroke();
}

function draw(){
    drawscatterpoints(X,Y,"#FF00FF");
     window.requestAnimationFrame(draw);
}

// The draw() function is executed here:
//draw();

draw_elipse();