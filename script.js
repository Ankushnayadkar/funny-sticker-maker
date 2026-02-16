const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = null;
let text = "";
let textX = 200;
let textY = 200;

function draw() {
ctx.clearRect(0,0,400,400);
if (img) ctx.drawImage(img,0,0,400,400);

ctx.fillStyle = document.getElementById("colorPicker").value;
ctx.font = "30px " + document.getElementById("fontSelect").value;
ctx.textAlign = "center";
ctx.fillText(text, textX, textY);
}

document.getElementById("upload").onchange = e => {
const file = e.target.files[0];
const reader = new FileReader();

reader.onload = () => {
img = new Image();
img.onload = draw;
img.src = reader.result;
};

reader.readAsDataURL(file);
};

document.getElementById("addText").onclick = () => {
text = document.getElementById("textInput").value;
draw();
};

document.getElementById("fontSelect").onchange = draw;
document.getElementById("colorPicker").onchange = draw;

canvas.onmousedown = e => {
textX = e.offsetX;
textY = e.offsetY;
draw();
};

document.getElementById("download").onclick = () => {
const link = document.createElement("a");
link.download = "sticker.png";
link.href = canvas.toDataURL();
link.click();
};

document.getElementById("randomLine").onclick = () => {
const cat = document.getElementById("libraryCategory").value;
if (!cat) return;

const lines = LIBRARY[cat];
const random = lines[Math.floor(Math.random()*lines.length)];

text = random;
document.getElementById("textInput").value = random;
draw();
};
