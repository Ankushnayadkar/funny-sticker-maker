const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      drawSticker();
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

function drawSticker(text = "") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const template = document.getElementById("templateSelect").value;

  ctx.save();

  if (template === "circle") {
    ctx.beginPath();
    ctx.arc(250, 250, 230, 0, Math.PI * 2);
    ctx.clip();
  }

  if (template === "star") {
    ctx.beginPath();
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
    ctx.closePath();
    ctx.clip();
  }

  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  }

  ctx.restore();

  if (text) drawText(text);
}

function drawText(text) {
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;

  ctx.font = "bold 40px " + font;
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  ctx.fillText(text, 250, 460);
  ctx.strokeText(text, 250, 460);
}

function addText() {
  const text = document.getElementById("textInput").value;
  drawSticker(text);
}

function downloadSticker() {
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL();
  link.click();
}

const emojiPanel = document.getElementById("emojiPanel");

const emojis = [
"😀","😁","😂","🤣","😎","😍","🥵","🤯","😡","🥶",
"🤡","👻","🔥","💀","💯","🚀","😴","🤪","😇","🤖",
"🐱","🐶","🦄","🐸","🍕","🍔","🍺","❤️","⭐","⚡"
];

emojis.forEach(e => {
  const btn = document.createElement("button");
  btn.innerHTML = e;
  btn.onclick = () => addEmoji(e);
  emojiPanel.appendChild(btn);
});

function toggleEmoji() {
  emojiPanel.style.display =
    emojiPanel.style.display === "none" ? "block" : "none";
}

function addEmoji(e) {
  const input = document.getElementById("textInput");
  input.value += e;
  drawSticker(input.value);
}
