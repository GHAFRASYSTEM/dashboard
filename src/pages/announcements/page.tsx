'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { format } from 'date-fns'
import {
  Megaphone,
  Users,
  Clock,
  Plus,
  MoreVertical,
  Search,
  ImagePlus,
  X,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  Send,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorAvatar?: string
  status: 'published' | 'draft' | 'pending'
  priority: 'low' | 'medium' | 'high'
  audience: 'all' | 'members' | 'executives'
  images: string[]
  scheduledAt?: Date
  publishedAt?: Date
  createdAt: Date
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Annual General Meeting 2024',
    content:
      'Join us for our Annual General Meeting where we will discuss the progress made over the past year, review financial statements, and elect new board members. All members are encouraged to attend and participate in this important event. Refreshments will be served after the meeting.',
    author: 'John Admin',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'published',
    priority: 'high',
    audience: 'all',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop',
    ],
    publishedAt: new Date('2024-03-15'),
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'System Maintenance Notice',
    content:
      'The system will be under maintenance on Saturday from 2:00 AM to 6:00 AM. During this time, all services will be temporarily unavailable. We apologize for any inconvenience and appreciate your patience.',
    author: 'Tech Team',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'published',
    priority: 'medium',
    audience: 'all',
    images: [],
    publishedAt: new Date('2024-03-14'),
    createdAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    title: 'New Member Benefits Program',
    content:
      'We are excited to announce new benefits for our valued members including exclusive discounts, priority access to events, and complimentary services. Check your email for more details on how to activate these benefits.',
    author: 'Sarah Manager',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    status: 'draft',
    priority: 'low',
    audience: 'members',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    ],
    createdAt: new Date('2024-03-13'),
  },
  {
    id: '4',
    title: 'Executive Board Meeting - Q1 Review',
    content:
      'Reminder: Board meeting this Friday at 10:00 AM in Conference Room A. We will be reviewing Q1 performance metrics, budget allocations, and strategic initiatives for the upcoming quarter.',
    author: 'Executive Secretary',
    authorAvatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    status: 'published',
    priority: 'high',
    audience: 'executives',
    images: [],
    publishedAt: new Date('2024-03-12'),
    createdAt: new Date('2024-03-12'),
  },
  {
    id: '5',
    title: 'Upcoming Holiday Schedule',
    content:
      'Please note the following holiday dates for the upcoming month. The office will be closed on these days. Make sure to plan your tasks accordingly and submit any pending requests before the holiday period.',
    author: 'HR Department',
    authorAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'pending',
    priority: 'medium',
    audience: 'all',
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=400&fit=crop',
    ],
    scheduledAt: new Date('2024-03-20'),
    createdAt: new Date('2024-03-11'),
  },
]

