const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let brushWidth = 5;

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

canvas.addEventListener('mousedown', () => {
  isDrawing = true;
  ctx.beginPath(); //Everytime mousedown new path not continue from prev path
  ctx.lineWidth = brushWidth;
});

canvas.addEventListener('mousemove', (e) => {
  if(!isDrawing) return; //immediately return dont draw
  ctx.lineTo(e.offsetX, e.offsetY); //creating line according to mouse coordinates
  ctx.stroke();  //drawing/fillng line with color
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});