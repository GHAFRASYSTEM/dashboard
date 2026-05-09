import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Button } from '../../../components/ui/button'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '../../../components/ui/select'
import { Upload, Users, X } from 'lucide-react'
import { getInitials } from '../utils/member-utils'

const OCCUPATION_OPTIONS = [
  'Student', 'Intern', 'Trainee',
  'Nurse', 'Doctor', 'Dentist', 'Pharmacist', 'Midwife',
  'Developer', 'Software Engineer', 'Data Scientist', 'Cybersecurity Specialist', 'IT Support',
  'Accountant', 'Manager', 'Consultant', 'HR', 'Administrator',
  'Designer', 'Photographer', 'Videographer', 'Journalist',
  'Driver', 'Chef', 'Mechanic', 'Electrician', 'Plumber',
  'Lawyer', 'Architect', 'Entrepreneur', 'Social Worker',
  'Other',
]

interface MemberEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    name: string
    email: string
    ghana_phone: string
    french_phone: string
    city: string
    region: string
    gender: string
    occupation: string
    role: string
    member_type: string
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  memberImage: string
  setMemberImage: (value: string) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
}

export function MemberEditDialog({
  open, onOpenChange,
  formData, setFormData,
  memberImage, setMemberImage,
  onImageUpload, onSave,
}: MemberEditDialogProps) {
  const field = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev: any) => ({ ...prev, [key]: e.target.value }))

  const select = (key: string) => (v: string) =>
    setFormData((prev: any) => ({ ...prev, [key]: v }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>Update member information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar */}
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
                  variant="destructive" size="icon"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={() => setMemberImage('')}
                >
                  <X className="size-3" />
                </Button>
              )}
            </div>
            <Label htmlFor="edit-member-image" className="cursor-pointer">
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 transition-colors hover:border-primary/50">
                <Upload className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Change Photo</span>
              </div>
            </Label>
            <Input id="edit-member-image" type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={formData.name} onChange={field('name')} className="bg-background border-border" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={field('email')} className="bg-background border-border" />
            </div>

            {/* Ghana Phone */}
            <div className="space-y-2">
              <Label>🇬🇭 Ghana Phone</Label>
              <Input value={formData.ghana_phone} onChange={field('ghana_phone')} className="bg-background border-border" />
            </div>

            {/* French Phone */}
            <div className="space-y-2">
              <Label>🇫🇷 French Phone</Label>
              <Input value={formData.french_phone} onChange={field('french_phone')} className="bg-background border-border" />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={formData.city} onChange={field('city')} className="bg-background border-border" />
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={formData.region} onValueChange={select('region')}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {['Accra', 'Kumasi', 'Tamale', 'Sunyani'].map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={select('gender')}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label>Occupation</Label>
              <Select value={formData.occupation} onValueChange={select('occupation')}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPATION_OPTIONS.map(o => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={select('role')}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Member type */}
            <div className="space-y-2">
              <Label>Member Type</Label>
              <Select value={formData.member_type} onValueChange={select('member_type')}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                  <SelectItem value="honorary">Honorary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}