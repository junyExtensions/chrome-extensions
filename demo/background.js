let color = "#3aa757";

// 插件加载后，向后台沙箱注入代码和变量
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});
