// Background service worker for the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("PhishGuard AI Extension installed");
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkURL") {
    // Forward URL check to backend API
    fetch("http://localhost:8000/api/phishing/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: request.url }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keep the message channel open for async response
  }
});

// Monitor tab updates to check URLs automatically
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Optional: Auto-check URLs when user navigates
    // Uncomment if you want automatic checking
    // chrome.tabs.sendMessage(tabId, {
    //   action: "checkCurrentURL",
    //   url: tab.url,
    // });
  }
});
