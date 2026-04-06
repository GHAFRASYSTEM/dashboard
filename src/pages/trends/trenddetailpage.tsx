'use client'

import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit2,
  ExternalLink,
  Eye,
  FolderOpen,
  Trash2,
  User2,
  Link2,
  FileText,
  Images,
} from 'lucide-react'

import { DashboardLayout } from '../../components/dashboard-layout'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { cn } from '../../lib/utils'

interface TrendLink {
  label?: string
  url: string
}

interface Trend {
  id: string
  title: string
  content: string
  summary: string
  author: string
  category: string
  status: 'published' | 'draft' | 'pending'
  views: number
  createdAt: Date
  images: string[]
  links: TrendLink[]
}

const statusStyles: Record<Trend['status'], string> = {
  published: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  draft: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}

export default function TrendDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const trend = location.state?.trend as Trend | undefined
  const [activeImg, setActiveImg] = useState(0)

  if (!trend) {
    return (
      <DashboardLayout
        title="Trend Not Found"
        breadcrumbs={[
          { label: 'Trends', href: '/trends' },
          { label: 'Not Found' },
        ]}
      >
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card text-center">
          <p className="text-base font-medium text-foreground">Trend could not be loaded</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This can happen if the page was refreshed or opened directly. Trend ID: {id}
          </p>
          <Button
            onClick={() => navigate('/trends')}
            variant="outline"
            className="mt-5 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Trends
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Trend Details"
      breadcrumbs={[
        { label: 'Trends', href: '/trends' },
        { label: trend.title },
      ]}
    >
      <div className="space-y-6">
        {/* Top action bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {trend.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Full trend overview, metadata, media, and source references
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                navigate('/trends', {
                  state: { editTrend: trend },
                })
              }
            >
              <Edit2 className="size-4" />
              Edit Trend
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {trend.images.length > 0 ? (
            <div className="relative h-[280px] w-full md:h-[360px] xl:h-[420px]">
              <img
                src={trend.images[activeImg]}
                alt={trend.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {trend.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImg((i) => (i - 1 + trend.images.length) % trend.images.length)
                    }
                    className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % trend.images.length)}
                    className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      'rounded-full border bg-background/80 px-3 py-1 text-[11px] font-medium capitalize backdrop-blur',
                      statusStyles[trend.status]
                    )}
                  >
                    {trend.status}
                  </Badge>

                  <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
                    {trend.category}
                  </span>
                </div>

                <h2 className="max-w-4xl text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {trend.title}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 md:text-[15px]">
                  {trend.summary}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-[220px] items-center justify-center bg-secondary text-muted-foreground">
              No image available
            </div>
          )}

          {trend.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto border-t border-border px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {trend.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition',
                    i === activeImg
                      ? 'border-primary shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main content */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="size-4" />
                  Trend Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-[15px] leading-8 text-foreground/85">
                  {trend.content}
                </div>
              </CardContent>
            </Card>

            {trend.links.length > 0 && (
              <Card className="rounded-2xl border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2 className="size-4" />
                    Sources & References
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {trend.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 transition hover:border-primary/30 hover:bg-secondary"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {link.label || 'External Source'}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {link.url}
                          </p>
                        </div>
                        <ExternalLink className="size-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <User2 className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Author</p>
                    <p className="text-sm font-medium text-foreground">{trend.author}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <CalendarDays className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-medium text-foreground">
                      {format(new Date(trend.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <FolderOpen className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm font-medium text-foreground">{trend.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Eye className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Views</p>
                    <p className="text-sm font-medium text-foreground">
                      {trend.views.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Images className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Media</p>
                    <p className="text-sm font-medium text-foreground">
                      {trend.images.length} image{trend.images.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Publishing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium capitalize',
                    statusStyles[trend.status]
                  )}
                >
                  {trend.status}
                </Badge>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {trend.status === 'published' &&
                    'This trend is currently visible to users and contributing to engagement metrics.'}
                  {trend.status === 'draft' &&
                    'This trend is still in draft mode and has not yet been published.'}
                  {trend.status === 'pending' &&
                    'This trend is awaiting review before it can go live.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}