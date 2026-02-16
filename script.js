const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let text = "";
let font = "Arial";

const emojis = "😀😁😂🤣😎😍🥳😡👻🔥⭐❤️🚀💀🎉✨🍕🐶".split("");

const emojiPanel = document.getElementById("emojiPanel");

emojis.forEach(e => {
  const span = document.createElement("span");
  span.innerText = e;
  span.onclick = () => addEmoji(e);
  emojiPanel.appendChild(span);
});

function toggleEmoji() {
  emojiPanel.style.display =
    emojiPanel.style.display === "none" ? "block" : "none";
}

function addEmoji(e) {
  ctx.font = "60px Arial";
  ctx.fillText(e, 250, 300);
}

function drawTemplate(type) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#222";

  if (type === "circle") {
    ctx.beginPath();
    ctx.arc(300, 300, 250, 0, Math.PI * 2);
    ctx.fill();
  }

  if (type === "square") {
    ctx.fillRect(50, 50, 500, 500);
  }

  if (type === "star") {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        300 + 250 * Math.cos((18 + i * 72) / 180 * Math.PI),
        300 - 250 * Math.sin((18 + i * 72) / 180 * Math.PI)
      );
      ctx.lineTo(
        300 + 100 * Math.cos((54 + i * 72) / 180 * Math.PI),
        300 - 100 * Math.sin((54 + i * 72) / 180 * Math.PI)
      );
    }
    ctx.closePath();
    ctx.fill();
  }
}

document.getElementById("templateSelect").onchange = e => {
  drawTemplate(e.target.value);
};

function addText() {
  text = document.getElementById("textInput").value;
  font = document.getElementById("fontSelect").value;

  ctx.font = "40px " + font;
  ctx.fillStyle = "white";
  ctx.fillText(text, 150, 100);
}

function download() {
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL();
  link.click();
}
