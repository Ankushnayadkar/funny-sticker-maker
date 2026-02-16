const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

let state = {
  text: "",
  x: 200,
  y: 340,
  dragging: false,
  offsetX: 0,
  offsetY: 0
};

// ---------- UPLOAD ----------
document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      draw();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// ---------- LIVE UI UPDATE ----------
document.getElementById("fontSelect").addEventListener("change", draw);
document.getElementById("colorPicker").addEventListener("input", draw);
document.getElementById("templateSelect").addEventListener("change", draw);

// ---------- TEXT ----------
function addText() {
  state.text = document.getElementById("textInput").value;
  draw();
}

function addEmoji() {
  const emoji = document.getElementById("emojiSelect").value;
  const input = document.getElementById("textInput");
  input.value += emoji;
  state.text = input.value;
  draw();
}

// ---------- DRAW ENGINE ----------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTemplate();
  drawImage();
  drawText();
}

// ---------- TEMPLATE ----------
function drawTemplate() {
  const template = document.getElementById("templateSelect").value;

  if (template === "circle") {
    ctx.beginPath();
    ctx.arc(200, 200, 190, 0, Math.PI * 2);
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
        200 + 100 * Math.cos((18 + i * 72) * Math.PI / 180),
        200 - 100 * Math.sin((18 + i * 72) * Math.PI / 180)
      );
      ctx.lineTo(
        200 + 40 * Math.cos((54 + i * 72) * Math.PI / 180),
        200 - 40 * Math.sin((54 + i * 72) * Math.PI / 180)
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

// ---------- IMAGE ----------
function drawImage() {
  if (!uploadedImage) return;

  const ratio = Math.min(
    canvas.width / uploadedImage.width,
    canvas.height / uploadedImage.height
  );

  const w = uploadedImage.width * ratio;
  const h = uploadedImage.height * ratio;

  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;

  ctx.drawImage(uploadedImage, x, y, w, h);
}

// ---------- TEXT ----------
function drawText() {
  if (!state.text) return;

  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;

  ctx.save();
  ctx.font = "bold 32px " + font;
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(0,255,255,0.7)";
  ctx.shadowBlur = 10;

  ctx.fillText(state.text, state.x, state.y);
  ctx.strokeText(state.text, state.x, state.y);

  ctx.restore();
}

// ---------- DRAG TEXT ----------
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const dist = Math.hypot(mx - state.x, my - state.y);

  if (dist < 80) {
    state.dragging = true;
    state.offsetX = mx - state.x;
    state.offsetY = my - state.y;
  }
});

canvas.addEventListener("mousemove", e => {
  if (!state.dragging) return;

  const rect = canvas.getBoundingClientRect();
  state.x = e.clientX - rect.left - state.offsetX;
  state.y = e.clientY - rect.top - state.offsetY;

  draw();
});

canvas.addEventListener("mouseup", () => state.dragging = false);
canvas.addEventListener("mouseleave", () => state.dragging = false);

// ---------- EXPORT ----------
function downloadSticker() {
  const exportSize = 3000;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = exportSize;
  exportCanvas.height = exportSize;
  const exportCtx = exportCanvas.getContext("2d");

  const scale = exportSize / canvas.width;
  exportCtx.scale(scale, scale);

  exportCtx.drawImage(canvas, 0, 0);

  const link = document.createElement("a");
  link.download = "sticker.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
}
