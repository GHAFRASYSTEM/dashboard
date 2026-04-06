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
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Edit,
  Trash2,
  UserCog,
  Eye,
  ChevronRight,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { format } from 'date-fns'

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
  { id: '1', name: 'Dr. James Mensah', position: 'President', email: 'president@gafra.org', phone: '+233 24 123 4567', bio: 'Leading the organization since 2020 with a vision for community growth and sustainable development initiatives.', status: 'active', joinedAt: new Date('2020-01-15') },
  { id: '2', name: 'Mrs. Grace Osei', position: 'Vice President', email: 'vp@gafra.org', phone: '+233 24 234 5678', bio: 'Dedicated to member welfare and community development programs with a focus on empowerment.', status: 'active', joinedAt: new Date('2020-01-15') },
  { id: '3', name: 'Mr. Kofi Asante', position: 'General Secretary', email: 'secretary@gafra.org', phone: '+233 24 345 6789', bio: 'Managing organizational records and communications with excellence and precision.', status: 'active', joinedAt: new Date('2021-03-20') },
  { id: '4', name: 'Mrs. Ama Boateng', position: 'Treasurer', email: 'treasurer@gafra.org', phone: '+233 24 456 7890', bio: 'Overseeing financial operations and member contributions with integrity and transparency.', status: 'active', joinedAt: new Date('2021-03-20') },
  { id: '5', name: 'Mr. Kwame Adjei', position: 'Organizing Secretary', email: 'organizing@gafra.org', phone: '+233 24 567 8901', bio: 'Coordinating events and member activities to build stronger community bonds.', status: 'active', joinedAt: new Date('2022-01-10') },
  { id: '6', name: 'Ms. Efua Mensah', position: 'PRO', email: 'pro@gafra.org', phone: '+233 24 678 9012', bio: 'Managing public relations and media communications to elevate organizational profile.', status: 'active', joinedAt: new Date('2022-01-10') },
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="relative overflow-hidden border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <div className="absolute top-0 right-0 size-32 rounded-full bg-primary/10 -translate-y-1/2 translate-x-1/2" />
            <CardContent className="pt-6 relative">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Users className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{executives.length}</p>
                  <p className="text-sm text-muted-foreground">Total Executives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent">
            <div className="absolute top-0 right-0 size-32 rounded-full bg-green-500/10 -translate-y-1/2 translate-x-1/2" />
            <CardContent className="pt-6 relative">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="size-6 text-green-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{executives.filter(e => e.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border bg-gradient-to-br from-muted via-muted/50 to-transparent">
            <div className="absolute top-0 right-0 size-32 rounded-full bg-muted -translate-y-1/2 translate-x-1/2" />
            <CardContent className="pt-6 relative">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted border border-border">
                  <UserCog className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{executives.filter(e => e.status === 'inactive').length}</p>
                  <p className="text-sm text-muted-foreground">Inactive Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search executives by name or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <Button onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-2" />
            Add Executive
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExecutives.map((executive) => (
            <Link key={executive.id} to={`/executives/${executive.id}`}>
              <Card className="group h-full overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="size-14 border-2 border-background shadow-md group-hover:shadow-lg transition-shadow">
                          <AvatarImage src={executive.image} alt={executive.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                            {getInitials(executive.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            'absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-background',
                            executive.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{executive.name}</h3>
                        <p className="text-sm text-primary font-medium">{executive.position}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                        <Button size="icon" variant="ghost" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem asChild>
                          <Link to={`/executives/${executive.id}`}>
                            <Eye className="size-4 mr-2" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleEdit(executive) }}>
                          <Edit className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => { e.preventDefault(); handleDelete(executive.id) }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">{executive.bio}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1 rounded bg-secondary">
                        <Mail className="size-3.5" />
                      </div>
                      <span className="truncate">{executive.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1 rounded bg-secondary">
                        <Phone className="size-3.5" />
                      </div>
                      <span>{executive.phone}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          executive.status === 'active'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {executive.status === 'active' && <CheckCircle2 className="size-3 mr-1" />}
                        {executive.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Since {format(executive.joinedAt, 'MMM yyyy')}
                      </span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredExecutives.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No executives found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {search
                ? `No executives match your search for "${search}". Try a different search term.`
                : 'Get started by adding your first executive member.'}
            </p>
            {!search && (
              <Button onClick={handleAdd}>
                <Plus className="size-4 mr-2" />
                Add Executive
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingExecutive ? 'Edit Executive' : 'Add New Executive'}</DialogTitle>
            <DialogDescription>
              {editingExecutive ? 'Update executive details and information.' : 'Fill in the details to add a new executive member.'}
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
                    placeholder="email@organization.org"
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
                  placeholder="Brief description about the executive and their role..."
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