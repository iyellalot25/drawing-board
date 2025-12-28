const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const toolBtns = document.querySelectorAll(".tool");

//global var with default val
let prevMouseX, prevMouseY;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

//startDraw
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath(); //Everytime mousedown new path not continue from prev path
  ctx.lineWidth = brushWidth;
});

//drawing
canvas.addEventListener('mousemove', (e) => {
  if(!isDrawing) return; //immediately return dont draw
  if(selectedTool === 'brush') {
    ctx.lineTo(e.offsetX, e.offsetY); //creating line according to mouse coordinates
    ctx.stroke();  //drawing/fillng line with color
  } else if(selectedTool === 'rectangle') {
    const width = prevMouseX - e.offsetX;
    const height =  prevMouseY - e.offsetY;
    ctx.strokeRect(e.offsetX, e.offsetY, width, height);
  }
});

//stopDraw
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

toolBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active'); //removing active from current active btn before adding it to clicked btn
    btn.classList.add('active');
    selectedTool = btn.id;
  });
})