const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;
let template = "square";

document.getElementById("upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    uploadedImage = new Image();
    uploadedImage.onload = drawCanvas;
    uploadedImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

document.getElementById("template").addEventListener("change", function (e) {
  template = e.target.value;
  drawCanvas();
});

function drawShape() {
  ctx.beginPath();

  if (template === "circle") {
    ctx.arc(250, 250, 200, 0, Math.PI * 2);
  } else if (template === "star") {
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
  } else {
    ctx.rect(50, 50, 400, 400);
  }

  ctx.clip();
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!uploadedImage) return;

  ctx.save();
  drawShape();

  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

  ctx.restore();
}

document.getElementById("download").addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = canvas.toDataURL();
  link.click();
});
