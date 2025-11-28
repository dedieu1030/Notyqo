import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';
import '@/index.css';

const rootId = 'notyqo-root';

function init() {
  if (document.getElementById(rootId)) return;

  const host = document.createElement('div');
  host.id = rootId;
  host.style.position = 'fixed';
  host.style.top = '0';
  host.style.right = '0';
  host.style.zIndex = '2147483647'; // Max z-index
  host.style.pointerEvents = 'none'; // Let clicks pass through when closed
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
  // Reset some styles for the mount point
  mountPoint.style.all = 'initial';
  mountPoint.style.fontFamily = 'sans-serif';
  shadow.appendChild(mountPoint);

  const root = ReactDOM.createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      <Sidebar />
    </React.StrictMode>
  );
}

// init(); 
// We can init immediately or wait. 
// Usually content scripts run at document_end, so safe to init.
init();


