const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;
let cachedTemplates = {};

// ---------- SAFE IMAGE UPLOAD ----------
document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return; // cancel safe

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image.");
    return;
  }

  const reader = new FileReader();

  reader.onerror = () => alert("Image read failed.");

  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      drawSticker();
    };
    img.onerror = () => alert("Image load failed.");
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// ---------- TEMPLATE CACHE ----------
function loadTemplate(name, callback) {
  if (cachedTemplates[name]) {
    callback(cachedTemplates[name]);
    return;
  }

  const img = new Image();
  img.onload = () => {
    cachedTemplates[name] = img;
    callback(img);
  };
  img.onerror = () => alert("Template failed to load: " + name);
  img.src = "templates/" + name + ".png";
}

// ---------- MAIN DRAW ----------
function drawSticker(text = "") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const template = document.getElementById("templateSelect").value;

  if (["speech","cloud","badge","meme"].includes(template)) {
    loadTemplate(template, templateImg => {
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
      drawImageSafe(ctx);
      drawTextSafe(ctx, text);
    });
    return;
  }

  drawShapeTemplate(ctx, template);
  drawImageSafe(ctx);
  drawTextSafe(ctx, text);
}

// ---------- SHAPE TEMPLATES ----------
function drawShapeTemplate(context, template) {
  if (template === "circle") {
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI*2);
    context.fillStyle = "#fff";
    context.fill();
    context.strokeStyle = "#000";
    context.lineWidth = 5;
    context.stroke();
  }

  if (template === "star") {
    context.fillStyle = "#fff";
    context.beginPath();
    for (let i = 0; i < 5; i++) {
      context.lineTo(
        canvas.width/2 + 100 * Math.cos((18 + i*72) * Math.PI/180),
        canvas.height/2 - 100 * Math.sin((18 + i*72) * Math.PI/180)
      );
      context.lineTo(
        canvas.width/2 + 40 * Math.cos((54 + i*72) * Math.PI/180),
        canvas.height/2 - 40 * Math.sin((54 + i*72) * Math.PI/180)
      );
    }
    context.closePath();
    context.fill();
    context.strokeStyle = "#000";
    context.lineWidth = 5;
    context.stroke();
  }
}

// ---------- SAFE IMAGE DRAW ----------
function drawImageSafe(context) {
  if (!uploadedImage) return;

  const ratio = Math.min(
    canvas.width / uploadedImage.width,
    canvas.height / uploadedImage.height
  );

  const w = uploadedImage.width * ratio;
  const h = uploadedImage.height * ratio;

  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;

  context.drawImage(uploadedImage, x, y, w, h);
}

// ---------- SAFE TEXT ----------
function drawTextSafe(context, text) {
  if (!text) return;

  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;

  context.save();
  context.font = "bold 32px " + font;
  context.textAlign = "center";
  context.fillStyle = color;
  context.strokeStyle = "#000";
  context.lineWidth = 3;
  context.shadowColor = "rgba(0,255,255,0.7)";
  context.shadowBlur = 10;

  wrapText(context, text, canvas.width/2, canvas.height - 40, 300, 36);

  context.restore();
}

// ---------- TEXT WRAP ----------
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let offsetY = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line, x, y + offsetY);
      context.strokeText(line, x, y + offsetY);
      line = words[n] + " ";
      offsetY += lineHeight;
    } else {
      line = testLine;
    }
  }

  context.fillText(line, x, y + offsetY);
  context.strokeText(line, x, y + offsetY);
}

// ---------- ADD TEXT ----------
function addText() {
  const text = document.getElementById("textInput").value;
  drawSticker(text);
}

// ---------- EMOJI ----------
function addEmoji() {
  const emoji = document.getElementById("emojiSelect").value;
  const input = document.getElementById("textInput");
  input.value += emoji;
  drawSticker(input.value);
}

// ---------- PRO EXPORT ----------
function downloadSticker() {
  const exportSize = 3000;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = exportSize;
  exportCanvas.height = exportSize;

  const exportCtx = exportCanvas.getContext("2d");
  const scale = exportSize / canvas.width;
  exportCtx.scale(scale, scale);

  const text = document.getElementById("textInput").value;

  // redraw on export canvas
  drawShapeTemplate(exportCtx, document.getElementById("templateSelect").value);
  drawImageSafe(exportCtx);
  drawTextSafe(exportCtx, text);

  const link = document.createElement("a");
  link.download = "sticker_3000px.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
}
