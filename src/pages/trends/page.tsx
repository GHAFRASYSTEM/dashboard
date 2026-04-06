'use client'

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { format } from 'date-fns'
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  ImagePlus,
  Link2,
  X,
  TrendingUp,
  ExternalLink,
} from 'lucide-react'
import { cn } from '../../lib/utils'

export interface TrendLink {
  label: string
  url: string
}

export interface Trend {
  id: string
  title: string
  summary: string
  content: string
  author: string
  status: 'published' | 'draft' | 'pending'
  views: number
  images: string[]           // base64 or URL strings
  links: TrendLink[]
  createdAt: Date
  category: string
}

const CATEGORIES = ['General', 'Community', 'Events', 'Health', 'Business', 'Technology', 'Culture']

const mockTrends: Trend[] = [
  {
    id: '1',
    title: 'Community Meetup 2024',
    summary: 'Join us for our annual community gathering — a day of connection, celebration, and collaboration.',
    content: 'Join us for our annual community gathering where members from across the region come together...',
    author: 'Admin',
    status: 'published',
    views: 1250,
    images: [],
    links: [{ label: 'Event Page', url: 'https://example.com/meetup' }],
    createdAt: new Date('2024-03-15'),
    category: 'Events',
  },
  {
    id: '2',
    title: 'New Partnership Announcement',
    summary: 'We are thrilled to announce a strategic partnership that will expand opportunities for all members.',
    content: 'Exciting news about our new partnership with leading organizations in the community...',
    author: 'John Doe',
    status: 'published',
    views: 890,
    images: [],
    links: [
      { label: 'Press Release', url: 'https://example.com/press' },
      { label: 'Partner Website', url: 'https://example.com/partner' },
    ],
    createdAt: new Date('2024-03-14'),
    category: 'Business',
  },
  {
    id: '3',
    title: 'Upcoming Events March',
    summary: 'Check out what\'s happening this month — workshops, socials, and more lined up for the community.',
    content: 'Check out what\'s happening this month across all our branches and chapters...',
    author: 'Sarah Smith',
    status: 'draft',
    views: 0,
    images: [],
    links: [],
    createdAt: new Date('2024-03-13'),
    category: 'Events',
  },
  {
    id: '4',
    title: 'Member Spotlight: Success Stories',
    summary: 'Celebrating our members\' achievements and the milestones they have reached this quarter.',
    content: 'Celebrating our members achievements and the incredible milestones they have reached...',
    author: 'Admin',
    status: 'published',
    views: 567,
    images: [],
    links: [],
    createdAt: new Date('2024-03-12'),
    category: 'Community',
  },
  {
    id: '5',
    title: 'Health & Wellness Tips',
    summary: 'Practical tips and insights for maintaining your wellbeing shared by our wellness committee.',
    content: 'Tips for maintaining your wellbeing from our dedicated wellness committee...',
    author: 'Emily Brown',
    status: 'pending',
    views: 0,
    images: [],
    links: [{ label: 'Wellness Resources', url: 'https://example.com/wellness' }],
    createdAt: new Date('2024-03-11'),
    category: 'Health',
  },
]

const statusStyles: Record<Trend['status'], string> = {
  published: 'bg-primary/10 text-primary border-primary/20',
  draft:     'bg-muted text-muted-foreground border-border',
  pending:   'bg-warning/10 text-warning border-warning/20',
}

// ─── Add/Edit Dialog ──────────────────────────────────────────────────────────

