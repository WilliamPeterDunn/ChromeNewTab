chrome.runtime.onInstalled.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showAlert,
  });
});

function showAlert() {
  alert('Something happened');
}