import { useNotesStore } from "@/hooks/useNotesStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsView() {
  const { settings, updateSettings, notes, setPlan } = useNotesStore();
  
  const activeNotesCount = notes.filter(n => !n.isTrashed).length;
  const storageUsed = JSON.stringify(notes).length + JSON.stringify(settings).length;
  
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Editor</CardTitle>
          <CardDescription>Configure your writing experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Default Template</Label>
            <Select 
              value={settings.defaultTemplateId} 
              onValueChange={(val: any) => updateSettings({ defaultTemplateId: val })}
            >
              <SelectTrigger id="template">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-editor">Plate AI Editor (Recommended)</SelectItem>
                <SelectItem value="classic-editor">Classic Rich Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
             <div className="space-y-0.5">
                <Label>Autosave</Label>
                <div className="text-sm text-muted-foreground">Automatically save changes</div>
             </div>
             <Switch 
                checked={settings.autosaveEnabled} 
                onCheckedChange={(checked: boolean) => updateSettings({ autosaveEnabled: checked })} 
             />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account & Storage</CardTitle>
          <CardDescription>Manage your plan and data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Plan</div>
                <div className="font-medium capitalize">{settings.plan}</div>
                
                <div>Notes Used</div>
                <div className="font-medium">{activeNotesCount} / {settings.plan === 'free' ? '10' : '∞'}</div>

                <div>Storage Used (est.)</div>
                <div className="font-medium">{(storageUsed / 1024).toFixed(2)} KB</div>
            </div>

            <div className="pt-4">
                {settings.plan === 'free' ? (
                    <Button onClick={() => setPlan('premium')}>Simulate Upgrade to Premium</Button>
                ) : (
                    <Button variant="outline" onClick={() => setPlan('free')}>Downgrade to Free</Button>
                )}
            </div>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label>Theme</Label>
                <Select 
                    value={settings.theme} 
                    onValueChange={(val: any) => updateSettings({ theme: val })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}

