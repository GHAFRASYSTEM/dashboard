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
import { Briefcase, MapPin, Clock, Users, DollarSign } from 'lucide-react'

interface Internship {
  id: string
  title: string
  company: string
  location: string
  type: 'remote' | 'onsite' | 'hybrid'
  duration: string
  stipend?: string
  description: string
  requirements: string
  status: 'active' | 'inactive' | 'pending'
  applications: number
  postedAt: Date
  deadline: Date
}

const mockInternships: Internship[] = [
  { id: '1', title: 'Software Engineering Intern', company: 'TechCorp Ghana', location: 'Accra', type: 'hybrid', duration: '3 months', stipend: '$500/month', description: 'Join our engineering team to work on exciting projects...', requirements: 'Computer Science student, JavaScript, React', status: 'active', applications: 45, postedAt: new Date('2024-03-01'), deadline: new Date('2024-04-15') },
  { id: '2', title: 'Marketing Intern', company: 'Brand Solutions', location: 'Kumasi', type: 'onsite', duration: '6 months', stipend: '$400/month', description: 'Help us create marketing campaigns and content...', requirements: 'Marketing or Business student, Social media skills', status: 'active', applications: 32, postedAt: new Date('2024-03-05'), deadline: new Date('2024-04-20') },
  { id: '3', title: 'Data Analyst Intern', company: 'DataMinds', location: 'Remote', type: 'remote', duration: '4 months', stipend: '$600/month', description: 'Work with our data team to analyze trends...', requirements: 'Statistics or Math background, Python, SQL', status: 'active', applications: 28, postedAt: new Date('2024-03-08'), deadline: new Date('2024-04-25') },
  { id: '4', title: 'Graphic Design Intern', company: 'Creative Hub', location: 'Takoradi', type: 'onsite', duration: '3 months', description: 'Design marketing materials and brand assets...', requirements: 'Design portfolio, Adobe Creative Suite', status: 'pending', applications: 0, postedAt: new Date('2024-03-10'), deadline: new Date('2024-04-30') },
  { id: '5', title: 'Finance Intern', company: 'FinanceGh', location: 'Accra', type: 'hybrid', duration: '6 months', stipend: '$550/month', description: 'Support financial analysis and reporting...', requirements: 'Accounting or Finance student, Excel proficiency', status: 'inactive', applications: 67, postedAt: new Date('2024-02-15'), deadline: new Date('2024-03-15') },
]

const typeColors = {
  remote: 'bg-info/10 text-info',
  onsite: 'bg-warning/10 text-warning',
  hybrid: 'bg-chart-4/10 text-chart-4',
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState(mockInternships)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null)

  const activeCount = internships.filter(i => i.status === 'active').length
  const totalApplications = internships.reduce((acc, i) => acc + i.applications, 0)

  const columns = [
    {
      key: 'title',
      header: 'Internship',
      render: (item: Internship) => (
        <div className="space-y-1">
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.company}</p>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item: Internship) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="size-3 text-muted-foreground" />
            <span>{item.location}</span>
          </div>
          <Badge variant="secondary" className={typeColors[item.type]}>
            {item.type}
          </Badge>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (item: Internship) => (
        <div className="flex items-center gap-1 text-sm">
          <Clock className="size-3 text-muted-foreground" />
          <span>{item.duration}</span>
        </div>
      ),
    },
    {
      key: 'applications',
      header: 'Applications',
      render: (item: Internship) => (
        <div className="flex items-center gap-1 text-sm">
          <Users className="size-3 text-muted-foreground" />
          <span>{item.applications}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Internship) => <StatusBadge status={item.status} />,
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (item: Internship) => format(item.deadline, 'MMM d, yyyy'),
    },
  ]

  const handleAdd = () => {
    setEditingInternship(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Internship) => {
    setEditingInternship(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setInternships(internships.filter((i) => i.id !== id))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newInternship: Internship = {
      id: editingInternship?.id || Date.now().toString(),
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as Internship['type'],
      duration: formData.get('duration') as string,
      stipend: formData.get('stipend') as string || undefined,
      description: formData.get('description') as string,
      requirements: formData.get('requirements') as string,
      status: formData.get('status') as Internship['status'],
      applications: editingInternship?.applications || 0,
      postedAt: editingInternship?.postedAt || new Date(),
      deadline: new Date(formData.get('deadline') as string),
    }

    if (editingInternship) {
      setInternships(internships.map((i) => (i.id === editingInternship.id ? newInternship : i)))
    } else {
      setInternships([newInternship, ...internships])
    }
    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Internships Management" breadcrumbs={[{ label: 'Internships' }]}>
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Briefcase className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{internships.length}</p>
                <p className="text-sm text-muted-foreground">Total Internships</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Briefcase className="size-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <Users className="size-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalApplications}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Internships</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={internships}
            columns={columns}
            searchKey="title"
            searchPlaceholder="Search internships..."
            onAdd={handleAdd}
            addButtonLabel="Post Internship"
            actions={(item) => [
              { label: 'Edit', onClick: () => handleEdit(item) },
              { label: 'View Applications', onClick: () => {} },
              { label: 'Delete', onClick: () => handleDelete(item.id), variant: 'destructive' },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{editingInternship ? 'Edit Internship' : 'Post New Internship'}</DialogTitle>
            <DialogDescription>
              {editingInternship ? 'Update the internship details.' : 'Fill in the details to post a new internship.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingInternship?.title}
                    placeholder="Software Engineering Intern"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    defaultValue={editingInternship?.company}
                    placeholder="Company Name"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingInternship?.location}
                    placeholder="City or Remote"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" defaultValue={editingInternship?.type || 'onsite'}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    defaultValue={editingInternship?.duration}
                    placeholder="3 months"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stipend">Stipend (Optional)</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    defaultValue={editingInternship?.stipend}
                    placeholder="$500/month"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    defaultValue={editingInternship?.deadline ? format(editingInternship.deadline, 'yyyy-MM-dd') : ''}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingInternship?.status || 'active'}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingInternship?.description}
                  placeholder="Describe the internship role and responsibilities..."
                  className="bg-secondary border-border min-h-[100px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  defaultValue={editingInternship?.requirements}
                  placeholder="List the requirements and skills needed..."
                  className="bg-secondary border-border min-h-[80px]"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingInternship ? 'Save Changes' : 'Post Internship'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
