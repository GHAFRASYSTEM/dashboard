import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'
import { Upload, Users, X } from 'lucide-react'
import { departmentOptions, positionOptions } from '../data/mock-members'
import { getInitials } from '../utils/member-utils'

interface MemberEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    name: string
    email: string
    phone: string
    location: string
    address: string
    position: string
    department: string
    bio: string
    occupation: string
    employer: string
    status: 'active' | 'inactive' | 'pending'
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  memberImage: string
  setMemberImage: (value: string) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
}

export function MemberEditDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  memberImage,
  setMemberImage,
  onImageUpload,
  onSave,
}: MemberEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  {formData.name ? (
                    getInitials(formData.name)
                  ) : (
                    <Users className="size-10 text-muted-foreground" />
                  )}
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
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 transition-colors hover:border-primary/50">
                  <Upload className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Change Photo</span>
                </div>
              </Label>

              <Input
                id="edit-member-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageUpload}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, location: e.target.value }))
                }
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-address">Full Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, address: e.target.value }))
                }
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Select
                value={formData.position}
                onValueChange={(v) => setFormData((prev: any) => ({ ...prev, position: v }))}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(v) =>
                  setFormData((prev: any) => ({ ...prev, department: v }))
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-occupation">Occupation</Label>
              <Input
                id="edit-occupation"
                value={formData.occupation}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, occupation: e.target.value }))
                }
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-employer">Employer</Label>
              <Input
                id="edit-employer"
                value={formData.employer}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, employer: e.target.value }))
                }
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v: 'active' | 'inactive' | 'pending') =>
                  setFormData((prev: any) => ({ ...prev, status: v }))
                }
              >
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
                onChange={(e) => setFormData((prev: any) => ({ ...prev, bio: e.target.value }))}
                className="bg-background border-border min-h-[120px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}