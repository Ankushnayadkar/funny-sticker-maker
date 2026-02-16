const canvas = new fabric.Canvas('canvas');
const imageUpload = document.getElementById('imageUpload');
const textInput = document.getElementById('textInput');
const addTextBtn = document.getElementById('addText');
const downloadBtn = document.getElementById('download');

// Upload image
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (f) => {
        fabric.Image.fromURL(f.target.result, (img) => {
            canvas.add(img);
            canvas.centerObject(img);
            img.set({ selectable: true });
        });
    };
    reader.readAsDataURL(file);
});

// Add text
addTextBtn.addEventListener('click', () => {
    const text = new fabric.Text(textInput.value, {
        fontFamily: 'Fredoka One',
        fill: '#ff69b4',
        fontSize: 30,
        shadow: 'rgba(0,0,0,0.3) 2px 2px 4px'
    });
    canvas.add(text);
    canvas.centerObject(text);
    textInput.value = '';
});

// Download
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'funny-sticker.png';
    link.href = canvas.toDataURL();
    link.click();
});