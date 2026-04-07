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
import type { Executive } from '../types/executive'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingExecutive: Executive | null
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function ExecutiveFormDialog({
  open,
  onOpenChange,
  editingExecutive,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingExecutive ? 'Edit Executive' : 'Add New Executive'}
          </DialogTitle>
          <DialogDescription>
            {editingExecutive
              ? 'Update executive details and information.'
              : 'Fill in the details to add a new executive member.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="grid max-h-[60vh] gap-4 overflow-y-auto py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingExecutive?.name}
                  placeholder="Dr. John Doe"
                  className="border-border bg-secondary"
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
                  className="border-border bg-secondary"
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
                  className="border-border bg-secondary"
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
                  className="border-border bg-secondary"
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
                className="min-h-[100px] border-border bg-secondary"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={editingExecutive?.status || 'active'}>
                <SelectTrigger className="border-border bg-secondary">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingExecutive ? 'Save Changes' : 'Add Executive'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}