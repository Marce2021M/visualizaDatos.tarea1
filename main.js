// Get the canvas element
var canvas = document.getElementById("myCanvas");

// Set the canvas size to full screen
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// Get the drawing context
var ctx = canvas.getContext("2d");

//Fill the canvas with dark gray:
// ctx.fillStyle = "#222"; // set the color
// ctx.fillRect(0, 0, canvas.width, canvas.height);  //apply the color to the whole canvas

// Move the origin to the center of the canvas:
ctx.translate(canvas.width/2, canvas.height/2);
// Flip the y-axis:
ctx.scale(1,-1);

// Variables globales

let points = [];
let points2 = [];
let newRectAux = [];
let newRect2Aux = [];
let rectFactor = 0.8;


// ------------------------------------------------------------
// FUNCTIONS:

// we're going to create a function that scales the points to the canvas size:
function scalePoints(points, newRect) {
    const [newMinX, newMaxX, newMinY, newMaxY] = newRect; // Mejora la claridad

    // Inicializa los valores mínimos y máximos
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    // Calcula los valores mínimos y máximos en una sola iteración
    points.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    });

    // Transforma los puntos al nuevo rectángulo
// Transforma los puntos al nuevo rectángulo
const pointsTransformed = points.map(([x, y]) => {
    // Calcula la mitad de los nuevos límites para usar como valor predeterminado
    const defaultX = (newMinX + newMaxX) / 2;
    const defaultY = (newMinY + newMaxY) / 2;

    // Verifica si maxX es igual a minX para evitar la división por cero
    const xTransformed = maxX !== minX 
        ? ((x - minX) / (maxX - minX)) * (newMaxX - newMinX) + newMinX 
        : defaultX; // Usa el valor predeterminado si maxX es igual a minX

    // Verifica si maxY es igual a minY para evitar la división por cero
    const yTransformed = maxY !== minY 
        ? ((y - minY) / (maxY - minY)) * (newMaxY - newMinY) + newMinY 
        : defaultY; // Usa el valor predeterminado si maxY es igual a minY

    return [xTransformed, yTransformed];
});

    return pointsTransformed;
}

function drawAxes(ctx) {
    // Variables importantes para el dibujo de los ejes:
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    // Tamaño de las flechas basado en el menor de los lados del canvas, ajustado para la visualización
    let arrowSize = 0.2 * Math.min(canvasWidth, canvasHeight)/8;
    ctx.lineWidth = .8;
    ctx.strokeStyle = "#FFFFFF";

    // Dibujar eje X
    ctx.moveTo(-canvasWidth / 2, 0); // Comienza desde el borde izquierdo (centro trasladado)
    ctx.lineTo(canvasWidth / 2, 0); // Hasta el borde derecho
    // Flecha del eje X
    ctx.lineTo((canvasWidth / 2) - arrowSize, -arrowSize); // Línea inferior de la flecha
    ctx.moveTo(canvasWidth / 2, 0); // Vuelve al final del eje X
    ctx.lineTo((canvasWidth / 2) - arrowSize, arrowSize); // Línea superior de la flecha

    // Dibujar eje Y
    ctx.moveTo(0, -canvasHeight / 2); // Comienza desde el borde superior (centro trasladado y eje Y invertido)
    ctx.lineTo(0, canvasHeight / 2); // Hasta el borde inferior
    // Flecha del eje Y (teniendo en cuenta la inversión del eje Y)
    ctx.lineTo(-arrowSize, (canvasHeight / 2) - arrowSize); // Línea izquierda de la flecha
    ctx.moveTo(0, canvasHeight / 2); // Vuelve al final del eje Y (arriba debido a la inversión)
    ctx.lineTo(arrowSize, (canvasHeight / 2) - arrowSize); // Línea derecha de la flecha

    ctx.stroke(); // Dibuja los ejes y las flechas
}

function drawScatterPoints(points, color) {
    ctx.fillStyle = color; // Establece el color de relleno para los puntos
    ctx.lineWidth = 10; // Establece el ancho de línea para los puntos

    points.forEach(point => {
        let [x, y] = point; // Desestructura cada punto para obtener x e y

        ctx.beginPath(); // Inicia un nuevo camino para el círculo
        ctx.arc(x , y , 10, 0, 2 * Math.PI); // Dibuja un círculo en la posición escalada
        ctx.closePath(); // Cierra el camino
        ctx.fill(); // Rellena el círculo con el color establecido
    });
}

