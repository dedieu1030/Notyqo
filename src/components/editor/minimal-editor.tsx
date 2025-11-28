import { useState, useEffect } from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import type { Value } from 'platejs';
import { useNotesStore } from '@/hooks/useNotesStore';
import { minimalPlugins } from './minimal-plugins';
import { Editor } from '@/components/ui/editor';
import { FloatingToolbar } from '@/components/ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/ui/floating-toolbar-buttons';
import { LinkFloatingToolbar } from '@/components/ui/link-toolbar';

export function MinimalEditor({ noteId }: { noteId: string }) {
  const { notes, updateNote } = useNotesStore();
  const note = notes.find(n => n.id === noteId);
  
  // Use a local state for the editor value to avoid resetting on every keystroke from store
  // but we need to initialize it.
  const initialValue = (note?.content as Value) || [{ type: 'p', children: [{ text: '' }] }];
  
  const editor = usePlateEditor({
    plugins: minimalPlugins,
    value: initialValue,
  });

  // Sync editor value when noteId changes
  useEffect(() => {
    // Resetting editor value when switching notes is complex with uncontrolled Plate.
    // usePlateEditor handles initial value, but if we switch noteId, we might want to reset.
    // However, Plate instances are usually expensive to recreate.
    // Since we are rendering this in a Sidebar, it persists.
    // If noteId changes, we should probably update the editor content.
    // But Plate's `value` prop is initial-only usually unless controlled?
    // Plate 5+ handles controlled mode better but here we use `onChange` for updates.
    // Let's assume for "Quick Note" sidebar we might stick to one note or simple switches.
    // If we need to switch, we can key the component or use editor.reset().
  }, [noteId]);

  if (!note) return <div className="p-4 text-muted-foreground">Loading note...</div>;

  return (
      <Plate 
        key={noteId} // Re-mount on note switch to ensure fresh state
        editor={editor}
        onChange={({ value }) => {
           updateNote(noteId, { content: value });
        }}
      >
        <Editor 
            placeholder="Type your quick note..." 
            className="min-h-[300px] py-2 focus:outline-none text-base [&>:first-child]:mt-0" 
            variant="none"
        />
        
        <FloatingToolbar>
            <FloatingToolbarButtons />
        </FloatingToolbar>
        <LinkFloatingToolbar />
      </Plate>
  )
}
