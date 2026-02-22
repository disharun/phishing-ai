// Content script that runs on web pages
// This can be used to highlight suspicious links or show warnings

(function () {
  "use strict";

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkCurrentURL") {
      // Check the current page URL
      const currentURL = window.location.href;
      
      // Send to background for processing
      chrome.runtime.sendMessage(
        {
          action: "checkURL",
          url: currentURL,
        },
        (response) => {
          if (response && response.success && response.data.is_phishing) {
            // Show warning banner if phishing detected
            showWarningBanner(response.data);
          }
        }
      );
    }
  });

  // Function to show warning banner on page
  function showWarningBanner(data) {
    // Remove existing banner if any
    const existingBanner = document.getElementById("phishguard-warning");
    if (existingBanner) {
      existingBanner.remove();
    }

    // Create warning banner
    const banner = document.createElement("div");
    banner.id = "phishguard-warning";
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
      padding: 12px 20px;
      z-index: 999999;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
    `;

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
        <span style="font-size: 20px;">⚠️</span>
        <div>
          <strong>Phishing Warning:</strong> This website has been flagged as potentially dangerous.
          <span style="margin-left: 10px; opacity: 0.9;">Confidence: ${data.confidence}%</span>
        </div>
      </div>
      <button id="phishguard-close" style="
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      ">Dismiss</button>
    `;

    document.body.insertBefore(banner, document.body.firstChild);

    // Add close functionality
    document.getElementById("phishguard-close").addEventListener("click", () => {
      banner.remove();
    });

    // Adjust body padding to account for banner
    document.body.style.paddingTop = "50px";
  }

  // Optional: Monitor link clicks and check URLs
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.href) {
      // You can add link checking here if needed
      // This is optional and might impact performance
    }
  });
})();
