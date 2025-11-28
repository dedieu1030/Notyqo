import { NoteList } from "@/components/note-list";
import { useNotesStore } from "@/hooks/useNotesStore";

interface HomeViewProps {
  onOpenNote: (id: string) => void;
  searchQuery?: string;
}

export function HomeView({ onOpenNote, searchQuery = '' }: HomeViewProps) {
  const { notes } = useNotesStore();
  
  // Filter active notes
  let filteredNotes = notes.filter(n => !n.isTrashed);

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredNotes = filteredNotes.filter(n => {
        // Safely access content if it's a string or JSON
        // For now, just searching title. 
        // To search content, we'd need to serialize Plate content to string.
        // Let's search title for simplicity first, or JSON stringify content.
        const contentStr = JSON.stringify(n.content).toLowerCase();
        return n.title.toLowerCase().includes(query) || contentStr.includes(query);
    });
  }

  return (
    <NoteList 
      notes={filteredNotes} 
      onOpen={onOpenNote} 
      title={searchQuery ? "Search Results" : "All Notes"} 
      emptyMessage={searchQuery ? "No notes found matching your search." : "No notes yet. Create one!"}
    />
  );
}
