// content.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "doSomething") {
    alert(message.selectionText);
    // Perform other actions as needed
  }
});