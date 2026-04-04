import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Home,
  Megaphone,
  ShoppingBag,
  Users,
  DollarSign,
  Briefcase,
  Images,
  Bell,
  Settings,
  LogOut,
  UserCog,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from './ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Trends',
    href: '/trends',
    icon: TrendingUp,
  },
  {
    title: 'Housing',
    href: '/housing',
    icon: Home,
  },
  {
    title: 'Announcements',
    href: '/announcements',
    icon: Megaphone,
  },
  {
    title: 'Marketing Services',
    href: '/marketing',
    icon: ShoppingBag,
  },
]

const managementItems = [
  {
    title: 'Executives',
    href: '/executives',
    icon: UserCog,
  },
  {
    title: 'Members',
    href: '/members',
    icon: Users,
  },
  {
    title: 'Contributions',
    href: '/contributions',
    icon: DollarSign,
  },
  {
    title: 'Internships',
    href: '/internships',
    icon: Briefcase,
  },
]

const mediaItems = [
  {
    title: 'Gallery',
    href: '/gallery',
    icon: Images,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            G
          </div>
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Gafra Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link to={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link to={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Media & Communications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mediaItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link to={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings">
              <Link to="/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
          <Avatar className="size-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">AD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">Super Admin</span>
          </div>

          <button className="ml-auto text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:hidden">
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}