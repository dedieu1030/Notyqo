export interface NoteContent {
  // PlateJS content structure (usually an array of nodes)
  [key: string]: any;
}

export type EditorTemplateId = 'ai-editor' | 'classic-editor';

export interface Note {
  id: string;
  title: string;
  content: NoteContent;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  isFavorite: boolean;
  isTrashed: boolean;
  templateId: EditorTemplateId;
  tags?: string[];
}

export interface Settings {
  defaultTemplateId: EditorTemplateId;
  theme: 'light' | 'dark' | 'system';
  plan: 'free' | 'premium';
  autosaveEnabled: boolean;
}

export interface NotesStore {
  notes: Note[];
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadFromStorage: () => Promise<void>;
  createNote: (title: string, content?: NoteContent) => Promise<string | null>; // returns id
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>; // moves to trash
  restoreNote: (id: string) => Promise<void>;
  permanentlyDeleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  emptyTrash: () => Promise<void>;
  
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  setPlan: (plan: 'free' | 'premium') => Promise<void>;
}

