import { useState, useEffect } from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import type { Value } from 'platejs';
import { useNotesStore } from '@/hooks/useNotesStore';
import { minimalPlugins } from './minimal-plugins';
import { Editor } from '@/components/ui/editor';

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

  // Debounced save logic
  useEffect(() => {
      // In a real app, we'd use a proper debounce hook on the value change.
      // Plate handles state internally in the editor instance.
      // We just need to sync back to store.
  }, []);

  if (!note) return <div className="p-4 text-muted-foreground">Loading note...</div>;

  return (
      <Plate 
        editor={editor}
        onChange={({ value }) => {
           // Simple debounce/save
           // This is too frequent, but for now it works to prove connection.
           // Ideally useDebounce or similar.
           updateNote(noteId, { content: value });
        }}
      >
        <Editor 
            placeholder="Type your quick note..." 
            className="min-h-[300px] p-4 focus:outline-none" 
            variant="none"
        />
      </Plate>
  )
}

