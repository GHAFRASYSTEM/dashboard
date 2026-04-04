'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { DataTable, StatusBadge } from '../../components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
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
import { format } from 'date-fns'
import { Megaphone, Users, Clock } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  status: 'published' | 'draft' | 'pending'
  priority: 'low' | 'medium' | 'high'
  audience: 'all' | 'members' | 'executives'
  scheduledAt?: Date
  publishedAt?: Date
  createdAt: Date
}

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Annual General Meeting 2024', content: 'Join us for our AGM where we will discuss...', author: 'Admin', status: 'published', priority: 'high', audience: 'all', publishedAt: new Date('2024-03-15'), createdAt: new Date('2024-03-15') },
  { id: '2', title: 'System Maintenance Notice', content: 'The system will be under maintenance...', author: 'Tech Team', status: 'published', priority: 'medium', audience: 'all', publishedAt: new Date('2024-03-14'), createdAt: new Date('2024-03-14') },
  { id: '3', title: 'New Member Benefits', content: 'We are excited to announce new benefits...', author: 'Admin', status: 'draft', priority: 'low', audience: 'members', createdAt: new Date('2024-03-13') },
  { id: '4', title: 'Executive Board Meeting', content: 'Reminder: Board meeting this Friday...', author: 'Secretary', status: 'published', priority: 'high', audience: 'executives', publishedAt: new Date('2024-03-12'), createdAt: new Date('2024-03-12') },
  { id: '5', title: 'Upcoming Holiday Schedule', content: 'Please note the following holiday dates...', author: 'Admin', status: 'pending', priority: 'medium', audience: 'all', scheduledAt: new Date('2024-03-20'), createdAt: new Date('2024-03-11') },
]

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-info/10 text-info',
  high: 'bg-destructive/10 text-destructive',
}

const audienceLabels = {
  all: 'All Users',
  members: 'Members Only',
  executives: 'Executives Only',
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  const columns = [
    {
      key: 'title',
      header: 'Announcement',
      render: (item: Announcement) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{item.title}</p>
            <Badge variant="secondary" className={priorityColors[item.priority]}>
              {item.priority}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate max-w-[300px]">{item.content}</p>
        </div>
      ),
    },
    {
      key: 'audience',
      header: 'Audience',
      render: (item: Announcement) => (
        <div className="flex items-center gap-1 text-sm">
          <Users className="size-3 text-muted-foreground" />
          <span>{audienceLabels[item.audience]}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Announcement) => <StatusBadge status={item.status} />,
    },
    {
      key: 'publishedAt',
      header: 'Published/Scheduled',
      render: (item: Announcement) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="size-3" />
          <span>
            {item.publishedAt
              ? format(item.publishedAt, 'MMM d, yyyy')
              : item.scheduledAt
              ? `Scheduled: ${format(item.scheduledAt, 'MMM d, yyyy')}`
              : '-'}
          </span>
        </div>
      ),
    },
  ]

  const handleAdd = () => {
    setEditingAnnouncement(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Announcement) => {
    setEditingAnnouncement(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
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
      publishedAt: status === 'published' ? new Date() : undefined,
      createdAt: editingAnnouncement?.createdAt || new Date(),
    }

    if (editingAnnouncement) {
      setAnnouncements(announcements.map((a) => (a.id === editingAnnouncement.id ? newAnnouncement : a)))
    } else {
      setAnnouncements([newAnnouncement, ...announcements])
    }
    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Announcements" breadcrumbs={[{ label: 'Announcements' }]}>
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Megaphone className="size-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'published').length}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="size-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Megaphone className="size-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'draft').length}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={announcements}
            columns={columns}
            searchKey="title"
            searchPlaceholder="Search announcements..."
            onAdd={handleAdd}
            addButtonLabel="New Announcement"
            actions={(item) => [
              { label: 'Edit', onClick: () => handleEdit(item) },
              { label: 'Publish Now', onClick: () => {} },
              { label: 'Delete', onClick: () => handleDelete(item.id), variant: 'destructive' },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}</DialogTitle>
            <DialogDescription>
              {editingAnnouncement ? 'Update the announcement details.' : 'Create a new announcement for your community.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingAnnouncement?.title}
                  placeholder="Enter announcement title..."
                  className="bg-secondary border-border"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingAnnouncement?.content}
                  placeholder="Write your announcement..."
                  className="bg-secondary border-border min-h-[150px]"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" defaultValue={editingAnnouncement?.priority || 'medium'}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select name="audience" defaultValue={editingAnnouncement?.audience || 'all'}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="members">Members Only</SelectItem>
                      <SelectItem value="executives">Executives Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingAnnouncement?.status || 'draft'}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Schedule</SelectItem>
                      <SelectItem value="published">Publish Now</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingAnnouncement ? 'Save Changes' : 'Create Announcement'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
