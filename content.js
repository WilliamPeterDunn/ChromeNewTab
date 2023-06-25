// This script will be injected into all web pages

// Listen for text selection events
document.addEventListener("mouseup", handleSelection);

function handleSelection() {
  var selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    chrome.runtime.sendMessage({ text: selectedText });
  }
}
