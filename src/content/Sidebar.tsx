import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { MinimalEditor } from '@/components/editor/minimal-editor';
import { useNotesStore } from '@/hooks/useNotesStore';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Sidebar() {
  const { createNote, notes, error } = useNotesStore();
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  // Initialize a note if needed when opening (or finding latest active one)
  useEffect(() => {
    // Find the most recent non-trashed note or create one
    const activeNotes = notes.filter(n => !n.isTrashed).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    // Only set default note if we don't have one or the current one is deleted
    // OR if the list changed and we want to ensure we show something valid.
    // But be careful not to override if we just created one?
    // Actually, if we create one, it becomes the first in activeNotes.
    // So this logic is generally safe for single-user synchronous flows.
    if (activeNotes.length > 0) {
        // Only switch if currentNoteId is not in the list (e.g. was trash) or null
        // OR always switch to top? The "New" button relies on this auto-switch or manual set.
        // If we just created a note, it's at [0].
        // If we just opened the sidebar, we want [0].
        // If we are editing [1] and a background sync happens? Unlikely in this local-first.
        // Let's keep it simple: always sync to top note if current is invalid or we just loaded.
        
        // Optimization: Check if currentNoteId is still valid
        const isCurrentValid = currentNoteId && activeNotes.find(n => n.id === currentNoteId);
        
        if (!isCurrentValid) {
             setCurrentNoteId(activeNotes[0].id);
        }
    } else {
        const initNote = async () => {
            const id = await createNote('Quick Note');
            if (id) setCurrentNoteId(id);
        };
        // Only init if we really have no notes and aren't loading?
        // notes is [] initially.
        initNote();
    }
  }, [notes.length, createNote]); // Removed currentNoteId from dependency to avoid loops

  const handleOpenFullApp = () => {
     if (currentNoteId) {
         chrome.tabs.create({ url: `index.html?noteId=${currentNoteId}` });
     } else {
         chrome.tabs.create({ url: 'index.html' });
     }
  };

  const handleNewNote = async () => {
      // Create note and explicitly set it
      const id = await createNote('Quick Note');
      if (id) {
          setCurrentNoteId(id);
      } else {
          // If creation failed (limit reached), it might not change.
          // Error is in store.
          if (error) {
              alert(error); // Simple alert for now since we are in sidebar
          }
      }
  };

  return (
    <TooltipProvider>
        <div className="h-screen w-full flex flex-col bg-background text-foreground">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-background shrink-0 z-10">
                <h2 className="font-semibold text-base">Quick Notes</h2>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={handleNewNote} title="New Note">
                        + New
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleOpenFullApp} title="Open in Full App">
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-3 pb-3">
                {currentNoteId ? (
                    <MinimalEditor noteId={currentNoteId} />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        {error ? <span className="text-destructive">{error}</span> : "Loading..."}
                    </div>
                )}
            </div>
        </div>
    </TooltipProvider>
  );
}
