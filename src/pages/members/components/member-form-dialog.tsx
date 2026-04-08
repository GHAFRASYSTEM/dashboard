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

interface MemberFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingMember: boolean
  formData: {
    name: string
    email: string
    phone: string
    location: string
    position: string
    department: string
    bio: string
    status: 'active' | 'inactive' | 'pending'
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  memberImage: string
  setMemberImage: (value: string) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
}

export function MemberFormDialog({
  open,
  onOpenChange,
  editingMember,
  formData,
  setFormData,
  memberImage,
  setMemberImage,
  onImageUpload,
  onSave,
}: MemberFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogDescription>
            {editingMember ? 'Update member information' : 'Fill in the details to add a new member'}
          </DialogDescription>
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
              <Label htmlFor="member-image" className="cursor-pointer">
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 transition-colors hover:border-primary/50">
                  <Upload className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Photo</span>
                </div>
              </Label>
              <Input
                id="member-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageUpload}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: 'name', label: 'Full Name *', type: 'text' },
              { id: 'email', label: 'Email Address *', type: 'email' },
              { id: 'phone', label: 'Phone Number *', type: 'text' },
              { id: 'location', label: 'Location *', type: 'text' },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id as keyof typeof formData] as string}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, [field.id]: e.target.value }))}
                  className="border-border bg-background"
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={formData.position}
                onValueChange={(v) => setFormData((prev: any) => ({ ...prev, position: v }))}
              >
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={formData.department}
                onValueChange={(v) => setFormData((prev: any) => ({ ...prev, department: v }))}
              >
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v: 'active' | 'inactive' | 'pending') =>
                  setFormData((prev: any) => ({ ...prev, status: v }))
                }
              >
                <SelectTrigger className="border-border bg-background">
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
              <Label>Bio / About</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, bio: e.target.value }))}
                className="min-h-[100px] border-border bg-background"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!formData.name || !formData.email || !formData.phone}>
            {editingMember ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}