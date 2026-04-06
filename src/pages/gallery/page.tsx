import { useState, useRef } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { format } from 'date-fns'
import {
  Images,
  Search,
  Filter,
  Upload,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Calendar,
  Folder,
  Grid,
  List,
  Play,
  Film,
  CheckSquare,
  Square,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Image as ImageIcon,
  Layers,
  Plus,
} from 'lucide-react'
import { cn } from '../../lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaType = 'image' | 'video'

interface MediaItem {
  id: string
  title: string
  url: string
  thumbnail?: string
  type: MediaType
  category: string
  uploadedBy: string
  uploadedAt: Date
  size: string
  duration?: string // for videos e.g. "2:34"
}

interface MediaGroup {
  id: string
  title: string
  description: string
  items: string[] // MediaItem ids
  createdAt: Date
  createdBy: string
  category: string
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const mockMedia: MediaItem[] = [
  { id: '1',  title: 'AGM 2024 – Opening Ceremony',   url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', type: 'image', category: 'Events',    uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-15'), size: '2.4 MB' },
  { id: '2',  title: 'Community Outreach Program',    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', type: 'image', category: 'Community',  uploadedBy: 'John Doe',     uploadedAt: new Date('2024-03-14'), size: '1.8 MB' },
  { id: '3',  title: 'Executive Board Meeting',       url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', type: 'image', category: 'Meetings',  uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-13'), size: '3.1 MB' },
  { id: '4',  title: 'Member Appreciation Day',       url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', type: 'image', category: 'Events',    uploadedBy: 'Sarah Smith',  uploadedAt: new Date('2024-03-12'), size: '2.7 MB' },
  { id: '5',  title: 'Youth Workshop',                url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', type: 'image', category: 'Training',  uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-11'), size: '1.5 MB' },
  { id: '6',  title: 'Charity Fundraiser',            url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800', type: 'image', category: 'Events',    uploadedBy: 'Mike Johnson', uploadedAt: new Date('2024-03-10'), size: '2.2 MB' },
  { id: '7',  title: 'Sports Day 2024',               url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', type: 'image', category: 'Sports',    uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-09'), size: '4.0 MB' },
  { id: '8',  title: 'Cultural Night Celebration',    url: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800', type: 'image', category: 'Events',    uploadedBy: 'Emily Brown',  uploadedAt: new Date('2024-03-08'), size: '3.5 MB' },
  { id: '9',  title: 'Health Screening Program',      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800', type: 'image', category: 'Community',  uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-07'), size: '1.9 MB' },
  { id: '10', title: 'Leadership Training',           url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', type: 'image', category: 'Training',  uploadedBy: 'Admin',        uploadedAt: new Date('2024-03-06'), size: '2.1 MB' },
  { id: '11', title: 'New Year Gathering',            url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', type: 'image', category: 'Events',    uploadedBy: 'Admin',        uploadedAt: new Date('2024-01-05'), size: '2.8 MB' },
  { id: '12', title: 'Annual Awards Ceremony',        url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', type: 'image', category: 'Events',    uploadedBy: 'Admin',        uploadedAt: new Date('2024-02-20'), size: '3.3 MB' },
  // Videos
  { id: '13', title: 'AGM 2024 Highlights Reel',      url: 'https://www.w3schools.com/html/mov_bbb.mp4',   thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', type: 'video', category: 'Events',   uploadedBy: 'Admin',       uploadedAt: new Date('2024-03-16'), size: '48.2 MB', duration: '3:42' },
  { id: '14', title: 'Community Day Recap',           url: 'https://www.w3schools.com/html/movie.mp4',     thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', type: 'video', category: 'Community', uploadedBy: 'John Doe',    uploadedAt: new Date('2024-03-14'), size: '32.7 MB', duration: '2:15' },
  { id: '15', title: 'Youth Workshop Testimonials',   url: 'https://www.w3schools.com/html/mov_bbb.mp4',   thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', type: 'video', category: 'Training', uploadedBy: 'Admin',       uploadedAt: new Date('2024-03-11'), size: '21.0 MB', duration: '1:58' },
]

const mockGroups: MediaGroup[] = [
  {
    id: 'g1',
    title: 'AGM 2024 Full Coverage',
    description: 'Complete photo and video coverage of the 2024 Annual General Meeting, including the opening ceremony, keynote speeches, and networking sessions.',
    items: ['1', '13', '4'],
    createdAt: new Date('2024-03-16'),
    createdBy: 'Admin',
    category: 'Events',
  },
  {
    id: 'g2',
    title: 'Community Programmes – March 2024',
    description: 'Highlights from our community outreach and health screening programmes held throughout March 2024.',
    items: ['2', '9', '14'],
    createdAt: new Date('2024-03-15'),
    createdBy: 'John Doe',
    category: 'Community',
  },
]

const MEDIA_CATEGORIES = ['All', 'Events', 'Community', 'Meetings', 'Training', 'Sports']
const TYPE_FILTERS = ['All Media', 'Pictures', 'Videos']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Events:    'bg-violet-500/20 text-violet-300 border-violet-500/30',
    Community: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Meetings:  'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Training:  'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Sports:    'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }
  return map[cat] ?? 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30'
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: MediaItem[]
  initialIndex: number
  onClose: () => void
}

function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const item = items[index]
  const videoRef = useRef<HTMLVideoElement>(null)

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
      >
        <X className="size-5" />
      </button>

      {/* Prev / Next */}
      {items.length > 1 && (
        <>
          <button
            className="absolute left-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className="absolute right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {/* Media */}
      <div
        className="relative mx-16 flex max-h-[85vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[75vh] rounded-xl object-contain shadow-2xl"
            style={{ maxWidth: '100%' }}
          />
        ) : (
          <video
            ref={videoRef}
            src={item.url}
            controls
            autoPlay
            className="max-h-[75vh] rounded-xl shadow-2xl"
            style={{ maxWidth: '100%' }}
          />
        )}

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-white/50">
            {item.category} · {item.uploadedBy} · {format(item.uploadedAt, 'MMM d, yyyy')}
          </p>
        </div>

        {/* Thumbnail strip */}
        {items.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setIndex(i)}
                className={cn(
                  'relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition',
                  i === index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                )}
              >
                <img
                  src={it.thumbnail ?? it.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {it.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="size-4 fill-white text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
          {index + 1} / {items.length}
        </div>
      )}
    </div>
  )
}

// ─── Publish Group Dialog ─────────────────────────────────────────────────────

interface PublishGroupDialogProps {
  selectedIds: string[]
  allMedia: MediaItem[]
  onPublish: (group: Omit<MediaGroup, 'id' | 'createdAt'>) => void
  onClose: () => void
}

function PublishGroupDialog({ selectedIds, allMedia, onPublish, onClose }: PublishGroupDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Events')

  const selectedMedia = allMedia.filter((m) => selectedIds.includes(m.id))

  const handleSubmit = () => {
    if (!title.trim()) return
    onPublish({ title, description, items: selectedIds, createdBy: 'Admin', category })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="border-white/10 bg-[#141418] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-white">Publish as Group</DialogTitle>
          <DialogDescription className="text-white/50">
            Bundle {selectedIds.length} selected item{selectedIds.length > 1 ? 's' : ''} into a named collection with a description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Preview strip */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {selectedMedia.map((m) => (
              <div key={m.id} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                <img src={m.thumbnail ?? m.url} alt={m.title} className="h-full w-full object-cover" />
                {m.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Play className="size-4 fill-white text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Group Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Birthday Celebration 2024"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add context about this collection — event details, date, who attended…"
                rows={3}
                className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#1e1e24]">
                  {MEDIA_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <SelectItem key={c} value={c} className="text-white focus:bg-white/10">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} className="text-white/60 hover:text-white">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40"
          >
            <Send className="mr-2 size-4" />
            Publish Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Group Card ───────────────────────────────────────────────────────────────

interface GroupCardProps {
  group: MediaGroup
  allMedia: MediaItem[]
  onOpenLightbox: (items: MediaItem[], index: number) => void
  onDelete: (id: string) => void
}

function GroupCard({ group, allMedia, onOpenLightbox, onDelete }: GroupCardProps) {
  const items = group.items.map((id) => allMedia.find((m) => m.id === id)).filter(Boolean) as MediaItem[]
  const preview = items.slice(0, 4)

  return (
    <Card className="overflow-hidden border-white/10 bg-[#141418] transition-all hover:border-white/20">
      <div className="grid grid-cols-2 gap-0.5 bg-black/20">
        {preview.map((item, i) => (
          <button
            key={item.id}
            className="relative aspect-square overflow-hidden"
            onClick={() => onOpenLightbox(items, i)}
          >
            <img
              src={item.thumbnail ?? item.url}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Play className="size-4 fill-white text-white" />
                </div>
              </div>
            )}
            {i === 3 && items.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="text-xl font-bold text-white">+{items.length - 4}</span>
              </div>
            )}
          </button>
        ))}
        {/* Fill empty spots */}
        {preview.length < 4 && Array.from({ length: 4 - preview.length }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-white/5" />
        ))}
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{group.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-white/50">{group.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="size-8 shrink-0 text-white/50 hover:text-white">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white/10 bg-[#1e1e24]">
              <DropdownMenuItem className="text-white/80 focus:bg-white/10" onClick={() => onOpenLightbox(items, 0)}>
                <Eye className="mr-2 size-4" />View All
              </DropdownMenuItem>
              <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400" onClick={() => onDelete(group.id)}>
                <Trash2 className="mr-2 size-4" />Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className={cn('rounded-full border px-2 py-0.5 text-xs', getCategoryColor(group.category))}>
            {group.category}
          </span>
          <span className="flex items-center gap-1">
            <Layers className="size-3" />
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
          <span>{format(group.createdAt, 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>(mockMedia)
  const [groups, setGroups] = useState<MediaGroup[]>(mockGroups)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All Media')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'groups'>('grid')

  // Selection
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Lightbox
  const [lightboxItems, setLightboxItems] = useState<MediaItem[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Publish dialog
  const [publishOpen, setPublishOpen] = useState(false)

  // ── Derived ──

  const filteredMedia = media.filter((m) => {
    const matchSearch   = m.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'All' || m.category === selectedCategory
    const matchType     = typeFilter === 'All Media' || (typeFilter === 'Pictures' ? m.type === 'image' : m.type === 'video')
    return matchSearch && matchCategory && matchType
  })

  const totalSize  = media.reduce((acc, m) => acc + parseFloat(m.size), 0)
  const imageCount = media.filter((m) => m.type === 'image').length
  const videoCount = media.filter((m) => m.type === 'video').length
  const thisMonth  = media.filter((m) => {
    const now = new Date()
    return m.uploadedAt.getMonth() === now.getMonth() && m.uploadedAt.getFullYear() === now.getFullYear()
  }).length

  // ── Handlers ──

  const openLightbox = (items: MediaItem[], index: number) => {
    setLightboxItems(items)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleDelete = (id: string) => setMedia((prev) => prev.filter((m) => m.id !== id))

  const handlePublish = (groupData: Omit<MediaGroup, 'id' | 'createdAt'>) => {
    setGroups((prev) => [
      { ...groupData, id: `g${Date.now()}`, createdAt: new Date() },
      ...prev,
    ])
    setSelectedIds(new Set())
    setSelectionMode(false)
    setPublishOpen(false)
  }

  const handleDeleteGroup = (id: string) => setGroups((prev) => prev.filter((g) => g.id !== id))

  const exitSelection = () => {
    setSelectionMode(false)
    setSelectedIds(new Set())
  }

  // ── Stat Cards ──

  const stats = [
    { icon: <Images className="size-5 text-violet-400" />, value: media.length, label: 'Total Media', accent: 'bg-violet-500/10' },
    { icon: <ImageIcon className="size-5 text-sky-400" />,  value: imageCount,   label: 'Pictures',    accent: 'bg-sky-500/10' },
    { icon: <Film className="size-5 text-rose-400" />,       value: videoCount,   label: 'Videos',      accent: 'bg-rose-500/10' },
    { icon: <Layers className="size-5 text-amber-400" />,    value: groups.length, label: 'Groups',     accent: 'bg-amber-500/10' },
    { icon: <Calendar className="size-5 text-emerald-400" />, value: thisMonth,   label: 'This Month',  accent: 'bg-emerald-500/10' },
    { icon: <Download className="size-5 text-zinc-400" />,   value: `${totalSize.toFixed(1)} MB`, label: 'Total Size', accent: 'bg-zinc-500/10' },
  ]

  return (
    <DashboardLayout title="Gallery Management" breadcrumbs={[{ label: 'Gallery' }]}>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Publish dialog */}
      {publishOpen && (
        <PublishGroupDialog
          selectedIds={Array.from(selectedIds)}
          allMedia={media}
          onPublish={handlePublish}
          onClose={() => setPublishOpen(false)}
        />
      )}

      <div className="space-y-6">
        {/* ── Stats ── */}
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Card key={i} className="border-white/8 bg-[#141418]">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={cn('rounded-lg p-2', s.accent)}>{s.icon}</div>
                <div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative w-56">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
              <Input
                placeholder="Search media…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/30 focus:border-white/30"
              />
            </div>

            {/* Category filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-36 border-white/10 bg-white/5 text-white">
                <Filter className="mr-2 size-3.5 text-white/40" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1e1e24]">
                {MEDIA_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c} className="text-white focus:bg-white/10">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type filter tabs */}
            <div className="flex overflow-hidden rounded-lg border border-white/10">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium transition',
                    typeFilter === f
                      ? 'bg-violet-600 text-white'
                      : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {f === 'Pictures' && <ImageIcon className="mr-1 inline size-3" />}
                  {f === 'Videos' && <Film className="mr-1 inline size-3" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Selection mode / publish */}
            {selectionMode ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">{selectedIds.size} selected</span>
                <Button
                  size="sm"
                  disabled={selectedIds.size === 0}
                  onClick={() => setPublishOpen(true)}
                  className="bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40"
                >
                  <Send className="mr-1.5 size-3.5" />
                  Publish Group
                </Button>
                <Button size="sm" variant="ghost" onClick={exitSelection} className="text-white/50 hover:text-white">
                  <X className="mr-1 size-3.5" />Cancel
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setSelectionMode(true); setViewMode('grid') }}
                className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <CheckSquare className="mr-1.5 size-3.5" />
                Select
              </Button>
            )}

            {/* View toggles */}
            <div className="flex overflow-hidden rounded-lg border border-white/10">
              {(['grid', 'list', 'groups'] as const).map((v) => (
                <Button
                  key={v}
                  variant="ghost"
                  size="icon"
                  className={cn('size-9 rounded-none text-white/50 hover:text-white', viewMode === v && 'bg-white/10 text-white')}
                  onClick={() => setViewMode(v)}
                  title={v.charAt(0).toUpperCase() + v.slice(1)}
                >
                  {v === 'grid'   && <Grid className="size-4" />}
                  {v === 'list'   && <List className="size-4" />}
                  {v === 'groups' && <Layers className="size-4" />}
                </Button>
              ))}
            </div>

            <Button className="bg-violet-600 text-white hover:bg-violet-500">
              <Upload className="mr-2 size-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* ── Groups View ── */}
        {viewMode === 'groups' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Media Groups</h2>
              <Button
                size="sm"
                variant="outline"
                className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                onClick={() => { setViewMode('grid'); setSelectionMode(true) }}
              >
                <Plus className="mr-1.5 size-3.5" />New Group
              </Button>
            </div>
            {groups.length === 0 ? (
              <div className="py-16 text-center">
                <Layers className="mx-auto mb-4 size-12 text-white/20" />
                <p className="text-white/40">No groups yet. Select media and publish as a group.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((g) => (
                  <GroupCard
                    key={g.id}
                    group={g}
                    allMedia={media}
                    onOpenLightbox={openLightbox}
                    onDelete={handleDeleteGroup}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Grid View ── */}
        {viewMode === 'grid' && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMedia.map((item) => {
              const isSelected = selectedIds.has(item.id)
              return (
                <Card
                  key={item.id}
                  className={cn(
                    'group relative overflow-hidden border bg-[#141418] transition-all',
                    isSelected ? 'border-violet-500 ring-1 ring-violet-500' : 'border-white/8 hover:border-white/20'
                  )}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-square cursor-pointer overflow-hidden bg-[#0c0c10]"
                    onClick={() => {
                      if (selectionMode) {
                        toggleSelect(item.id)
                      } else {
                        openLightbox(filteredMedia, filteredMedia.indexOf(item))
                      }
                    }}
                  >
                    <img
                      src={item.thumbnail ?? item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Video overlay */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition group-hover:bg-black/70">
                          <Play className="ml-0.5 size-5 fill-white text-white" />
                        </div>
                        {item.duration && (
                          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Hover actions (non-select mode) */}
                    {!selectionMode && (
                      <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 rounded bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            onClick={() => openLightbox(filteredMedia, filteredMedia.indexOf(item))}
                          >
                            <Eye className="size-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 rounded bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                          >
                            <Download className="size-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 rounded bg-rose-500/20 text-rose-400 backdrop-blur-sm hover:bg-rose-500/40"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-2 left-2">
                      <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm', getCategoryColor(item.category))}>
                        {item.category}
                      </span>
                    </div>

                    {/* Type badge */}
                    <div className="absolute top-2 right-2">
                      {item.type === 'video'
                        ? <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-medium text-rose-300 backdrop-blur-sm"><Film className="size-2.5" />Video</span>
                        : <span className="flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-medium text-sky-300 backdrop-blur-sm"><ImageIcon className="size-2.5" />Photo</span>
                      }
                    </div>

                    {/* Selection checkbox */}
                    {selectionMode && (
                      <div className="absolute top-2 right-2">
                        {isSelected
                          ? <CheckSquare className="size-6 text-violet-400 drop-shadow" />
                          : <Square className="size-6 text-white/50 drop-shadow" />
                        }
                      </div>
                    )}
                  </div>

                  <CardContent className="p-3">
                    <p className="truncate text-sm font-medium text-white">{item.title}</p>
                    <div className="mt-1 flex items-center justify-between text-xs text-white/40">
                      <span>{item.size}</span>
                      <span>{format(item.uploadedAt, 'MMM d, yyyy')}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* ── List View ── */}
        {viewMode === 'list' && (
          <Card className="border-white/8 bg-[#141418]">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {filteredMedia.map((item) => {
                  const isSelected = selectedIds.has(item.id)
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'flex items-center gap-4 px-4 py-3 transition hover:bg-white/3',
                        isSelected && 'bg-violet-500/5'
                      )}
                    >
                      {selectionMode && (
                        <button onClick={() => toggleSelect(item.id)} className="shrink-0">
                          {isSelected
                            ? <CheckSquare className="size-5 text-violet-400" />
                            : <Square className="size-5 text-white/30" />
                          }
                        </button>
                      )}

                      <button
                        className="relative size-16 shrink-0 overflow-hidden rounded-lg"
                        onClick={() => openLightbox(filteredMedia, filteredMedia.indexOf(item))}
                      >
                        <img src={item.thumbnail ?? item.url} alt={item.title} className="h-full w-full object-cover" />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Play className="size-4 fill-white text-white" />
                          </div>
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-white">{item.title}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                          <span className={cn('rounded-full border px-2 py-0.5', getCategoryColor(item.category))}>{item.category}</span>
                          <span>{item.type === 'video' ? `Video · ${item.duration}` : 'Photo'}</span>
                          <span>{item.size}</span>
                          <span>{format(item.uploadedAt, 'MMM d, yyyy')}</span>
                          <span>{item.uploadedBy}</span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="size-8 text-white/40 hover:text-white">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-white/10 bg-[#1e1e24]">
                          <DropdownMenuItem className="text-white/80 focus:bg-white/10" onClick={() => openLightbox(filteredMedia, filteredMedia.indexOf(item))}>
                            {item.type === 'video' ? <><Volume2 className="mr-2 size-4" />Watch</> : <><Eye className="mr-2 size-4" />Preview</>}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/80 focus:bg-white/10">
                            <Download className="mr-2 size-4" />Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="mr-2 size-4" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Empty state ── */}
        {viewMode !== 'groups' && filteredMedia.length === 0 && (
          <div className="py-16 text-center">
            <Images className="mx-auto mb-4 size-12 text-white/20" />
            <p className="text-white/40">No media found matching your filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
