// 获取在 options.html 预留的 DOM
let page = document.getElementById("buttonDiv");
// 样式类名：让选中的按钮带一个阴影
let selectedClassName = "current";
// 预设按钮颜色
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// 每种按钮代表一个颜色，点击后让 chrome.storage 预设颜色
// 之后在 popup 里可以点击获取
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  // 从前一个选择的颜色中删除样式
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // 将标记 .current 样式类添加到标记的按钮上
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// 创建代表 4 个颜色的按钮，并添加事件监听
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    // 对于提供的每个颜色……
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      // …创建一个具有该颜色的按钮……
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      // …标记当前选中的颜色……
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      // …并为点击该按钮注册监听器
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
// 初始化页面，通过构造颜色选项来初始化
constructOptions(presetButtonColors);
