// Background service worker for Notyqo
chrome.runtime.onInstalled.addListener(() => {
  console.log('Notyqo extension installed');
});

// Listener to open the main app page if needed from other contexts
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'index.html' });
});

