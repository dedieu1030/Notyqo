import { NoteList } from "@/components/note-list";
import { useNotesStore } from "@/hooks/useNotesStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function TrashView() {
  const { notes, emptyTrash } = useNotesStore();
  const trashedNotes = notes.filter(n => n.isTrashed);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 pb-0">
        <div></div>
        {trashedNotes.length > 0 && (
            <Button variant="destructive" size="sm" onClick={emptyTrash}>
                <Trash2 className="mr-2 h-4 w-4" />
                Empty Trash
            </Button>
        )}
      </div>
      <NoteList 
        notes={trashedNotes} 
        onOpen={() => {}} // Can't open trashed notes directly, must restore first? Or view read-only?
        title="Trash" 
        emptyMessage="Trash is empty."
      />
    </div>
  );
}

