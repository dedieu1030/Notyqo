import type { Note, Settings } from './types';

const STORAGE_KEYS = {
  NOTES: 'notyqo_notes',
  SETTINGS: 'notyqo_settings',
};

const isExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;

// Mock storage for dev environment
const storageMock = {
  get: (keys: string[] | string | null, callback: (result: any) => void) => {
    const result: any = {};
    const keysToGet = Array.isArray(keys) ? keys : keys ? [keys] : Object.keys(localStorage);
    keysToGet.forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          result[key] = JSON.parse(item);
        } catch (e) {
          result[key] = item;
        }
      }
    });
    callback(result);
  },
  set: (items: any, callback?: () => void) => {
    Object.keys(items).forEach(key => {
      localStorage.setItem(key, JSON.stringify(items[key]));
    });
    if (callback) callback();
  },
  remove: (keys: string | string[], callback?: () => void) => {
      const keysToRemove = Array.isArray(keys) ? keys : [keys];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      if (callback) callback();
  }
};

const storage = isExtension ? chrome.storage.sync : storageMock;

export const storageService = {
  getNotes: (): Promise<Note[]> => {
    return new Promise((resolve, reject) => {
      try {
        storage.get([STORAGE_KEYS.NOTES], (result: any) => {
          if (chrome.runtime?.lastError) {
            console.warn('Storage error:', chrome.runtime.lastError);
            resolve([]); // Fallback to empty
            return;
          }
          resolve(result[STORAGE_KEYS.NOTES] || []);
        });
      } catch (e) {
        console.warn('Storage get exception:', e);
        resolve([]);
      }
    });
  },

  saveNotes: (notes: Note[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        storage.set({ [STORAGE_KEYS.NOTES]: notes }, () => {
          if (chrome.runtime?.lastError) {
            console.warn('Storage save error:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  getSettings: (): Promise<Settings | null> => {
    return new Promise((resolve) => {
      storage.get([STORAGE_KEYS.SETTINGS], (result: any) => {
        resolve(result[STORAGE_KEYS.SETTINGS] || null);
      });
    });
  },

  saveSettings: (settings: Settings): Promise<void> => {
    return new Promise((resolve, reject) => {
      storage.set({ [STORAGE_KEYS.SETTINGS]: settings }, () => {
        if (chrome.runtime?.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve();
        }
      });
    });
  }
};

