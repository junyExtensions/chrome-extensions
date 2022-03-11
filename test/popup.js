let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
// 当点击按钮时，将setPageBackgroundColor注入当前页面
changeColor.addEventListener("click", async () => {
  // 获取当前 window 窗口和激活状态的 tab 页
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 想目标 tag 注入方法 setPageBackgroundColor
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
// 该方法将作为内容脚本注入当前页面
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}