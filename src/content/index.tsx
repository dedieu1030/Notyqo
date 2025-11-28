import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';
import '@/index.css';

const rootId = 'notyqo-root';

function init() {
  // Prevent multiple injections
  if (document.getElementById(rootId)) {
    console.log('Notyqo content script already initialized');
    return;
  }

  console.log('Initializing Notyqo content script');

  const host = document.createElement('div');
  host.id = rootId;
  host.style.position = 'fixed';
  host.style.top = '0';
  host.style.right = '0';
  host.style.height = '100vh'; // Occupy full height for click-through logic
  host.style.width = '0'; // Start width 0
  host.style.zIndex = '2147483647'; // Max z-index
  host.style.pointerEvents = 'none'; // Let clicks pass through container
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content-script.css');
  shadow.appendChild(link);

  // Create a mounting point for React
  const mountPoint = document.createElement('div');
  mountPoint.id = 'mount-point';
  // Reset some styles for the mount point to ensure isolation
  mountPoint.style.all = 'initial';
  mountPoint.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  mountPoint.style.display = 'block';
  mountPoint.style.height = '100%';
  shadow.appendChild(mountPoint);

  const root = ReactDOM.createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      <Sidebar />
    </React.StrictMode>
  );

  // Notify that the script is ready
  chrome.runtime.sendMessage({ action: 'CONTENT_SCRIPT_READY' }).catch(() => {});
}

// Ensure it runs even if document is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
