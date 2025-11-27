import { useEffect, useState } from "react";
import { useNotesStore } from "@/hooks/useNotesStore";
import { PlateEditor } from "@/components/editor/plate-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Value } from "platejs";

interface EditorViewProps {
  noteId: string;
  onBack: () => void;
}

export function EditorView({ noteId, onBack }: EditorViewProps) {
  const { notes, updateNote } = useNotesStore();
  const note = notes.find(n => n.id === noteId);

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState<Value>(note?.content as Value || []);

  // Sync local state if note changes externally (e.g. duplicate)
  useEffect(() => {
    if (note) {
       setTitle(note.title);
       if (note.content) setContent(note.content as Value);
    }
  }, [note?.id]);

  // Debounced save
  useEffect(() => {
    if (!note) return;

    const handler = setTimeout(() => {
      updateNote(note.id, { title, content });
    }, 1000);

    return () => clearTimeout(handler);
  }, [title, content, note?.id]);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="text-lg font-bold border-none shadow-none focus-visible:ring-0 px-0"
          placeholder="Note Title"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
         <PlateEditor 
            initialContent={content} 
            onChange={(val) => setContent(val)} 
         />
      </div>
    </div>
  );
}

