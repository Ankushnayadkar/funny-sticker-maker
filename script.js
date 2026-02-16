const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let image = null;
let text = "";
let font = "Impact";
let color = "#000000";
let emoji = "";
let template = "circle";

let textX = 250;
let textY = 450;
let dragging = false;

// Upload image
document.getElementById("upload").onchange = e => {
const file = e.target.files[0];
const img = new Image();
img.onload = () => {
image = img;
draw();
};
img.src = URL.createObjectURL(file);
};

// Text controls
document.getElementById("addText").onclick = () => {
text = document.getElementById("textInput").value + emoji;
draw();
};

document.getElementById("fontSelect").onchange = e => {
font = e.target.value;
draw();
};

document.getElementById("colorPicker").onchange = e => {
color = e.target.value;
draw();
};

document.getElementById("emojiSelect").onchange = e => {
emoji = e.target.value;
};

document.getElementById("templateSelect").onchange = e => {
template = e.target.value;
draw();
};

// Drag text
canvas.onmousedown = e => dragging = true;
canvas.onmouseup = () => dragging = false;
canvas.onmousemove = e => {
if (dragging) {
textX = e.offsetX;
textY = e.offsetY;
draw();
}
};

// SVG shape masks
function maskShape() {
ctx.beginPath();

if (template === "circle") {
ctx.arc(250, 250, 200, 0, Math.PI * 2);
}

if (template === "star") {
for (let i = 0; i < 5; i++) {
ctx.lineTo(
250 + 200 * Math.cos((18 + i * 72) * Math.PI / 180),
250 - 200 * Math.sin((18 + i * 72) * Math.PI / 180)
);
ctx.lineTo(
250 + 80 * Math.cos((54 + i * 72) * Math.PI / 180),
250 - 80 * Math.sin((54 + i * 72) * Math.PI / 180)
);
}
}

if (template === "heart") {
ctx.moveTo(250, 350);
ctx.bezierCurveTo(100, 200, 100, 50, 250, 150);
ctx.bezierCurveTo(400, 50, 400, 200, 250, 350);
}

ctx.closePath();
ctx.clip();
}

function draw() {
ctx.clearRect(0, 0, 500, 500);

ctx.save();
maskShape();

if (image) {
ctx.drawImage(image, 0, 0, 500, 500);
}

ctx.restore();

// Text
ctx.fillStyle = color;
ctx.font = `40px ${font}`;
ctx.textAlign = "center";
ctx.strokeStyle = "black";
ctx.lineWidth = 4;

ctx.strokeText(text, textX, textY);
ctx.fillText(text, textX, textY);
}

// Export HD
document.getElementById("download").onclick = () => {
const link = document.createElement("a");
link.download = "sticker.png";
link.href = canvas.toDataURL("image/png");
link.click();
};
