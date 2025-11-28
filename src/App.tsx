import { useEffect, useState } from 'react'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, type View } from "@/components/app-sidebar"
import { HomeView } from "@/views/HomeView"
import { FavoritesView } from "@/views/FavoritesView"
import { TrashView } from "@/views/TrashView"
import { SettingsView } from "@/views/SettingsView"
import { UpgradeView } from "@/views/UpgradeView"
import { EditorView } from "@/views/EditorView"
import { useNotesStore } from "@/hooks/useNotesStore"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function App() {
  const { loadFromStorage, createNote, settings } = useNotesStore();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFromStorage();
    
    // Check for noteId in query params (from Sidebar/Quick Note)
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get('noteId');
    if (noteId) {
        setSelectedNoteId(noteId);
    }
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
      <AppSidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onNewNote={handleCreateNote}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <SidebarInset>
        {/* Header logic: Show header always but customize content/style */}
        <header className={`flex h-14 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ${selectedNoteId ? '' : 'border-b'}`}>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {selectedNoteId ? (
                 <Button variant="ghost" size="sm" onClick={() => setSelectedNoteId(null)} className="h-auto p-0 hover:bg-transparent font-medium">
                    ← Back
                 </Button>
            ) : (
                 <span className="capitalize font-bold">{currentView}</span>
            )}
          </div>
        </header>
        
        <div className={`flex flex-1 flex-col ${selectedNoteId ? 'p-0' : 'p-4 pt-0'} h-[calc(100vh-3.5rem)] overflow-hidden`}>
           {selectedNoteId ? (
              <EditorView noteId={selectedNoteId} onBack={() => setSelectedNoteId(null)} />
            ) : (
              <div className="h-full overflow-auto">
                {currentView === 'home' && <HomeView onOpenNote={handleOpenNote} searchQuery={searchQuery} />}
                {currentView === 'favorites' && <FavoritesView onOpenNote={handleOpenNote} />}
                {currentView === 'trash' && <TrashView />}
                {currentView === 'settings' && <SettingsView />}
                {currentView === 'upgrade' && <UpgradeView />}
              </div>
            )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
