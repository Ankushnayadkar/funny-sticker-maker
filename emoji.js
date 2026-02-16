const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const textInput = document.getElementById("textInput");

emojiPanel.style.display = "none";
emojiPanel.style.background = "#222";
emojiPanel.style.padding = "8px";
emojiPanel.style.borderRadius = "10px";
emojiPanel.style.maxHeight = "150px";
emojiPanel.style.overflowY = "auto";
emojiPanel.style.fontSize = "22px";

const emojis = "😀😁😂🤣😃😄😅😆😉😊😍😘😎🤩🥳😜🤪🤯😡😱😴🤤🤓😇😈👻💀❤️🧡💛💚💙💜🖤🤍🔥✨⚡💥⭐🌟🎉🚀☕🍕🍔🍟🍩⚽🎮📱💻";

emojis.split("").forEach(e => {
  const span = document.createElement("span");
  span.textContent = e;
  span.style.cursor = "pointer";
  span.style.padding = "6px";
  span.onclick = () => textInput.value += e;
  emojiPanel.appendChild(span);
});

emojiBtn.onclick = () => {
  emojiPanel.style.display =
    emojiPanel.style.display === "block" ? "none" : "block";
};
