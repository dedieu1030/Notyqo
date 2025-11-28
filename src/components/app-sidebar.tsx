import { Home, Star, Trash2, Settings, Edit, Search } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type View = 'home' | 'favorites' | 'trash' | 'settings' | 'upgrade';

interface AppSidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onNewNote: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Menu items.
const items = [
  {
    title: "Notes",
    view: "home" as View,
    icon: Home,
  },
  {
    title: "Favorites",
    view: "favorites" as View,
    icon: Star,
  },
  {
    title: "Trash",
    view: "trash" as View,
    icon: Trash2,
  },
  {
    title: "Settings",
    view: "settings" as View,
    icon: Settings,
  },
]

export function AppSidebar({ currentView, onNavigate, onNewNote, searchQuery, onSearchChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="gap-4 p-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 px-1">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-lg">N</span>
            </div>
            <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-bold text-lg">Notyqo</span>
            </div>
        </div>

        {/* CTA: New Note */}
        <Button className="w-full justify-start font-semibold" onClick={onNewNote}>
            <Edit className="mr-2 h-4 w-4" /> New Note
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                  >
                    <button className="w-full flex items-center gap-2 font-medium">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
