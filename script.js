const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let uploadedImage = null;

// Upload image
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

// Draw sticker
function drawSticker(text = "") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const template = document.getElementById("templateSelect").value;

  if (template === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  if (template === "star") {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        canvas.width/2 + 100 * Math.cos((18 + i*72) * Math.PI/180),
        canvas.height/2 - 100 * Math.sin((18 + i*72) * Math.PI/180)
      );
      ctx.lineTo(
        canvas.width/2 + 40 * Math.cos((54 + i*72) * Math.PI/180),
        canvas.height/2 - 40 * Math.sin((54 + i*72) * Math.PI/180)
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  if (["speech","cloud","badge","meme"].includes(template)) {
    const templateImg = new Image();
    templateImg.src = "templates/" + template + ".png";
    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
      if (uploadedImage) ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
      drawText(text);
    };
    return;
  }

  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  }

  if (text) drawText(text);
}

// Draw text
function drawText(text) {
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  ctx.font = "bold 32px " + font;
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(0,255,255,0.7)";
  ctx.shadowBlur = 10;
  ctx.fillText(text, canvas.width/2, canvas.height - 40);
  ctx.strokeText(text, canvas.width/2, canvas.height - 40);
}

// Add text
function addText() {
  const text = document.getElementById("textInput").value;
  drawSticker(text);
}

// Add emoji
function addEmoji() {
  const emoji = document.getElementById("emojiSelect").value;
  const textInput = document.getElementById("textInput");
  textInput.value += emoji;
  drawSticker(textInput.value);
}

// Download sticker
function downloadSticker() {
  const text = document.getElementById("textInput").value;
  drawSticker(text);
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
