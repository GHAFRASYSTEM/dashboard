'use client'

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Separator } from '../../components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Edit,
  Trash2,
  Send,
  Share2,
  Globe,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Building,
  GraduationCap,
  Heart,
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../../lib/utils'

interface Executive {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  bio: string
  fullBio: string
  image?: string
  status: 'active' | 'inactive'
  joinedAt: Date
  location: string
  education: string
  achievements: string[]
  responsibilities: string[]
  socialLinks: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  yearsOfService: number
  projectsLed: number
  teamMembers: number
}

const mockExecutives: Executive[] = [
  {
    id: '1',
    name: 'Dr. James Mensah',
    position: 'President',
    department: 'Executive Board',
    email: 'president@gafra.org',
    phone: '+233 24 123 4567',
    bio: 'Leading the organization since 2020 with a vision for community growth...',
    fullBio: `Dr. James Mensah is a distinguished leader with over 20 years of experience in community development and organizational management. He has been instrumental in transforming GAFRA into a leading community organization.

His leadership style emphasizes collaboration, transparency, and sustainable growth. Under his guidance, the organization has achieved remarkable milestones including expanding membership by 150%, launching 5 major community initiatives, and establishing partnerships with international organizations.

Dr. Mensah holds a PhD in Community Development from the University of Ghana and has served on various national committees for community welfare. His vision for GAFRA is to create a self-sustaining community that empowers every member to achieve their full potential.`,
    status: 'active',
    joinedAt: new Date('2020-01-15'),
    location: 'Accra, Ghana',
    education: 'PhD in Community Development, University of Ghana',
    achievements: [
      'Expanded organization membership by 150%',
      'Launched 5 major community initiatives',
      'Established international partnerships',
      'Received Community Leadership Award 2023',
      'Published research on sustainable community development'
    ],
    responsibilities: [
      'Oversee all organizational operations and strategic direction',
      'Chair executive board meetings and general assemblies',
      'Represent the organization in external engagements',
      'Ensure compliance with organizational policies',
      'Lead fundraising and partnership development efforts'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/jmensah',
      linkedin: 'https://linkedin.com/in/jmensah',
      website: 'https://jmensah.com'
    },
    yearsOfService: 6,
    projectsLed: 12,
    teamMembers: 45
  },
  {
    id: '2',
    name: 'Mrs. Grace Osei',
    position: 'Vice President',
    department: 'Executive Board',
    email: 'vp@gafra.org',
    phone: '+233 24 234 5678',
    bio: 'Dedicated to member welfare and community development programs...',
    fullBio: `Mrs. Grace Osei brings a wealth of experience in social work and community engagement to her role as Vice President. Her dedication to member welfare has been the cornerstone of many successful programs within GAFRA.

With a background in social work and public administration, Grace has spearheaded numerous initiatives focused on education, health, and economic empowerment. She is particularly passionate about women and youth development programs.

Her approach to leadership is centered on empathy, active listening, and creating inclusive spaces for all community members to thrive.`,
    status: 'active',
    joinedAt: new Date('2020-01-15'),
    location: 'Accra, Ghana',
    education: 'Masters in Social Work, University of Cape Coast',
    achievements: [
      'Established the Women Empowerment Program',
      'Launched youth mentorship initiative',
      'Coordinated 20+ community outreach events',
      'Received Social Impact Award 2022'
    ],
    responsibilities: [
      'Support the President in organizational leadership',
      'Oversee member welfare and support programs',
      'Coordinate community development initiatives',
      'Lead the membership engagement committee'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/graceosei'
    },
    yearsOfService: 6,
    projectsLed: 8,
    teamMembers: 20
  },
  {
    id: '3',
    name: 'Mr. Kofi Asante',
    position: 'General Secretary',
    department: 'Administration',
    email: 'secretary@gafra.org',
    phone: '+233 24 345 6789',
    bio: 'Managing organizational records and communications...',
    fullBio: `Mr. Kofi Asante serves as the General Secretary, ensuring smooth administrative operations and effective communication across all levels of the organization.

With his meticulous attention to detail and organizational skills, Kofi has transformed the administrative processes, implementing digital record-keeping systems and streamlined communication channels.

He believes in transparency and accessibility, making sure all members are well-informed about organizational activities and decisions.`,
    status: 'active',
    joinedAt: new Date('2021-03-20'),
    location: 'Tema, Ghana',
    education: 'Bachelor in Business Administration, GIMPA',
    achievements: [
      'Implemented digital record management system',
      'Improved member communication efficiency by 80%',
      'Organized 15+ successful general meetings'
    ],
    responsibilities: [
      'Maintain organizational records and documentation',
      'Coordinate internal and external communications',
      'Organize meetings and prepare minutes',
      'Manage correspondence and official documents'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/kofiasante'
    },
    yearsOfService: 5,
    projectsLed: 5,
    teamMembers: 8
  },
  {
    id: '4',
    name: 'Mrs. Ama Boateng',
    position: 'Treasurer',
    department: 'Finance',
    email: 'treasurer@gafra.org',
    phone: '+233 24 456 7890',
    bio: 'Overseeing financial operations and member contributions...',
    fullBio: `Mrs. Ama Boateng manages the financial health of GAFRA with exceptional expertise and integrity. Her financial acumen has ensured the organization maintains strong fiscal responsibility.

As a certified accountant with experience in both corporate and non-profit sectors, Ama has implemented robust financial systems that ensure transparency and accountability in all financial matters.

She is committed to maximizing the impact of every contribution made by members, ensuring funds are utilized effectively for community benefit.`,
    status: 'active',
    joinedAt: new Date('2021-03-20'),
    location: 'Accra, Ghana',
    education: 'Chartered Accountant (ICAG), MBA Finance',
    achievements: [
      'Achieved 100% financial audit compliance',
      'Increased organizational savings by 40%',
      'Implemented transparent financial reporting system',
      'Secured 3 major grants for community projects'
    ],
    responsibilities: [
      'Manage all financial operations and budgets',
      'Oversee member dues and contributions',
      'Prepare financial reports and statements',
      'Ensure compliance with financial regulations'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amaboateng'
    },
    yearsOfService: 5,
    projectsLed: 4,
    teamMembers: 6
  },
  {
    id: '5',
    name: 'Mr. Kwame Adjei',
    position: 'Organizing Secretary',
    department: 'Events & Activities',
    email: 'organizing@gafra.org',
    phone: '+233 24 567 8901',
    bio: 'Coordinating events and member activities...',
    fullBio: `Mr. Kwame Adjei brings energy and creativity to his role as Organizing Secretary. He is responsible for planning and executing all organizational events and activities.

With a background in event management and community organizing, Kwame has successfully coordinated numerous memorable events that have strengthened community bonds and increased member engagement.

His innovative approach to event planning ensures each gathering is meaningful, well-organized, and leaves lasting positive impressions.`,
    status: 'active',
    joinedAt: new Date('2022-01-10'),
    location: 'Kumasi, Ghana',
    education: 'Diploma in Event Management, BlueCrest College',
    achievements: [
      'Organized 30+ successful community events',
      'Increased event attendance by 200%',
      'Launched annual community festival',
      'Created volunteer engagement program'
    ],
    responsibilities: [
      'Plan and coordinate all organizational events',
      'Manage event logistics and vendors',
      'Coordinate volunteer activities',
      'Develop annual events calendar'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/kwameadjei'
    },
    yearsOfService: 4,
    projectsLed: 30,
    teamMembers: 15
  },
  {
    id: '6',
    name: 'Ms. Efua Mensah',
    position: 'PRO',
    department: 'Communications',
    email: 'pro@gafra.org',
    phone: '+233 24 678 9012',
    bio: 'Managing public relations and media communications...',
    fullBio: `Ms. Efua Mensah serves as the Public Relations Officer, managing the organization's public image and communications strategy. Her expertise in media relations has significantly raised GAFRA's profile.

With a journalism background and experience in corporate communications, Efua has built strong relationships with media outlets and developed effective communication strategies that keep both members and the public well-informed.

She is passionate about storytelling and uses various platforms to share the impact and stories of GAFRA's community work.`,
    status: 'active',
    joinedAt: new Date('2022-01-10'),
    location: 'Accra, Ghana',
    education: 'Bachelor in Mass Communication, GIJ',
    achievements: [
      'Increased social media following by 500%',
      'Secured 20+ media features for the organization',
      'Launched organizational newsletter',
      'Developed brand guidelines and materials'
    ],
    responsibilities: [
      'Manage public relations and media engagement',
      'Develop and implement communication strategies',
      'Handle social media and digital presence',
      'Coordinate press releases and media coverage'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/efuamensah',
      linkedin: 'https://linkedin.com/in/efuamensah',
      website: 'https://efuamensah.com'
    },
    yearsOfService: 4,
    projectsLed: 15,
    teamMembers: 10
  },
]

