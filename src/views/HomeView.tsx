import { NoteList } from "@/components/note-list";
import { useNotesStore } from "@/hooks/useNotesStore";

interface HomeViewProps {
  onOpenNote: (id: string) => void;
}

export function HomeView({ onOpenNote }: HomeViewProps) {
  const { notes } = useNotesStore();
  const activeNotes = notes.filter(n => !n.isTrashed);

  return (
    <NoteList 
      notes={activeNotes} 
      onOpen={onOpenNote} 
      title="All Notes" 
      emptyMessage="No notes yet. Create one!"
    />
  );
}

