const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawSticker(text, template="circle") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background template
  if (template === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.stroke();
  } else if (template === "star") {
    // Simple star shape
    ctx.fillStyle = "#ffe4ec";
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
    ctx.stroke();
  }

  // Text styling
  ctx.font = "bold 32px Comic Sans MS";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ff4081";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 6;
  ctx.fillText(text, canvas.width/2, canvas.height/2);
  ctx.strokeText(text, canvas.width/2, canvas.height/2);
}

function addText() {
  const text = document.getElementById("textInput").value;
  const template = document.getElementById("templateSelect").value;
  drawSticker(text, template);
}

function downloadSticker() {
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
