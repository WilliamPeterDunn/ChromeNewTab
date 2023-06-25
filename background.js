chrome.runtime.onInstalled.addListener(function() {
  // Create a context menu item
  chrome.contextMenus.create({
    id: "copyQuote",
    title: "Copy quote",
    contexts: ["selection"]
  });
});

chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({ url: "homepage.html" });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text) {
    var highlightedText = message.text;
    console.log("Highlighted Text: " + highlightedText);
  }
});
