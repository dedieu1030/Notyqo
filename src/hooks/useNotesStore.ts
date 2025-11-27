import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Note, NotesStore, Settings, NoteContent } from '@/lib/types';
import { storageService } from '@/lib/storage';

const DEFAULT_SETTINGS: Settings = {
  defaultTemplateId: 'ai-editor',
  theme: 'system',
  plan: 'free',
  autosaveEnabled: true,
};

const FREE_PLAN_LIMIT = 10;

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: DEFAULT_SETTINGS,
  isLoading: true,
  error: null,

  loadFromStorage: async () => {
    set({ isLoading: true });
    try {
      const [notes, settings] = await Promise.all([
        storageService.getNotes(),
        storageService.getSettings(),
      ]);
      set({ 
        notes, 
        settings: settings || DEFAULT_SETTINGS, 
        isLoading: false 
      });
    } catch (err) {
      console.error('Failed to load data', err);
      set({ error: 'Failed to load data', isLoading: false });
    }
  },

  createNote: async (title: string, content?: NoteContent) => {
    const { notes, settings } = get();
    
    // Check Free Limit
    const activeNotesCount = notes.filter(n => !n.isTrashed).length;
    if (settings.plan === 'free' && activeNotesCount >= FREE_PLAN_LIMIT) {
      set({ error: 'Free limit reached. Upgrade to create more notes.' });
      return null;
    }

    const newNote: Note = {
      id: uuidv4(),
      title: title || 'Untitled',
      content: content || [{ type: 'p', children: [{ text: '' }] }], // Basic Plate Node
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      isTrashed: false,
      templateId: settings.defaultTemplateId,
    };

    const updatedNotes = [newNote, ...notes];
    set({ notes: updatedNotes, error: null });
    
    // Persist
    await storageService.saveNotes(updatedNotes);
    return newNote.id;
  },

  updateNote: async (id: string, updates: Partial<Note>) => {
    const { notes } = get();
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    );
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  deleteNote: async (id: string) => {
    const { notes } = get();
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, isTrashed: true, updatedAt: new Date().toISOString() }
        : note
    );
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  restoreNote: async (id: string) => {
     const { notes } = get();
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, isTrashed: false, updatedAt: new Date().toISOString() }
        : note
    );
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  permanentlyDeleteNote: async (id: string) => {
    const { notes } = get();
    const updatedNotes = notes.filter(note => note.id !== id);
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  toggleFavorite: async (id: string) => {
    const { notes } = get();
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, isFavorite: !note.isFavorite, updatedAt: new Date().toISOString() }
        : note
    );
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  emptyTrash: async () => {
    const { notes } = get();
    const updatedNotes = notes.filter(note => !note.isTrashed);
    
    set({ notes: updatedNotes });
    await storageService.saveNotes(updatedNotes);
  },

  updateSettings: async (updates: Partial<Settings>) => {
    const { settings } = get();
    const newSettings = { ...settings, ...updates };
    set({ settings: newSettings });
    await storageService.saveSettings(newSettings);
  },

  setPlan: async (plan: 'free' | 'premium') => {
      const { settings } = get();
      const newSettings = { ...settings, plan };
      set({ settings: newSettings });
      await storageService.saveSettings(newSettings);
  }
}));

