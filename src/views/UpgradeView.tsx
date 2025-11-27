import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNotesStore } from "@/hooks/useNotesStore";

export function UpgradeView() {
  const { setPlan } = useNotesStore();

  return (
    <div className="p-10 flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upgrade to Notyqo Premium</h2>
        <p className="text-muted-foreground">Unlock limitless potential for your ideas.</p>
      </div>

      <Card className="w-full max-w-md border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Premium Plan</CardTitle>
          <CardDescription>Everything you need to organize your life.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Notes</span>
            </div>
            <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Cloud Sync (Coming Soon)</span>
            </div>
            <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Advanced AI Features</span>
            </div>
             <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority Support</span>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" size="lg" onClick={() => setPlan('premium')}>
                Get Premium - $4.99/mo
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

