import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Star, Trash, FileText, Copy, ExternalLink } from "lucide-react";
import type { Note } from "@/lib/types";
import { useNotesStore } from "@/hooks/useNotesStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteListProps {
  notes: Note[];
  onOpen: (noteId: string) => void;
  title: string;
  emptyMessage?: string;
}

export function NoteList({ notes, onOpen, title, emptyMessage = "No notes found." }: NoteListProps) {
  const { toggleFavorite, deleteNote, permanentlyDeleteNote, restoreNote, createNote } = useNotesStore();
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleDuplicate = async (note: Note) => {
    await createNote(`${note.title} (Copy)`, note.content);
  };

  const confirmDelete = (noteId: string) => {
    setNoteToDelete(noteId);
  };

  const handlePermanentlyDelete = async () => {
    if (noteToDelete) {
      await permanentlyDeleteNote(noteToDelete);
      setNoteToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {notes.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">{emptyMessage}</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onOpen(note.id)}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium line-clamp-1">
                    {note.title || "Untitled"}
                  </CardTitle>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {note.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onOpen(note.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleFavorite(note.id)}>
                              <Star className={`mr-2 h-4 w-4 ${note.isFavorite ? "fill-yellow-400" : ""}`} />
                              {note.isFavorite ? "Unfavorite" : "Favorite"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(note)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {note.isTrashed ? (
                              <>
                               <DropdownMenuItem onClick={() => restoreNote(note.id)}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Restore
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => confirmDelete(note.id)} className="text-destructive focus:text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete Permanently
                              </DropdownMenuItem>
                              </>
                          ) : (
                               <DropdownMenuItem onClick={() => deleteNote(note.id)} className="text-destructive focus:text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Move to Trash
                              </DropdownMenuItem>
                          )}
                         
                      </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-xs">
                      {/* Simple text extraction approximation */}
                      {JSON.stringify(note.content).slice(0, 100).replace(/[{}"\[\]]/g, '')}...
                  </CardDescription>
                  <div className="mt-4 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!noteToDelete} onOpenChange={(open) => !open && setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this note from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePermanentlyDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
