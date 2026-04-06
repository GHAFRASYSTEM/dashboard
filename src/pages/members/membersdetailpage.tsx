'use client'

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'
import { format, formatDistanceToNow } from 'date-fns'
import {
  ArrowLeft,
  Mail,
  Phone,
  Edit2,
  Trash2,
  MessageSquare,
  Briefcase,
  Building,
  Clock,
  CreditCard,
  FileText,
  Users,
  Upload,
  X,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Wallet,
  Receipt,
  Send
} from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  phone: string
  location: string
  address?: string
  membershipId: string
  status: 'active' | 'inactive' | 'pending'
  position?: string
  department?: string
  bio?: string
  joinedAt: Date
  lastPayment?: Date
  image?: string
  dateOfBirth?: Date
  occupation?: string
  employer?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

interface Contribution {
  id: string
  type: string
  amount: number
  date: Date
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

interface Activity {
  id: string
  action: string
  description: string
  date: Date
}

const mockMember: Member = {
  id: '1',
  name: 'Kwame Asante',
  email: 'kwame.asante@email.com',
  phone: '+233 24 111 2222',
  location: 'Accra',
  address: '123 Independence Avenue, East Legon, Accra',
  membershipId: 'GAF-001',
  status: 'active',
  position: 'Board Chairman',
  department: 'Executive',
  bio: 'Kwame Asante is a seasoned professional with over 15 years of experience in community development and organizational management. He has been instrumental in driving key initiatives that have transformed the association into a thriving community of professionals.\n\nHis leadership style emphasizes collaboration, transparency, and innovation. Under his guidance, the association has achieved significant milestones including expanding membership, improving financial health, and launching several community outreach programs.',
  joinedAt: new Date('2022-01-15'),
  lastPayment: new Date('2024-03-01'),
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  dateOfBirth: new Date('1985-06-15'),
  occupation: 'Business Consultant',
  employer: 'Asante Consulting Group',
  emergencyContact: {
    name: 'Akua Asante',
    phone: '+233 24 999 8888',
    relationship: 'Spouse'
  }
}

const mockContributions: Contribution[] = [
  { id: '1', type: 'Monthly Dues', amount: 100, date: new Date('2024-03-01'), status: 'completed', reference: 'TXN-001234' },
  { id: '2', type: 'Special Levy', amount: 500, date: new Date('2024-02-15'), status: 'completed', reference: 'TXN-001189' },
  { id: '3', type: 'Monthly Dues', amount: 100, date: new Date('2024-02-01'), status: 'completed', reference: 'TXN-001156' },
  { id: '4', type: 'Annual Contribution', amount: 1200, date: new Date('2024-01-15'), status: 'completed', reference: 'TXN-001098' },
  { id: '5', type: 'Monthly Dues', amount: 100, date: new Date('2024-01-01'), status: 'completed', reference: 'TXN-001045' },
  { id: '6', type: 'Welfare Fund', amount: 200, date: new Date('2023-12-20'), status: 'completed', reference: 'TXN-000987' },
]

const mockActivities: Activity[] = [
  { id: '1', action: 'Payment Received', description: 'Monthly dues payment of GHS 100', date: new Date('2024-03-01') },
  { id: '2', action: 'Profile Updated', description: 'Updated contact information', date: new Date('2024-02-28') },
  { id: '3', action: 'Event Attended', description: 'Annual General Meeting 2024', date: new Date('2024-02-20') },
  { id: '4', action: 'Payment Received', description: 'Special levy payment of GHS 500', date: new Date('2024-02-15') },
  { id: '5', action: 'Document Uploaded', description: 'Submitted ID verification', date: new Date('2024-02-10') },
]

const positionOptions = [
  'Board Chairman',
  'Vice Chairman',
  'Secretary',
  'Assistant Secretary',
  'Treasurer',
  'Financial Secretary',
  'Welfare Officer',
  'Events Coordinator',
  'PRO',
  'Organizing Secretary',
  'Member'
]

const departmentOptions = [
  'Executive',
  'Administration',
  'Finance',
  'Welfare',
  'Events',
  'Communications',
  'Technical',
  'General'
]

export default function MemberDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [member, setMember] = useState<Member>(mockMember)
  const [contributions] = useState<Contribution[]>(mockContributions)
  const [activities] = useState<Activity[]>(mockActivities)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [memberImage, setMemberImage] = useState(member.image || '')
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    phone: member.phone,
    location: member.location,
    address: member.address || '',
    position: member.position || '',
    department: member.department || '',
    bio: member.bio || '',
    occupation: member.occupation || '',
    employer: member.employer || '',
    status: member.status
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Active', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }
      case 'inactive':
        return { label: 'Inactive', className: 'bg-destructive/10 text-destructive border-destructive/20' }
      case 'pending':
        return { label: 'Pending', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' }
      default:
        return { label: status, className: 'bg-muted text-muted-foreground' }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMemberImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setMember({ ...member, ...formData, image: memberImage })
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    navigate('/members')
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.membershipId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalContributions = contributions.reduce((sum, c) => c.status === 'completed' ? sum + c.amount : sum, 0)
  const statusConfig = getStatusConfig(member.status)
  const tenure = formatDistanceToNow(member.joinedAt, { addSuffix: false })

  return (
    <DashboardLayout
      title="Member Profile"
      breadcrumbs={[
        { label: 'Members', href: '/members' },
        { label: member.name }
      ]}
    >
      <div className="mb-6">
        <Link to="/members">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Members
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-border">
            <div className="relative h-40 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,119,198,0.1),transparent)]" />
            </div>
            <CardContent className="relative pt-0 pb-6">
              <div className="absolute -top-16 left-6">
                <div className="relative">
                  <Avatar className="size-32 border-4 border-card shadow-xl">
                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-2 right-2 size-5 rounded-full border-2 border-card ${
                    member.status === 'active' ? 'bg-emerald-500' :
                    member.status === 'pending' ? 'bg-amber-500' : 'bg-muted-foreground'
                  }`} />
                </div>
              </div>

              <div className="flex justify-end gap-2 mb-8">
                <Button variant="outline" size="sm" onClick={() => setIsMessageDialogOpen(true)}>
                  <MessageSquare className="size-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                  <Edit2 className="size-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="size-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{member.name}</h1>
                  <Badge variant="outline" className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <button
                    onClick={handleCopyId}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                    <span>{member.membershipId}</span>
                  </button>
                  {member.position && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3" />
                      {member.position}
                    </span>
                  )}
                  {member.department && (
                    <span className="flex items-center gap-1">
                      <Building className="size-3" />
                      {member.department}
                    </span>
                  )}
                </div>

                {member.bio && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="contributions" className="space-y-4">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="contributions" className="gap-2">
                <CreditCard className="size-4" />
                Contributions
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Clock className="size-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="size-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contributions">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Payment History</CardTitle>
                  <Button size="sm">
                    <Receipt className="size-4 mr-2" />
                    Record Payment
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contributions.map((contribution) => (
                      <div
                        key={contribution.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            contribution.status === 'completed' ? 'bg-emerald-500/10' :
                            contribution.status === 'pending' ? 'bg-amber-500/10' : 'bg-destructive/10'
                          }`}>
                            <Wallet className={`size-5 ${
                              contribution.status === 'completed' ? 'text-emerald-500' :
                              contribution.status === 'pending' ? 'text-amber-500' : 'text-destructive'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{contribution.type}</p>
                            <p className="text-sm text-muted-foreground">{contribution.reference}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">GHS {contribution.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{format(contribution.date, 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-6">
                      {activities.map((activity, index) => (
                        <div key={activity.id} className="relative pl-10">
                          <div className={`absolute left-2.5 size-3 rounded-full border-2 border-card ${
                            index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                          }`} />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {format(activity.date, 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <Button size="sm" variant="outline">
                    <Upload className="size-4 mr-2" />
                    Upload
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
                    <p className="text-muted-foreground mb-4">Upload member documents like ID, certificates, etc.</p>
                    <Button variant="outline">
                      <Upload className="size-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Total Contributions</span>
                <span className="font-semibold">GHS {totalContributions.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold">{tenure}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Last Payment</span>
                <span className="font-semibold">
                  {member.lastPayment ? format(member.lastPayment, 'MMM d, yyyy') : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Transactions</span>
                <span className="font-semibold">{contributions.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{member.email}</p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </a>

              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Phone className="size-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{member.phone}</p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <span className="text-amber-500 text-sm font-semibold">L</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{member.location}</p>
                  {member.address && (
                    <p className="text-sm text-muted-foreground mt-1">{member.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.dateOfBirth && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date of Birth</span>
                  <span className="font-medium">{format(member.dateOfBirth, 'MMM d, yyyy')}</span>
                </div>
              )}
              {member.occupation && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Occupation</span>
                  <span className="font-medium">{member.occupation}</span>
                </div>
              )}
              {member.employer && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Employer</span>
                  <span className="font-medium">{member.employer}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Joined</span>
                <span className="font-medium">{format(member.joinedAt, 'MMMM d, yyyy')}</span>
              </div>
            </CardContent>
          </Card>

          {member.emergencyContact && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="font-medium">{member.emergencyContact.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Relationship</span>
                    <span className="font-medium">{member.emergencyContact.relationship}</span>
                  </div>
                  <a
                    href={`tel:${member.emergencyContact.phone}`}
                    className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="font-medium text-primary">{member.emergencyContact.phone}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Update member information</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="size-28 border-4 border-border">
                  <AvatarImage src={memberImage} alt="Member" className="object-cover" />
                  <AvatarFallback className="bg-muted text-2xl">
                    {formData.name ? getInitials(formData.name) : <Users className="size-10 text-muted-foreground" />}
                  </AvatarFallback>
                </Avatar>
                {memberImage && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 size-6 rounded-full"
                    onClick={() => setMemberImage('')}
                  >
                    <X className="size-3" />
                  </Button>
                )}
              </div>
              <div>
                <Label htmlFor="edit-member-image" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border hover:border-primary/50 transition-colors">
                    <Upload className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Change Photo</span>
                  </div>
                </Label>
                <Input
                  id="edit-member-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="edit-address">Full Address</Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Select value={formData.position} onValueChange={(v) => setFormData({ ...formData, position: v })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-occupation">Occupation</Label>
                <Input
                  id="edit-occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employer">Employer</Label>
                <Input
                  id="edit-employer"
                  value={formData.employer}
                  onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(v: 'active' | 'inactive' | 'pending') => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-background border-border min-h-[120px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>Send a message to {member.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Avatar className="size-10">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background border-border min-h-[150px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setMessage(''); setIsMessageDialogOpen(false) }}>
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {member.name}? This will permanently delete their profile and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}