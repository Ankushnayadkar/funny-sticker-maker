const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let uploadedImage = null;

document.getElementById("upload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      uploadedImage = img;
      drawSticker(); // draw image immediately
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

function drawSticker(text = "") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circular sticker background (white border like Redbubble)
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI * 2);
  ctx.clip();
  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.restore();

  // Add text with outline + shadow
  if (text) {
    ctx.font = "bold 32px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff4081";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 6;
    ctx.fillText(text, canvas.width/2, canvas.height - 40);
    ctx.strokeText(text, canvas.width/2, canvas.height - 40);
  }
}

function addText() {
  const text = document.getElementById("textInput").value;
  drawSticker(text);
}

function downloadSticker() {
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
