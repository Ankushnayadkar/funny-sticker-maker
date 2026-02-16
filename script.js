const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let text = "";
let font = "Arial";

function addText() {
text = document.getElementById("textInput").value;
font = document.getElementById("fontSelect").value;

ctx.clearRect(0, 0, canvas.width, canvas.height);

drawTemplate();

ctx.font = "50px " + font;
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText(text, 300, 320);
}

function drawTemplate() {
let template = document.getElementById("templateSelect").value;

ctx.fillStyle = "#ff3c7d";

if (template === "circle") {
ctx.beginPath();
ctx.arc(300, 300, 200, 0, Math.PI * 2);
ctx.fill();
}

if (template === "square") {
ctx.fillRect(100, 100, 400, 400);
}

if (template === "star") {
ctx.beginPath();
ctx.moveTo(300,100);
ctx.lineTo(350,250);
ctx.lineTo(500,250);
ctx.lineTo(380,350);
ctx.lineTo(420,500);
ctx.lineTo(300,420);
ctx.lineTo(180,500);
ctx.lineTo(220,350);
ctx.lineTo(100,250);
ctx.lineTo(250,250);
ctx.closePath();
ctx.fill();
}

if (template === "heart") {
ctx.beginPath();
ctx.moveTo(300,450);
ctx.bezierCurveTo(100,250,100,100,300,200);
ctx.bezierCurveTo(500,100,500,250,300,450);
ctx.fill();
}
}

function download() {
let link = document.createElement("a");
link.download = "sticker.png";
link.href = canvas.toDataURL();
link.click();
}

const emojis = "😀😁😂🤣😎😍😘😜🤩🥳😡😭👍🔥💯❤️✨⭐🌈🍕🚀⚡🎉".split("");

const panel = document.getElementById("emojiPanel");
const emojiBtn = document.getElementById("emojiBtn");

emojiBtn.onclick = () => {
panel.style.display = panel.style.display === "none" ? "block" : "none";
};

emojis.forEach(e => {
let span = document.createElement("span");
span.className = "emoji";
span.textContent = e;
span.onclick = () => {
document.getElementById("textInput").value += e;
};
panel.appendChild(span);
});
