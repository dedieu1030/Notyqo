import { useEffect, useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar, type View } from "@/components/app-sidebar"
import { HomeView } from "@/views/HomeView"
import { FavoritesView } from "@/views/FavoritesView"
import { TrashView } from "@/views/TrashView"
import { SettingsView } from "@/views/SettingsView"
import { UpgradeView } from "@/views/UpgradeView"
import { EditorView } from "@/views/EditorView"
import { useNotesStore } from "@/hooks/useNotesStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function App() {
  const { loadFromStorage, createNote, settings } = useNotesStore();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    loadFromStorage();
  }, []);

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (settings.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(settings.theme);
  }, [settings.theme]);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSelectedNoteId(null);
  };

  const handleOpenNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleCreateNote = async () => {
    const id = await createNote('Untitled Note');
    if (id) {
      setSelectedNoteId(id);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar currentView={currentView} onNavigate={handleNavigate} />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="flex items-center gap-2 border-b p-3">
            <SidebarTrigger />
            {selectedNoteId ? (
               <span className="text-sm font-medium text-muted-foreground">Edit Note</span>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <span className="capitalize font-bold">{currentView}</span>
                    {currentView === 'home' && (
                        <Button size="sm" onClick={handleCreateNote}>
                            <Plus className="mr-2 h-4 w-4" /> New Note
                        </Button>
                    )}
                </div>
            )}
          </header>

          <div className="flex-1 overflow-auto">
            {selectedNoteId ? (
              <EditorView noteId={selectedNoteId} onBack={() => setSelectedNoteId(null)} />
            ) : (
              <>
                {currentView === 'home' && <HomeView onOpenNote={handleOpenNote} />}
                {currentView === 'favorites' && <FavoritesView onOpenNote={handleOpenNote} />}
                {currentView === 'trash' && <TrashView />}
                {currentView === 'settings' && <SettingsView />}
                {currentView === 'upgrade' && <UpgradeView />}
              </>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
