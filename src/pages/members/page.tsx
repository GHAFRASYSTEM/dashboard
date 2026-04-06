'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'
import { format } from 'date-fns'
import {
  Users,
  UserCheck,
  UserX,
  Download,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  ChevronRight,
  Upload,
  X,
  Briefcase,
  Shield,
  Clock,
  Grid,
  List,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { cn } from '../../lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Member {
  id: string
  name: string
  email: string
  phone: string
  location: string
  membershipId: string
  status: 'active' | 'inactive' | 'pending'
  position?: string
  department?: string
  bio?: string
  joinedAt: Date
  lastPayment?: Date
  image?: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockMembers: Member[] = [
  { id: '1', name: 'Kwame Asante',     email: 'kwame.asante@email.com',   phone: '+233 24 111 2222', location: 'Accra',      membershipId: 'GAF-001', status: 'active',   position: 'Board Chairman',      department: 'Executive',       bio: 'Experienced leader with over 15 years in community development and organizational management.', joinedAt: new Date('2022-01-15'), lastPayment: new Date('2024-03-01'), image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: '2', name: 'Ama Serwaa',       email: 'ama.serwaa@email.com',     phone: '+233 24 222 3333', location: 'Kumasi',     membershipId: 'GAF-002', status: 'active',   position: 'Secretary',           department: 'Administration',  bio: 'Detail-oriented professional dedicated to maintaining organizational excellence.',             joinedAt: new Date('2022-02-20'), lastPayment: new Date('2024-03-05'), image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: '3', name: 'Kofi Mensah',      email: 'kofi.mensah@email.com',    phone: '+233 24 333 4444', location: 'Takoradi',   membershipId: 'GAF-003', status: 'active',   position: 'Treasurer',           department: 'Finance',         bio: 'Financial expert ensuring transparent and responsible management of funds.',                 joinedAt: new Date('2022-03-10'), lastPayment: new Date('2024-02-28'), image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: '4', name: 'Efua Boateng',     email: 'efua.boateng@email.com',   phone: '+233 24 444 5555', location: 'Accra',      membershipId: 'GAF-004', status: 'inactive',                                                                                                                                                                                            joinedAt: new Date('2021-06-01'), lastPayment: new Date('2023-12-15'), image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: '5', name: 'Yaw Adjei',        email: 'yaw.adjei@email.com',      phone: '+233 24 555 6666', location: 'Tema',       membershipId: 'GAF-005', status: 'active',   position: 'Welfare Officer',     department: 'Welfare',         bio: 'Committed to supporting member welfare and community initiatives.',                          joinedAt: new Date('2023-01-20'), lastPayment: new Date('2024-03-10'), image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: '6', name: 'Akosua Darko',     email: 'akosua.darko@email.com',   phone: '+233 24 666 7777', location: 'Cape Coast', membershipId: 'GAF-006', status: 'pending',                                                                                                                                                                                            joinedAt: new Date('2024-03-01'),                                      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
  { id: '7', name: 'Kwabena Owusu',    email: 'kwabena.owusu@email.com',  phone: '+233 24 777 8888', location: 'Sunyani',    membershipId: 'GAF-007', status: 'active',   position: 'Events Coordinator',  department: 'Events',          bio: 'Creative organizer bringing members together through memorable events.',                     joinedAt: new Date('2022-08-15'), lastPayment: new Date('2024-03-08'), image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: '8', name: 'Adwoa Amponsah',   email: 'adwoa.amponsah@email.com', phone: '+233 24 888 9999', location: 'Accra',      membershipId: 'GAF-008', status: 'active',                                                                                                                                                                                            joinedAt: new Date('2023-04-01'), lastPayment: new Date('2024-03-12'), image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop' },
]

const positionOptions = ['Board Chairman','Vice Chairman','Secretary','Assistant Secretary','Treasurer','Financial Secretary','Welfare Officer','Events Coordinator','PRO','Organizing Secretary','Member']
const departmentOptions = ['Executive','Administration','Finance','Welfare','Events','Communications','Technical','General']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'active':   return { label: 'Active',   dot: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }
    case 'inactive': return { label: 'Inactive', dot: 'bg-zinc-400',    badge: 'bg-destructive/10 text-destructive border-destructive/20' }
    case 'pending':  return { label: 'Pending',  dot: 'bg-amber-400',   badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20' }
    default:         return { label: status,     dot: 'bg-zinc-400',    badge: 'bg-muted text-muted-foreground' }
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [members, setMembers]           = useState(mockMembers)
  const [searchQuery, setSearchQuery]   = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode]         = useState<'grid' | 'list'>('grid')

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMember, setEditingMember]     = useState<Member | null>(null)
  const [deletingMember, setDeletingMember]   = useState<Member | null>(null)
  const [memberImage, setMemberImage]         = useState<string>('')

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '',
    position: '', department: '', bio: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
  })

  // ── Derived ──
  const activeCount    = members.filter((m) => m.status === 'active').length
  const inactiveCount  = members.filter((m) => m.status === 'inactive').length
  const executiveCount = members.filter((m) => m.position).length

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase()
    const matchSearch = m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.membershipId.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  // ── Handlers ──
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setMemberImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setFormData({ name: '', email: '', phone: '', location: '', position: '', department: '', bio: '', status: 'active' })
    setMemberImage('')
    setIsAddDialogOpen(true)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member)
    setFormData({ name: member.name, email: member.email, phone: member.phone, location: member.location, position: member.position || '', department: member.department || '', bio: member.bio || '', status: member.status })
    setMemberImage(member.image || '')
    setIsAddDialogOpen(true)
  }

  const handleSaveMember = () => {
    if (editingMember) {
      setMembers(members.map((m) => m.id === editingMember.id ? { ...m, ...formData, image: memberImage || m.image } : m))
    } else {
      setMembers([...members, {
        id: String(Date.now()),
        membershipId: `GAF-${String(members.length + 1).padStart(3, '0')}`,
        ...formData,
        joinedAt: new Date(),
        image: memberImage,
      }])
    }
    setIsAddDialogOpen(false)
  }

  const handleDeleteMember = () => {
    if (deletingMember) {
      setMembers(members.filter((m) => m.id !== deletingMember.id))
      setDeletingMember(null)
    }
  }

  // ── Shared action menu ──
  const MemberActions = ({ member, stopLink = false }: { member: Member; stopLink?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={stopLink ? (e) => e.preventDefault() : undefined}
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border bg-popover">
        <DropdownMenuItem asChild>
          <Link to={`/members/${member.id}`} onClick={(e) => e.stopPropagation()}>
            <Eye className="mr-2 size-4" />View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleEditMember(member) }}>
          <Edit2 className="mr-2 size-4" />Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={(e) => { e.preventDefault(); setDeletingMember(member) }}
        >
          <Trash2 className="mr-2 size-4" />Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <DashboardLayout title="Members Management" breadcrumbs={[{ label: 'Members' }]}>

      {/* ── Stat cards ── */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <Users className="size-6 text-primary" />, bg: 'bg-primary/10', gradient: 'from-primary/5 to-primary/10', value: members.length,  label: 'Total Members' },
          { icon: <UserCheck className="size-6 text-emerald-500" />, bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/5 to-emerald-500/10', value: activeCount, label: 'Active Members' },
          { icon: <Shield className="size-6 text-amber-500" />, bg: 'bg-amber-500/10', gradient: 'from-amber-500/5 to-amber-500/10', value: executiveCount, label: 'With Positions' },
          { icon: <UserX className="size-6 text-destructive" />, bg: 'bg-destructive/10', gradient: 'from-destructive/5 to-destructive/10', value: inactiveCount, label: 'Inactive' },
        ].map((s, i) => (
          <Card key={i} className={cn('relative overflow-hidden border-border bg-gradient-to-br', s.gradient)}>
            <div className="absolute -mr-10 -mt-10 top-0 right-0 size-20 rounded-full bg-white/5" />
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={cn('rounded-xl p-3', s.bg)}>{s.icon}</div>
                <div>
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle — matches gallery pattern */}
          <div className="flex overflow-hidden rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className={cn('size-9 rounded-none', viewMode === 'grid' && 'bg-secondary')}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn('size-9 rounded-none', viewMode === 'list' && 'bg-secondary')}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List className="size-4" />
            </Button>
          </div>

          <Button variant="outline" className="border-border">
            <Download className="mr-2 size-4" />
            Export
          </Button>
          <Button onClick={handleAddMember}>
            <Plus className="mr-2 size-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => {
            const sc = getStatusConfig(member.status)
            return (
              <Link key={member.id} to={`/members/${member.id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  <CardContent className="p-0">
                    {/* Header banner */}
                    <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

                      {/* Actions */}
                      <div className="absolute top-2 right-2">
                        <MemberActions member={member} stopLink />
                      </div>

                      {/* Avatar */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <div className="relative">
                          <Avatar className="size-24 border-4 border-card shadow-xl">
                            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn('absolute bottom-1 right-1 size-4 rounded-full border-2 border-card', sc.dot)} />
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-4 pb-4 pt-14 text-center">
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">{member.name}</h3>
                      <p className="mb-2 text-xs text-muted-foreground">{member.membershipId}</p>

                      {member.position && (
                        <Badge variant="secondary" className="mb-3">
                          <Briefcase className="mr-1 size-3" />{member.position}
                        </Badge>
                      )}

                      <div className="mb-3 flex justify-center">
                        <Badge variant="outline" className={sc.badge}>{sc.label}</Badge>
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center justify-center gap-1.5">
                          <MapPin className="size-3 shrink-0" />{member.location}
                        </p>
                        <p className="flex items-center justify-center gap-1.5">
                          <Clock className="size-3 shrink-0" />Joined {format(member.joinedAt, 'MMM yyyy')}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {member.lastPayment ? `Paid ${format(member.lastPayment, 'MMM d')}` : 'No payment'}
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === 'list' && (
        <Card className="border-border bg-card">
          <CardContent className="p-0">
            {/* Table header */}
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="w-10" />
              <span>Member</span>
              <span className="hidden md:block">Contact</span>
              <span className="hidden lg:block">Location & Joined</span>
              <span>Status</span>
              <span />
            </div>

            <div className="divide-y divide-border">
              {filteredMembers.map((member) => {
                const sc = getStatusConfig(member.status)
                return (
                  <Link
                    key={member.id}
                    to={`/members/${member.id}`}
                    className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/20"
                  >
                    {/* Avatar */}
                    <div className="relative w-10">
                      <Avatar className="size-10 border border-border">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn('absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card', sc.dot)} />
                    </div>

                    {/* Name + ID + position */}
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{member.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{member.membershipId}</span>
                        {member.position && (
                          <span className="hidden items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs sm:flex">
                            <Briefcase className="size-2.5" />{member.position}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="hidden min-w-0 space-y-0.5 md:block">
                      <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                        <Mail className="size-3 shrink-0" />{member.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="size-3 shrink-0" />{member.phone}
                      </p>
                    </div>

                    {/* Location + joined */}
                    <div className="hidden min-w-0 space-y-0.5 lg:block">
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3 shrink-0" />{member.location}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="size-3 shrink-0" />
                        {member.lastPayment ? `Paid ${format(member.lastPayment, 'MMM d, yyyy')}` : `Joined ${format(member.joinedAt, 'MMM yyyy')}`}
                      </p>
                    </div>

                    {/* Status badge */}
                    <Badge variant="outline" className={cn('shrink-0', sc.badge)}>
                      {sc.label}
                    </Badge>

                    {/* Actions */}
                    <div onClick={(e) => e.preventDefault()}>
                      <MemberActions member={member} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Empty state ── */}
      {filteredMembers.length === 0 && (
        <div className="py-16 text-center">
          <Users className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No members found</h3>
          <p className="mb-4 text-muted-foreground">Try adjusting your search or filters</p>
          <Button onClick={handleAddMember}>
            <Plus className="mr-2 size-4" />Add First Member
          </Button>
        </div>
      )}

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
            <DialogDescription>
              {editingMember ? 'Update member information' : 'Fill in the details to add a new member'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Photo upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="size-28 border-4 border-border">
                  <AvatarImage src={memberImage} alt="Member" className="object-cover" />
                  <AvatarFallback className="bg-muted text-2xl">
                    {formData.name ? getInitials(formData.name) : <Users className="size-10 text-muted-foreground" />}
                  </AvatarFallback>
                </Avatar>
                {memberImage && (
                  <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 size-6 rounded-full" onClick={() => setMemberImage('')}>
                    <X className="size-3" />
                  </Button>
                )}
              </div>
              <div>
                <Label htmlFor="member-image" className="cursor-pointer">
                  <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 transition-colors hover:border-primary/50">
                    <Upload className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Photo</span>
                  </div>
                </Label>
                <Input id="member-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>

            {/* Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { id: 'name',     label: 'Full Name *',      placeholder: 'Enter full name',    type: 'text' },
                { id: 'email',    label: 'Email Address *',  placeholder: 'member@email.com',   type: 'email' },
                { id: 'phone',    label: 'Phone Number *',   placeholder: '+233 XX XXX XXXX',   type: 'text' },
                { id: 'location', label: 'Location *',       placeholder: 'City, Region',       type: 'text' },
              ].map((f) => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id}>{f.label}</Label>
                  <Input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.id as keyof typeof formData] as string}
                    onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                    className="border-border bg-background"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label>Position</Label>
                <Select value={formData.position} onValueChange={(v) => setFormData({ ...formData, position: v })}>
                  <SelectTrigger className="border-border bg-background"><SelectValue placeholder="Select position" /></SelectTrigger>
                  <SelectContent>{positionOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger className="border-border bg-background"><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>{departmentOptions.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v: 'active' | 'inactive' | 'pending') => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="border-border bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Bio / About</Label>
                <Textarea
                  placeholder="Brief description about the member…"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="min-h-[100px] border-border bg-background"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveMember} disabled={!formData.name || !formData.email || !formData.phone}>
              {editingMember ? 'Save Changes' : 'Add Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <AlertDialog open={!!deletingMember} onOpenChange={() => setDeletingMember(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {deletingMember?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMember} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </DashboardLayout>
  )
}
