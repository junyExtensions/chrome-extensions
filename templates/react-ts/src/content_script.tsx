chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

const dom = document.createElement("div");
dom.id = "insight-marker-container";
dom.innerText = "xxxx";
document.body.appendChild(dom);

document.addEventListener("mouseup", (e) => {
  const selectedText = window.getSelection()?.toString();
  if (!selectedText) return;
  console.log("selectedText", selectedText);
});