function generaPuntosyRectangulo() {
    // Actualiza los inputs:
    // Actualiza los inputs:
    const N = parseInt(document.getElementById('nValue').value, 10);
    const N2 = parseInt(document.getElementById('n2Value').value, 10);
    const factor1 = parseFloat(document.getElementById('factor1').value);
    const factor2 = parseFloat(document.getElementById('factor2').value);
    const factor3 = parseFloat(document.getElementById('factor3').value);
    const factor4 = parseFloat(document.getElementById('factor4').value);
    rectFactor = parseFloat(document.getElementById('rectFactor').value);

    let newRectMinX = parseFloat(document.getElementById('newRectMinX').value);
    let newRectMaxX = parseFloat(document.getElementById('newRectMaxX').value);
    let newRectMinY = parseFloat(document.getElementById('newRectMinY').value);
    let newRectMaxY = parseFloat(document.getElementById('newRectMaxY').value);

    // Define newRect usando los valores capturados
    newRectAux = [newRectMinX, newRectMaxX, newRectMinY, newRectMaxY];

    // Captura los valores de los campos de entrada para newRect2
    let newRect2MinX = parseFloat(document.getElementById('newRect2MinX').value);
    let newRect2MaxX = parseFloat(document.getElementById('newRect2MaxX').value);
    let newRect2MinY = parseFloat(document.getElementById('newRect2MinY').value);
    let newRect2MaxY = parseFloat(document.getElementById('newRect2MaxY').value);

    newRect2Aux = [newRect2MinX, newRect2MaxX, newRect2MinY, newRect2MaxY];

    // Create a list of random points:
    points = [];
    for (let i = 0; i < N; i++) {
        points.push([Math.random() * factor1 - factor1/2, Math.random() * factor2 - factor2/2]);
    }
    
    points2 = [];
    for (let i = 0; i < N2; i++) {
        points2.push([Math.random() * factor3 - factor3/2, Math.random() * factor4 - factor4/2]);
    }
    
    // Create a new rectangle to scale the points to the canvas size:
    
    newRect = newRectAux.map(number => number * rectFactor* Math.min(canvas.width, canvas.height)/2); // [minX, maxX, minY, maxY]
    newRect2 = newRect2Aux.map(number => number * rectFactor* Math.min(canvas.width, canvas.height)/2); // [minX, maxX, minY, maxY]

}

// ------------------------------------------------------------
// OUTPUT:
function draw(){
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    // Move the origin to the center of the canvas:
    ctx.translate(canvas.width/2, canvas.height/2);
    // Flip the y-axis:
    ctx.scale(1,-1);
    // Clear the canvas:
    ctx.fillStyle = "#000000"; // set the color
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);  //apply the color to the whole canvas
    
    generaPuntosyRectangulo();
    let pointsTransformed1 = scalePoints(points, newRect);
    let pointsTransformed2 = scalePoints(points2, newRect2);
    drawScatterPoints(points,"#FF00FF");
    drawScatterPoints(pointsTransformed1, "#FF000F");
    drawScatterPoints(points2,"#00FFFF");
    drawScatterPoints(pointsTransformed2, "#00FF0F");    
    drawAxes(ctx, canvas.width, canvas.height);
}

function handleResize() {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    // Move the origin to the center of the canvas:
    ctx.translate(canvas.width/2, canvas.height/2);
    // Flip the y-axis:
    ctx.scale(1,-1);
    // Clear the canvas:
    ctx.fillStyle = "#000000"; // set the color
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);  //apply the color to the whole canvas

    let newRect = newRectAux.map(number => number * rectFactor* Math.min(canvas.width, canvas.height)/2); // [minX, maxX, minY, maxY]
    let newRect2 = newRect2Aux.map(number => number * rectFactor* Math.min(canvas.width, canvas.height)/2); // [minX, maxX, minY, maxY]

    let pointsTransformed1 = scalePoints(points, newRect);
    let pointsTransformed2 = scalePoints(points2, newRect2);
    drawScatterPoints(points,"#FF00FF");
    drawScatterPoints(pointsTransformed1, "#FF000F");
    drawScatterPoints(points2,"#00FFFF");
    drawScatterPoints(pointsTransformed2, "#00FF0F");    
    drawAxes(ctx, canvas.width, canvas.height);

}

// Agrega el detector de eventos de redimensionamiento
window.addEventListener('resize', handleResize);


// ------------------------------------------------------------
// Code to draw a line:

// // Start a new path
// ctx.beginPath();
// // Define the start point of the line
// ctx.moveTo(0, 0);
// // Define the end point of the line
// ctx.lineTo(.2*canvas.width, .2*canvas.height);
// // Set the stroke style
// ctx.strokeStyle = 'red';
// // Draw the line
// ctx.stroke();

// // Set the fill style
// ctx.fillStyle = 'white';
// // Draw a filled shape (won't affect the line)
// ctx.fill();

// ------------------------------------------------------------




