// Background service worker for Notyqo

// Configure the side panel behavior to open on action click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log('Notyqo extension installed');
});