const priorityConfig = {
  low: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  medium: {
    label: 'Medium',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  high: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

const statusConfig = {
  published: {
    label: 'Published',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: Eye,
  },
  draft: {
    label: 'Draft',
    className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    icon: FileText,
  },
  pending: {
    label: 'Scheduled',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Clock,
  },
}

const audienceLabels = {
  all: 'Everyone',
  members: 'Members',
  executives: 'Executives',
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    published: announcements.filter((a) => a.status === 'published').length,
    scheduled: announcements.filter((a) => a.status === 'pending').length,
    drafts: announcements.filter((a) => a.status === 'draft').length,
  }

  const handleAdd = () => {
    setEditingAnnouncement(null)
    setUploadedImages([])
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Announcement) => {
    setEditingAnnouncement(item)
    setUploadedImages(item.images)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const status = formData.get('status') as Announcement['status']

    const newAnnouncement: Announcement = {
      id: editingAnnouncement?.id || Date.now().toString(),
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: 'Admin',
      status,
      priority: formData.get('priority') as Announcement['priority'],
      audience: formData.get('audience') as Announcement['audience'],
      images: uploadedImages,
      publishedAt: status === 'published' ? new Date() : undefined,
      createdAt: editingAnnouncement?.createdAt || new Date(),
    }

    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) => (a.id === editingAnnouncement.id ? newAnnouncement : a))
      )
    } else {
      setAnnouncements([newAnnouncement, ...announcements])
    }

    setIsDialogOpen(false)
    setUploadedImages([])
  }

  return (
    <DashboardLayout title="Announcements" breadcrumbs={[{ label: 'Announcements' }]}>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-100">Published</p>
                <p className="mt-1 text-4xl font-bold">{stats.published}</p>
              </div>
              <div className="rounded-xl bg-white/20 p-3">
                <Megaphone className="size-6" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Scheduled</p>
                <p className="mt-1 text-4xl font-bold">{stats.scheduled}</p>
              </div>
              <div className="rounded-xl bg-white/20 p-3">
                <Clock className="size-6" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-500 to-slate-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Drafts</p>
                <p className="mt-1 text-4xl font-bold">{stats.drafts}</p>
              </div>
              <div className="rounded-xl bg-white/20 p-3">
                <FileText className="size-6" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border bg-card pl-10"
          />
        </div>

        <div className="flex gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] border-border bg-card">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="pending">Scheduled</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAdd} className="gap-2">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Announcement</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAnnouncements.map((announcement) => {
          const StatusIcon = statusConfig[announcement.status].icon

          return (
            <Link key={announcement.id} to={`/announcements/${announcement.id}`} className="block h-full">
              <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                {announcement.images.length > 0 ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={announcement.images[0]}
                      alt={announcement.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {announcement.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        <ImagePlus className="size-3" />
                        +{announcement.images.length - 1}
                      </div>
                    )}

                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className={statusConfig[announcement.status].className}>
                        <StatusIcon className="mr-1 size-3" />
                        {statusConfig[announcement.status].label}
                      </Badge>
                    </div>

                    <div className="absolute right-3 top-3">
                      <Badge className={priorityConfig[announcement.priority].className}>
                        {priorityConfig[announcement.priority].label}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <Bell className="size-12 text-primary/20" />

                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className={statusConfig[announcement.status].className}>
                        <StatusIcon className="mr-1 size-3" />
                        {statusConfig[announcement.status].label}
                      </Badge>
                    </div>

                    <div className="absolute right-3 top-3">
                      <Badge className={priorityConfig[announcement.priority].className}>
                        {priorityConfig[announcement.priority].label}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardContent className="p-5">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {announcement.title}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {announcement.content}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      {announcement.authorAvatar ? (
                        <img
                          src={announcement.authorAvatar}
                          alt={announcement.author}
                          className="size-8 rounded-full object-cover ring-2 ring-background"
                        />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">
                            {announcement.author.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground">
                          {announcement.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {announcement.publishedAt
                            ? format(announcement.publishedAt, 'MMM d, yyyy')
                            : announcement.scheduledAt
                              ? `Scheduled: ${format(announcement.scheduledAt, 'MMM d')}`
                              : format(announcement.createdAt, 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Users className="mr-1 size-3" />
                        {audienceLabels[announcement.audience]}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
                              handleEdit(announcement)
                            }}
                          >
                            <Edit2 className="mr-2 size-4" />
                            Edit
                          </DropdownMenuItem>

                          {announcement.status !== 'published' && (
                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                              <Send className="mr-2 size-4" />
                              Publish Now
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.preventDefault()
                              handleDelete(announcement.id)
                            }}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="py-16 text-center">
          <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-muted">
            <Megaphone className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-foreground">No announcements found</h3>
          <p className="mb-4 text-muted-foreground">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first announcement'}
          </p>

          {!searchQuery && filterStatus === 'all' && (
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="size-4" />
              Create Announcement
            </Button>
          )}
        </div>
      )}

      <Dialog open={!!viewingAnnouncement} onOpenChange={() => setViewingAnnouncement(null)}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-[700px]">
          <DialogHeader className="sr-only">
            <DialogTitle>{viewingAnnouncement?.title}</DialogTitle>
            <DialogDescription>View announcement details</DialogDescription>
          </DialogHeader>

          {viewingAnnouncement && (
            <>
              {viewingAnnouncement.images.length > 0 && (
                <div className="relative h-64 bg-muted">
                  <img
                    src={viewingAnnouncement.images[currentImageIndex]}
                    alt={viewingAnnouncement.title}
                    className="h-full w-full object-cover"
                  />

                  {viewingAnnouncement.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        onClick={() =>
                          setCurrentImageIndex((i) =>
                            i === 0 ? viewingAnnouncement.images.length - 1 : i - 1
                          )
                        }
                      >
                        <ChevronLeft className="size-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        onClick={() =>
                          setCurrentImageIndex((i) =>
                            i === viewingAnnouncement.images.length - 1 ? 0 : i + 1
                          )
                        }
                      >
                        <ChevronRight className="size-5" />
                      </Button>

                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {viewingAnnouncement.images.map((_, i) => (
                          <button
                            key={i}
                            className={`size-2 rounded-full transition-colors ${
                              i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge className={statusConfig[viewingAnnouncement.status].className}>
                        {statusConfig[viewingAnnouncement.status].label}
                      </Badge>
                      <Badge className={priorityConfig[viewingAnnouncement.priority].className}>
                        {priorityConfig[viewingAnnouncement.priority].label}
                      </Badge>
                      <Badge variant="outline">
                        <Users className="mr-1 size-3" />
                        {audienceLabels[viewingAnnouncement.audience]}
                      </Badge>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground">
                      {viewingAnnouncement.title}
                    </h2>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {viewingAnnouncement.content}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    {viewingAnnouncement.authorAvatar ? (
                      <img
                        src={viewingAnnouncement.authorAvatar}
                        alt={viewingAnnouncement.author}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">
                          {viewingAnnouncement.author.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-foreground">{viewingAnnouncement.author}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        {viewingAnnouncement.publishedAt
                          ? format(viewingAnnouncement.publishedAt, 'MMMM d, yyyy')
                          : viewingAnnouncement.scheduledAt
                            ? `Scheduled for ${format(
                                viewingAnnouncement.scheduledAt,
                                'MMMM d, yyyy'
                              )}`
                            : format(viewingAnnouncement.createdAt, 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setViewingAnnouncement(null)
                        handleEdit(viewingAnnouncement)
                      }}
                    >
                      <Edit2 className="mr-2 size-4" />
                      Edit
                    </Button>

                    {viewingAnnouncement.status !== 'published' && (
                      <Button size="sm">
                        <Send className="mr-2 size-4" />
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {editingAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
            </DialogTitle>
            <DialogDescription>
              {editingAnnouncement
                ? 'Update the announcement details below.'
                : 'Fill in the details to create a new announcement for your community.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave}>
            <div className="grid gap-5 py-4">
              <div className="space-y-3">
                <Label>Images</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="group relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}

                  <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary/50 hover:bg-primary/5">
                    <ImagePlus className="mb-2 size-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingAnnouncement?.title}
                  placeholder="Enter a compelling title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingAnnouncement?.content}
                  placeholder="Write your announcement message..."
                  className="min-h-[150px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" defaultValue={editingAnnouncement?.priority || 'medium'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select name="audience" defaultValue={editingAnnouncement?.audience || 'all'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Everyone</SelectItem>
                      <SelectItem value="members">Members</SelectItem>
                      <SelectItem value="executives">Executives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingAnnouncement?.status || 'draft'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="pending">Schedule</SelectItem>
                      <SelectItem value="published">Publish Now</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingAnnouncement ? 'Save Changes' : 'Create Announcement'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}