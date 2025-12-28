const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.getElementById('fill-color');
const ctx = canvas.getContext("2d");

//global var with default val
let prevMouseX, prevMouseY, snapshot;
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
  //copying canvas data and passing as snapshot value this avoids the dragging effect
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

//drawing
canvas.addEventListener('mousemove', (e) => {
  if(!isDrawing) return; //immediately return dont draw
  ctx.putImageData(snapshot, 0, 0); //adding copied snapshot to current canvas

  if(selectedTool === 'brush') {
    ctx.lineTo(e.offsetX, e.offsetY); //creating line according to mouse coordinates
    ctx.stroke();  //drawing/fillng line with color
  } else if(selectedTool === 'rectangle') {
    const width = prevMouseX - e.offsetX;
    const height =  prevMouseY - e.offsetY;
    fillColor.checked ? ctx.fillRect(e.offsetX, e.offsetY, width, height) : ctx.strokeRect(e.offsetX, e.offsetY, width, height);
  } else if(selectedTool === 'circle') {
    ctx.beginPath(); //resetting path so that repeated circles dont form
    //calculating radius according to mouseptr
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2*Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
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
});