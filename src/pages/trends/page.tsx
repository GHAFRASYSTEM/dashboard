'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { DataTable, StatusBadge } from '../../components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
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

interface Trend {
  id: string
  title: string
  content: string
  author: string
  status: 'published' | 'draft' | 'pending'
  views: number
  createdAt: Date
}

const mockTrends: Trend[] = [
  { id: '1', title: 'Community Meetup 2024', content: 'Join us for our annual community gathering...', author: 'Admin', status: 'published', views: 1250, createdAt: new Date('2024-03-15') },
  { id: '2', title: 'New Partnership Announcement', content: 'Exciting news about our new partnership...', author: 'John Doe', status: 'published', views: 890, createdAt: new Date('2024-03-14') },
  { id: '3', title: 'Upcoming Events March', content: 'Check out what\'s happening this month...', author: 'Sarah Smith', status: 'draft', views: 0, createdAt: new Date('2024-03-13') },
  { id: '4', title: 'Member Spotlight: Success Stories', content: 'Celebrating our members achievements...', author: 'Admin', status: 'published', views: 567, createdAt: new Date('2024-03-12') },
  { id: '5', title: 'Health & Wellness Tips', content: 'Tips for maintaining your wellbeing...', author: 'Emily Brown', status: 'pending', views: 0, createdAt: new Date('2024-03-11') },
]

export default function TrendsPage() {
  const [trends, setTrends] = useState(mockTrends)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)

  const columns = [
    {
      key: 'title',
      header: 'Title',
      render: (trend: Trend) => (
        <div>
          <p className="font-medium">{trend.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[300px]">{trend.content}</p>
        </div>
      ),
    },
    { key: 'author', header: 'Author' },
    {
      key: 'status',
      header: 'Status',
      render: (trend: Trend) => <StatusBadge status={trend.status} />,
    },
    {
      key: 'views',
      header: 'Views',
      render: (trend: Trend) => trend.views.toLocaleString(),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (trend: Trend) => format(trend.createdAt, 'MMM d, yyyy'),
    },
  ]

  const handleAdd = () => {
    setEditingTrend(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (trend: Trend) => {
    setEditingTrend(trend)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTrends(trends.filter((t) => t.id !== id))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTrend: Trend = {
      id: editingTrend?.id || Date.now().toString(),
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: 'Admin',
      status: formData.get('status') as Trend['status'],
      views: editingTrend?.views || 0,
      createdAt: editingTrend?.createdAt || new Date(),
    }

    if (editingTrend) {
      setTrends(trends.map((t) => (t.id === editingTrend.id ? newTrend : t)))
    } else {
      setTrends([newTrend, ...trends])
    }
    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Trends Management" breadcrumbs={[{ label: 'Trends' }]}>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={trends}
            columns={columns}
            searchKey="title"
            searchPlaceholder="Search trends..."
            onAdd={handleAdd}
            addButtonLabel="Create Trend"
            actions={(trend) => [
              { label: 'Edit', onClick: () => handleEdit(trend) },
              { label: 'View', onClick: () => {} },
              { label: 'Publish', onClick: () => {} },
              { label: 'Delete', onClick: () => handleDelete(trend.id), variant: 'destructive' },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTrend ? 'Edit Trend' : 'Create New Trend'}</DialogTitle>
            <DialogDescription>
              {editingTrend ? 'Update the trend details below.' : 'Fill in the details to create a new trend post.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingTrend?.title}
                  placeholder="Enter trend title..."
                  className="bg-secondary border-border"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingTrend?.content}
                  placeholder="Write your trend content..."
                  className="bg-secondary border-border min-h-[150px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={editingTrend?.status || 'draft'}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingTrend ? 'Save Changes' : 'Create Trend'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
