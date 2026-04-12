'use client'

import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { Bell, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useAuth } from '../../context/auth-context'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  breadcrumbs = [],
}: DashboardLayoutProps) {
  const { user } = useAuth()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const greetingName = user?.name ?? user?.name ?? 'Admin'

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-5">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 size-8 text-muted-foreground hover:text-foreground" />
            <Separator orientation="vertical" className="h-5 bg-border" />
            <Breadcrumb>
              <BreadcrumbList className="text-[13px]">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="contents">
                    <BreadcrumbSeparator className="text-muted-foreground/40" />
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink
                          href={crumb.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-foreground font-medium">
                          {crumb.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                placeholder="Search anything..."
                className="h-8 w-56 rounded-lg bg-secondary border-border pl-8 text-[13px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative size-8 rounded-lg bg-secondary border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            >
              <Bell className="size-3.75" />
              <Badge className="absolute -right-1 -top-1 size-4 rounded-full p-0 text-[9px] font-semibold bg-primary text-primary-foreground border-0">
                3
              </Badge>
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground leading-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>
            ) : (
              <p className="mt-1 text-[13px] text-muted-foreground">
                {today} · Welcome back, {greetingName}
              </p>
            )}
          </div>

          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
