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
    id: noteId, // Ensure a new editor instance per note ID
    plugins: minimalPlugins,
    value: initialValue,
  });

  // Sync editor value when noteId changes
  useEffect(() => {
    // When noteId changes, we need to ensure the editor state reflects the new note.
    // With the `id` prop in usePlateEditor, Plate handles the instance switch.
    // No manual reset needed here for uncontrolled mode when keying by noteId.
  }, [noteId]);

  if (!note) return <div className="p-4 text-muted-foreground">Loading note...</div>;

  return (
      <Plate 
        editor={editor} // Removed key={noteId} as usePlateEditor({ id }) handles it and is safer against crashes
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
