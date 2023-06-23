chrome.runtime.onInstalled.addListener(function() {
  // Create a context menu item
  chrome.contextMenus.create({
    id: "copyQuote",
    title: "Copy quote",
    contexts: ["selection"]
  });
});

// Perform the operation when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId === "copyQuote") {
    var highlightedText = info.selectionText;
    alert("Highlighted Text: " + highlightedText);
  }
});