function TrendDialog({
  open,
  onOpenChange,
  editing,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  editing: Trend | null
  onSave: (t: Trend) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>(editing?.images ?? [])
  const [links, setLinks] = useState<TrendLink[]>(editing?.links ?? [{ label: '', url: '' }])
  const [status, setStatus] = useState<Trend['status']>(editing?.status ?? 'draft')
  const [category, setCategory] = useState(editing?.category ?? 'General')

  // reset when dialog opens with new editing target
  const handleOpenChange = (v: boolean) => {
    if (v) {
      setImages(editing?.images ?? [])
      setLinks(editing?.links?.length ? editing.links : [{ label: '', url: '' }])
      setStatus(editing?.status ?? 'draft')
      setCategory(editing?.category ?? 'General')
    }
    onOpenChange(v)
  }

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages((prev) => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i))

  const updateLink = (i: number, field: keyof TrendLink, value: string) => {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)))
  }
  const addLink = () => setLinks((prev) => [...prev, { label: '', url: '' }])
  const removeLink = (i: number) => setLinks((prev) => prev.filter((_, idx) => idx !== i))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const saved: Trend = {
      id: editing?.id ?? Date.now().toString(),
      title: fd.get('title') as string,
      summary: fd.get('summary') as string,
      content: fd.get('content') as string,
      author: editing?.author ?? 'Admin',
      status,
      category,
      views: editing?.views ?? 0,
      images,
      links: links.filter((l) => l.url.trim()),
      createdAt: editing?.createdAt ?? new Date(),
    }
    onSave(saved)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden border-border bg-card p-0 sm:max-w-[680px]">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-5">
          <DialogTitle className="text-[16px] font-semibold tracking-tight">
            {editing ? 'Edit Trend' : 'Post New Trend'}
          </DialogTitle>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {editing ? 'Update this trend post.' : 'Share the latest news, updates, or stories with the community.'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          {/* Scrollable body */}
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-[12px] font-medium text-muted-foreground">Title *</Label>
              <Input
                id="title" name="title"
                defaultValue={editing?.title}
                placeholder="e.g. Community Meetup 2024"
                className="h-10 border-border bg-secondary text-[13.5px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
                required
              />
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <Label htmlFor="summary" className="text-[12px] font-medium text-muted-foreground">
                Summary <span className="text-muted-foreground/50">(shown on cards)</span>
              </Label>
              <Textarea
                id="summary" name="summary"
                defaultValue={editing?.summary}
                placeholder="A short description shown in the trend card..."
                className="min-h-[72px] resize-none border-border bg-secondary text-[13.5px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
                required
              />
            </div>

            {/* Full content */}
            <div className="space-y-1.5">
              <Label htmlFor="content" className="text-[12px] font-medium text-muted-foreground">Full Content *</Label>
              <Textarea
                id="content" name="content"
                defaultValue={editing?.content}
                placeholder="Write the full story, details, and context here..."
                className="min-h-[140px] resize-none border-border bg-secondary text-[13.5px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
                required
              />
            </div>

            {/* Category + Status row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10 border-border bg-secondary text-[13px] focus:ring-1 focus:ring-primary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="text-[13px]">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-muted-foreground">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as Trend['status'])}>
                  <SelectTrigger className="h-10 border-border bg-secondary text-[13px] focus:ring-1 focus:ring-primary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="draft" className="text-[13px]">Draft</SelectItem>
                    <SelectItem value="pending" className="text-[13px]">Pending Review</SelectItem>
                    <SelectItem value="published" className="text-[13px]">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label className="text-[12px] font-medium text-muted-foreground">Images</Label>
              <div className="flex flex-wrap gap-2">
                {images.map((src, i) => (
                  <div key={i} className="group relative size-20 overflow-hidden rounded-lg border border-border">
                    <img src={src} alt="" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="size-3 text-foreground" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex size-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
                >
                  <ImagePlus className="size-5" />
                  <span className="text-[10px] font-medium">Add image</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageFiles}
                />
              </div>
            </div>

            {/* Source links */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[12px] font-medium text-muted-foreground">Source Links</Label>
                <button
                  type="button"
                  onClick={addLink}
                  className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80"
                >
                  <Plus className="size-3" /> Add link
                </button>
              </div>
              <div className="space-y-2">
                {links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Link2 className="size-3.5 text-muted-foreground" />
                    </div>
                    <Input
                      value={link.label}
                      onChange={(e) => updateLink(i, 'label', e.target.value)}
                      placeholder="Label (e.g. Source Article)"
                      className="h-8 w-32 shrink-0 border-border bg-secondary text-[12px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(i, 'url', e.target.value)}
                      placeholder="https://..."
                      className="h-8 flex-1 border-border bg-secondary text-[12px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(i)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center justify-end gap-3 border-t border-border px-6 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-9 border border-border text-[13px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 bg-primary px-5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
            >
              {editing ? 'Save Changes' : 'Post Trend'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Trend Card ───────────────────────────────────────────────────────────────

function TrendCard({
  trend,
  onView,
  onEdit,
  onDelete,
}: {
  trend: Trend
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/80 hover:shadow-[0_0_0_1px_hsl(var(--border)/0.5)]"
      onClick={onView}
    >
      {/* Cover image */}
      {trend.images[0] ? (
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          <img
            src={trend.images[0]}
            alt={trend.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {trend.images.length > 1 && (
            <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
              +{trend.images.length - 1} more
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center bg-secondary/60">
          <TrendingUp className="size-8 text-muted-foreground/20" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category + status row */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {trend.category}
          </span>
          <Badge
            variant="outline"
            className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize', statusStyles[trend.status])}
          >
            {trend.status}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
          {trend.title}
        </h3>

        {/* Summary */}
        <p className="flex-1 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2">
          {trend.summary}
        </p>

        {/* Links preview */}
        {trend.links.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {trend.links.slice(0, 2).map((link, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[11px] text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-2.5" />
                {link.label || 'Source'}
              </span>
            ))}
            {trend.links.length > 2 && (
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                +{trend.links.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer meta */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[9px] font-semibold text-primary">
              {trend.author[0]}
            </div>
            <span className="text-[11px] text-muted-foreground">{trend.author}</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-[11px] text-muted-foreground">
              {format(trend.createdAt, 'MMM d')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {trend.status === 'published' && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Eye className="size-3" />
                {trend.views.toLocaleString()}
              </span>
            )}

            {/* Actions — stop propagation so card click doesn't fire */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="flex size-6 items-center justify-center rounded-md text-muted-foreground/50 opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100">
                  <MoreHorizontal className="size-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 border-border bg-card text-[13px]"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem onClick={onView} className="gap-2 text-[12.5px]">
                  <Eye className="size-3.5" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="gap-2 text-[12.5px]">
                  <Edit2 className="size-3.5" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="gap-2 text-[12.5px] text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-3.5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TrendsPage() {
  const navigate = useNavigate()
  const [trends, setTrends] = useState<Trend[]>(mockTrends)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)

  const filtered = trends.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.summary.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleAdd = () => {
    setEditingTrend(null)
    setDialogOpen(true)
  }

  const handleEdit = (trend: Trend) => {
    setEditingTrend(trend)
    setDialogOpen(true)
  }

  const handleSave = (saved: Trend) => {
    setTrends((prev) =>
      editingTrend ? prev.map((t) => (t.id === saved.id ? saved : t)) : [saved, ...prev]
    )
  }

  const handleDelete = (id: string) => setTrends((prev) => prev.filter((t) => t.id !== id))

  const counts = {
    all: trends.length,
    published: trends.filter((t) => t.status === 'published').length,
    draft: trends.filter((t) => t.status === 'draft').length,
    pending: trends.filter((t) => t.status === 'pending').length,
  }

  return (
    <DashboardLayout title="Trends" breadcrumbs={[{ label: 'Trends' }]}>
      <div className="space-y-5">

        {/* Top toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {/* Status filter pills */}
            {(['all', 'published', 'pending', 'draft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors',
                  filterStatus === s
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {s} <span className="ml-0.5 opacity-60">({counts[s]})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                placeholder="Search trends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-52 border-border bg-secondary pl-8 text-[13px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="h-8 gap-1.5 bg-primary px-4 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="size-3.5" />
              Post Trend
            </Button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                onView={() => navigate(`/trends/${trend.id}`, { state: { trend } })}
                onEdit={() => handleEdit(trend)}
                onDelete={() => handleDelete(trend.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <TrendingUp className="mb-3 size-8 text-muted-foreground/20" />
            <p className="text-[14px] font-medium text-muted-foreground">No trends found</p>
            <p className="mt-1 text-[12px] text-muted-foreground/60">
              {search ? 'Try a different search term' : 'Post your first trend to get started'}
            </p>
            {!search && (
              <Button onClick={handleAdd} className="mt-4 h-8 gap-1.5 bg-primary px-4 text-[13px] text-primary-foreground hover:bg-primary/90">
                <Plus className="size-3.5" /> Post Trend
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Dialog */}
      <TrendDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingTrend}
        onSave={handleSave}
      />
    </DashboardLayout>
  )
}
