import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';
import { MinimalEditor } from '@/components/editor/minimal-editor';
import { useNotesStore } from '@/hooks/useNotesStore';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { createNote } = useNotesStore();
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (request: any, sender: any, sendResponse: any) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        setIsOpen(prev => !prev);
        // Send response to keep message channel open/confirm receipt if needed
        if (sendResponse) sendResponse({ status: 'ok' });
      }
    };
    
    // Use a more robust listener attachment
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.onMessage.addListener(handleMessage);
    }
    
    return () => {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.onMessage.removeListener(handleMessage);
        }
    };
  }, []);

  // Initialize a note if needed when opening
  useEffect(() => {
    if (isOpen && !currentNoteId) {
        const initNote = async () => {
            const id = await createNote('Quick Note');
            if (id) setCurrentNoteId(id);
        };
        initNote();
    }
  }, [isOpen]);

  const handleOpenFullApp = () => {
     if (currentNoteId) {
         window.open(chrome.runtime.getURL(`index.html?noteId=${currentNoteId}`), '_blank');
     } else {
         window.open(chrome.runtime.getURL('index.html'), '_blank');
     }
  };

  // Don't render anything if not open (to save resources) or handle visibility via CSS?
  // Using CSS translate is better for animation.
  
  return (
    <div className={cn(
        "fixed top-0 right-0 h-full w-[400px] bg-background border-l shadow-2xl transition-transform duration-300 ease-in-out z-[9999] flex flex-col font-sans text-foreground",
        isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
    )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h2 className="font-semibold text-lg">Quick Note</h2>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleOpenFullApp} title="Open in Full App">
                    <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-background">
            {currentNoteId ? (
                <MinimalEditor noteId={currentNoteId} />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Loading...
                </div>
            )}
        </div>
    </div>
  );
}
