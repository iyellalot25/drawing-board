const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.getElementById('fill-color');
const sizeSlider = document.getElementById('size-slider');
const ctx = canvas.getContext("2d");
const colorBtns = document.querySelectorAll('.colors .option');
const colorPicker = document.getElementById('color-picker');
const clearCanvas = document.querySelector('.clear-canvas');
const saveImg = document.querySelector('.save-img');

//global var with default val
let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = '#000';

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
  ctx.fillStyle = selectedColor;
  ctx.strokeStyle = selectedColor;
  //copying canvas data and passing as snapshot value this avoids the dragging effect
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

//drawing
canvas.addEventListener('mousemove', (e) => {
  if(!isDrawing) return; //immediately return dont draw
  ctx.putImageData(snapshot, 0, 0); //adding copied snapshot to current canvas

  if(selectedTool === 'brush' || selectedTool === 'eraser') {
    ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
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

  } else if(selectedTool === 'triangle') {
    ctx.beginPath(); //resetting so that overlapping triangles do not form
    ctx.moveTo(prevMouseX, prevMouseY); //moving triangle to mouseptr
    ctx.lineTo(e.offsetX, e.offsetY); //creating the first line according to the mouseptr
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); //creating bottom line of triangle
    ctx.closePath(); //closing the path of the triangle so the third line forms automatically
    fillColor.checked ? ctx.fill() : ctx.stroke();
  
  } else if(selectedTool === 'line') {
    ctx.beginPath(); //resetting so that overlapping lines do not form
    ctx.moveTo(prevMouseX, prevMouseY); //moving line to mouseptr
    ctx.lineTo(e.offsetX, e.offsetY); //creating the line according to the mouseptr
    ctx.stroke();
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

sizeSlider.addEventListener('change', () => {
  brushWidth = sizeSlider.value;
});

colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .selected').classList.remove('selected'); //removing active from current active btn before adding it to clicked btn
    btn.classList.add('selected');
    selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
  });
});

colorPicker.addEventListener('change', () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  selectedColor = colorPicker.value;
});

clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); ;// clearing whole canvas
});

saveImg.addEventListener('click', () => {
  const link = document.createElement("a"); //create <a>
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
})