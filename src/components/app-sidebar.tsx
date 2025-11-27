import { Home, Star, Trash2, Settings, Sparkles, HelpCircle, Info } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export type View = 'home' | 'favorites' | 'trash' | 'settings' | 'upgrade';

interface AppSidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

// Menu items.
const items = [
  {
    title: "Home",
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
  {
    title: "Upgrade",
    view: "upgrade" as View,
    icon: Sparkles,
  },
]

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-bold tracking-tight">Notyqo</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                  >
                    <button className="w-full flex items-center gap-2">
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2 text-xs text-muted-foreground">
                    <HelpCircle className="h-3 w-3" />
                    <span>Help</span>
                </a>
             </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <div className="px-2 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  <span>v1.0.0</span>
              </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
