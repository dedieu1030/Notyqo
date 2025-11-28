import { Button } from '@/components/ui/button';
import { ExternalLink, PanelRight } from 'lucide-react';

export default function PopupApp() {

  const handleOpenFullApp = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: 'index.html' });
    } else {
      window.open('index.html', '_blank');
    }
  };

  const handleToggleSidebar = async () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            // Check if we can inject script or if it's already there
            // Actually content script is auto-injected in manifest.
            // Just send message.
            try {
                await chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_SIDEBAR' });
                window.close(); 
            } catch (e) {
                console.error("Failed to send message", e);
                // Fallback: maybe script isn't loaded?
                // alert("Please refresh the page to use the sidebar.");
            }
        }
    }
  };

  return (
    <div className="w-[250px] p-4 bg-background text-foreground">
        <div className="flex flex-col gap-4">
            <Button className="w-full justify-start" onClick={handleToggleSidebar}>
                <PanelRight className="mr-2 h-4 w-4" /> Quick Note Sidebar
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={handleOpenFullApp}>
                <ExternalLink className="mr-2 h-4 w-4" /> Open Full App
            </Button>
        </div>
    </div>
  );
}
