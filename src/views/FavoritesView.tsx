import { NoteList } from "@/components/note-list";
import { useNotesStore } from "@/hooks/useNotesStore";

interface FavoritesViewProps {
  onOpenNote: (id: string) => void;
}

export function FavoritesView({ onOpenNote }: FavoritesViewProps) {
  const { notes } = useNotesStore();
  const favoriteNotes = notes.filter(n => n.isFavorite && !n.isTrashed);

  return (
    <NoteList 
      notes={favoriteNotes} 
      onOpen={onOpenNote} 
      title="Favorites" 
      emptyMessage="No favorites yet."
    />
  );
}

