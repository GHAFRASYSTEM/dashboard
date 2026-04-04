'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
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
import { Plus, Search, MoreVertical, Mail, Phone, Edit, Trash2, UserCog } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Executive {
  id: string
  name: string
  position: string
  email: string
  phone: string
  bio: string
  image?: string
  status: 'active' | 'inactive'
  joinedAt: Date
}

const mockExecutives: Executive[] = [
  { id: '1', name: 'Dr. James Mensah', position: 'President', email: 'president@gafra.org', phone: '+233 24 123 4567', bio: 'Leading the organization since 2020 with a vision for community growth...', status: 'active', joinedAt: new Date('2020-01-15') },
  { id: '2', name: 'Mrs. Grace Osei', position: 'Vice President', email: 'vp@gafra.org', phone: '+233 24 234 5678', bio: 'Dedicated to member welfare and community development programs...', status: 'active', joinedAt: new Date('2020-01-15') },
  { id: '3', name: 'Mr. Kofi Asante', position: 'General Secretary', email: 'secretary@gafra.org', phone: '+233 24 345 6789', bio: 'Managing organizational records and communications...', status: 'active', joinedAt: new Date('2021-03-20') },
  { id: '4', name: 'Mrs. Ama Boateng', position: 'Treasurer', email: 'treasurer@gafra.org', phone: '+233 24 456 7890', bio: 'Overseeing financial operations and member contributions...', status: 'active', joinedAt: new Date('2021-03-20') },
  { id: '5', name: 'Mr. Kwame Adjei', position: 'Organizing Secretary', email: 'organizing@gafra.org', phone: '+233 24 567 8901', bio: 'Coordinating events and member activities...', status: 'active', joinedAt: new Date('2022-01-10') },
  { id: '6', name: 'Ms. Efua Mensah', position: 'PRO', email: 'pro@gafra.org', phone: '+233 24 678 9012', bio: 'Managing public relations and media communications...', status: 'active', joinedAt: new Date('2022-01-10') },
]

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState(mockExecutives)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<Executive | null>(null)

  const filteredExecutives = executives.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setEditingExecutive(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (executive: Executive) => {
    setEditingExecutive(executive)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setExecutives(executives.filter((e) => e.id !== id))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newExecutive: Executive = {
      id: editingExecutive?.id || Date.now().toString(),
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      bio: formData.get('bio') as string,
      status: formData.get('status') as Executive['status'],
      image: editingExecutive?.image,
      joinedAt: editingExecutive?.joinedAt || new Date(),
    }

    if (editingExecutive) {
      setExecutives(executives.map((e) => (e.id === editingExecutive.id ? newExecutive : e)))
    } else {
      setExecutives([newExecutive, ...executives])
    }
    setIsDialogOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DashboardLayout title="Executives Management" breadcrumbs={[{ label: 'Executives' }]}>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search executives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <Button onClick={handleAdd} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-2" />
            Add Executive
          </Button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <UserCog className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{executives.length}</p>
                  <p className="text-sm text-muted-foreground">Total Executives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <UserCog className="size-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{executives.filter(e => e.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <UserCog className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{executives.filter(e => e.status === 'inactive').length}</p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executives Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExecutives.map((executive) => (
            <Card key={executive.id} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-14">
                      <AvatarImage src={executive.image} alt={executive.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {getInitials(executive.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{executive.name}</h3>
                      <p className="text-sm text-primary">{executive.position}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem onClick={() => handleEdit(executive)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(executive.id)} className="text-destructive focus:text-destructive">
                        <Trash2 className="size-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{executive.bio}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4" />
                    <span className="truncate">{executive.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" />
                    <span>{executive.phone}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <Badge variant="secondary" className={cn(
                    executive.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  )}>
                    {executive.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingExecutive ? 'Edit Executive' : 'Add New Executive'}</DialogTitle>
            <DialogDescription>
              {editingExecutive ? 'Update executive details.' : 'Fill in the details to add a new executive.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingExecutive?.name}
                    placeholder="Dr. John Doe"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue={editingExecutive?.position}
                    placeholder="President"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingExecutive?.email}
                    placeholder="email@gafra.org"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={editingExecutive?.phone}
                    placeholder="+233 24 xxx xxxx"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={editingExecutive?.bio}
                  placeholder="Brief description about the executive..."
                  className="bg-secondary border-border min-h-[100px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={editingExecutive?.status || 'active'}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingExecutive ? 'Save Changes' : 'Add Executive'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
