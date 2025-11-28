import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Star } from 'lucide-react';
import { MinimalEditor } from '@/components/editor/minimal-editor';
import { useNotesStore } from '@/hooks/useNotesStore';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { createNote, notes } = useNotesStore();
  // Quick Note usually implies working on a single scratchpad or creating new ones?
  // "Quick Note Sidebar... Sauvegarde automatique... Bouton Open in Full App"
  // Let's assume it acts like a scratchpad. We can store a "Quick Note" ID in storage or just always create a new one?
  // "Open in full app" -> opens the app and selects this note.
  // So we need to track the current note being edited.
  
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (request: any, sender: any, sendResponse: any) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        setIsOpen(prev => !prev);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  // Initialize a note if needed when opening
  useEffect(() => {
    if (isOpen && !currentNoteId) {
        // Logic to find recent quick note or create new
        // For now, create a new one if none
        const initNote = async () => {
            const id = await createNote('Quick Note');
            if (id) setCurrentNoteId(id);
        };
        initNote();
    }
  }, [isOpen]);

  const handleOpenFullApp = () => {
     if (currentNoteId) {
         // Save ID to local storage so App can pick it up? 
         // Or just open app. The App opens default view.
         // Maybe pass query param? index.html?noteId=...
         window.open(chrome.runtime.getURL(`index.html?noteId=${currentNoteId}`), '_blank');
     } else {
         window.open(chrome.runtime.getURL('index.html'), '_blank');
     }
  };

  return (
    <div className={cn(
        "fixed top-0 right-0 h-full w-[400px] bg-background border-l shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col",
        isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
    )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
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
            {currentNoteId && (
                <MinimalEditor noteId={currentNoteId} />
            )}
        </div>
    </div>
  );
}


