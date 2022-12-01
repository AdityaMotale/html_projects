const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

const sizeSlider = document.querySelector("#stroke-slider");

let isDrawing = false;

let start;

let brushWidth;

let fillColor = "#f5f5f5";

let prevMouseX, prevMouseY, snapshot;

// Done Above


const drawRect = (e) => {
    // stroke rect
    context.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}


const drawTriangle = (e) => {
    context.beginPath(); // creating new path to draw circle
    context.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    context.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    context.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    context.closePath(); // closing path of a triangle so the third line draw automatically
    // fillColor.checked ? context.fill() :
    context.stroke(); // if fillColor is checked fill triangle else draw border
}

const drawCircle = (e) => {
    context.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    // fillColor.checked ? ctx.fill() :
        context.stroke(); // if fillColor is checked fill circle else draw border circle
}

// Done
window.addEventListener('load', (e) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const handleStart = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    context.beginPath();
    context.lineWidth = brushWidth;
    context.strokeStyle = "#4A98F7"

    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return;

    context.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas


    context.lineTo(e.offsetX, e.offsetY);
    // context.stroke();

    // drawRect(e);
    // drawTriangle(e);
    drawCircle(e);

}
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mouseup', (e) => isDrawing = false);
