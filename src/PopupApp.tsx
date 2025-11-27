import { useEffect, useState } from 'react';
import { useNotesStore } from '@/hooks/useNotesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink, Save } from 'lucide-react';

export default function PopupApp() {
  const { createNote, loadFromStorage, error } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    
    // Convert plain text to Plate structure
    const plateContent = content.split('\n').map(line => ({
        type: 'p',
        children: [{ text: line }]
    }));

    await createNote(title || 'Quick Note', plateContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setTitle('');
    setContent('');
  };

  const handleOpenFullApp = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: 'index.html' });
    } else {
      window.open('index.html', '_blank');
    }
  };

  return (
    <div className="w-[350px] p-4 bg-background text-foreground border rounded-lg">
      <header className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">Quick Note</h1>
        <Button variant="ghost" size="sm" onClick={handleOpenFullApp} title="Open Full App">
            <ExternalLink className="h-4 w-4" />
        </Button>
      </header>

      <div className="space-y-4">
        <Input 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea 
            placeholder="Write something..." 
            className="min-h-[150px] resize-none" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <Button className="w-full" onClick={handleSave} disabled={saved}>
            {saved ? 'Saved!' : <><Save className="mr-2 h-4 w-4" /> Save to Notyqo</>}
        </Button>
      </div>
    </div>
  );
}

