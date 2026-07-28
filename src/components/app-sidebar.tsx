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
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/auth-context'
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
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Housing', href: '/housing', icon: Home },
    { title: 'Housing Requests', href: '/housing/requests', icon: TrendingUp },
  { title: 'Announcements', href: '/announcements', icon: Megaphone },
  { title: 'Marketing Services', href: '/marketing', icon: ShoppingBag },
]

const managementItems = [
  { title: 'Members', href: '/members', icon: Users },
  { title: 'Contributions', href: '/contributions', icon: DollarSign },
  { title: 'Internships', href: '/internships', icon: Briefcase },
    { title: 'Pickup', href: '/pickup', icon: ShoppingBag },
]

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const { user, signOut } = useAuth()

  const userInitials = (user?.name ?? 'Admin User')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="shrink-0 border-b border-sidebar-border px-4 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-semibold text-sm text-primary-foreground">
            G
          </div>
          <span className="text-[15px] font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Ghafra Admin
          </span>
        </Link>
      </SidebarHeader>

      {/* Scrollable content — no visible scrollbar */}
      <SidebarContent
        className="flex flex-col gap-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Main Menu */}
        <SidebarGroup className="shrink-0 px-3 py-3">
          <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/30">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-9 rounded-lg px-2.5 text-[13.5px] font-normal text-sidebar-foreground/60 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                  >
                    <Link to={item.href}>
                      <item.icon className="size-3.75 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-3 my-0 shrink-0 bg-sidebar-border" />

        {/* Management */}
        <SidebarGroup className="shrink-0 px-3 py-3">
          <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/30">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-9 rounded-lg px-2.5 text-[13.5px] font-normal text-sidebar-foreground/60 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                  >
                    <Link to={item.href}>
                      <item.icon className="size-3.75 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>



        {/* Spacer pushes footer anchor to bottom on tall screens */}
        <div className="flex-1" />
      </SidebarContent>

      {/* Footer — user row only */}
      <SidebarFooter className="shrink-0 border-t border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center cursor-pointer">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={user?.picture} alt={user?.name ?? 'Admin User'} />
            <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-[13px] font-medium text-sidebar-foreground leading-tight">
              {user?.name ?? 'Admin User'}
            </span>
            <span className="text-[11px] text-sidebar-foreground/40 leading-tight mt-0.5">
              {user?.email ?? 'No email'}
            </span>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="ml-auto text-sidebar-foreground/30 hover:text-sidebar-foreground/70 transition-colors group-data-[collapsible=icon]:hidden"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="size-3.75" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