export default function ExecutiveDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)

  const executive = mockExecutives.find((e) => e.id === params.id)

  if (!executive) {
    return (
      <DashboardLayout title="Executive Not Found" breadcrumbs={[{ label: 'Executives', href: '/executives' }, { label: 'Not Found' }]}>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="size-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Executive Not Found</h2>
          <p className="text-muted-foreground mb-6">The executive you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link to="/executives">
              <ArrowLeft className="size-4 mr-2" />
              Back to Executives
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    navigate('/executives')
  }

  return (
    <DashboardLayout
      title={executive.name}
      breadcrumbs={[{ label: 'Executives', href: '/executives' }, { label: executive.name }]}
    >
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/executives">
            <ArrowLeft className="size-4 mr-2" />
            Back to Executives
          </Link>
        </Button>

        <Card className="overflow-hidden border-border">
          <div className="relative h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
                className="bg-background/80 backdrop-blur-sm"
              >
                <Edit className="size-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="bg-background/80 backdrop-blur-sm text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="-mt-16 relative z-10">
                <Avatar className="size-32 border-4 border-background shadow-xl">
                  <AvatarImage src={executive.image} alt={executive.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                    {getInitials(executive.name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'absolute bottom-2 right-2 size-4 rounded-full border-2 border-background',
                    executive.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
                  )}
                />
              </div>

              <div className="flex-1 pt-4 md:pt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold">{executive.name}</h1>
                      <Badge
                        variant="secondary"
                        className={cn(
                          executive.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {executive.status === 'active' ? (
                          <CheckCircle2 className="size-3 mr-1" />
                        ) : null}
                        {executive.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-primary font-medium">{executive.position}</p>
                    <p className="text-muted-foreground">{executive.department}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={() => setIsContactDialogOpen(true)}>
                      <Send className="size-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:${executive.phone}`}>
                        <Phone className="size-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{executive.yearsOfService}</p>
                    <p className="text-sm text-muted-foreground">Years of Service</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{executive.projectsLed}</p>
                    <p className="text-sm text-muted-foreground">Projects Led</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{executive.teamMembers}</p>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="size-5 text-primary" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground">
                  {executive.fullBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="size-5 text-primary" />
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {executive.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="size-5 text-primary" />
                  Achievements & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {executive.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
                    >
                      <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                        <CheckCircle2 className="size-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${executive.email}`}
                      className="text-sm font-medium hover:text-primary transition-colors truncate block"
                    >
                      {executive.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${executive.phone}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {executive.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{executive.location}</p>
                  </div>
                </div>

                <Separator />

                {(executive.socialLinks.twitter || executive.socialLinks.linkedin || executive.socialLinks.website) && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Social Links</p>
                    <div className="flex items-center gap-2">
                      {executive.socialLinks.twitter && (
                        <Button variant="outline" size="icon" asChild className="size-9">
                          <a href={executive.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Share2 className="size-4" />
                          </a>
                        </Button>
                      )}
                      {executive.socialLinks.linkedin && (
                        <Button variant="outline" size="icon" asChild className="size-9">
                          <a href={executive.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Briefcase className="size-4" />
                          </a>
                        </Button>
                      )}
                      {executive.socialLinks.website && (
                        <Button variant="outline" size="icon" asChild className="size-9">
                          <a href={executive.socialLinks.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="size-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Building className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{executive.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <GraduationCap className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="text-sm font-medium">{executive.education}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Calendar className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-medium">{format(executive.joinedAt, 'MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Clock className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tenure</p>
                    <p className="text-sm font-medium">{executive.yearsOfService} years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {executive.name}</DialogTitle>
            <DialogDescription>
              Send a direct message to the {executive.position}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter subject..." className="bg-secondary" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="bg-secondary min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsContactDialogOpen(false)}>
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Executive</DialogTitle>
            <DialogDescription>Update executive details and information.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsEditDialogOpen(false)
            }}
          >
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    defaultValue={executive.name}
                    className="bg-secondary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    id="edit-position"
                    defaultValue={executive.position}
                    className="bg-secondary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={executive.email}
                    className="bg-secondary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    defaultValue={executive.phone}
                    className="bg-secondary"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  defaultValue={executive.fullBio}
                  className="bg-secondary min-h-[150px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={executive.status}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Executive</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {executive.name} from the executives list? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="size-4 mr-2" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}