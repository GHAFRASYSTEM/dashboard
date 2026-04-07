import { format } from 'date-fns'
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
import { Separator } from '../../../components/ui/separator'
import { Textarea } from '../../../components/ui/textarea'
import type { Internship } from '../types/internship'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingInternship: Internship | null
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function InternshipFormDialog({
  open,
  onOpenChange,
  editingInternship,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-border bg-card sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {editingInternship ? 'Edit Internship' : 'Post New Internship'}
          </DialogTitle>
          <DialogDescription>
            {editingInternship
              ? 'Update the internship details below.'
              : 'Fill in the details to post a new internship opportunity.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto">
          <div className="grid gap-4 px-1 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingInternship?.title}
                  placeholder="Software Engineering Intern"
                  className="border-border bg-secondary"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={editingInternship?.company}
                  placeholder="Company Name"
                  className="border-border bg-secondary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={editingInternship?.location}
                  placeholder="City or Remote"
                  className="border-border bg-secondary"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Work Mode *</Label>
                <Select name="type" defaultValue={editingInternship?.type || 'onsite'}>
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contractType">Contract Type *</Label>
                <Select
                  name="contractType"
                  defaultValue={editingInternship?.contractType || 'internship'}
                >
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="fulltime">Permanent Job</SelectItem>
                    <SelectItem value="alternance">Alternance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  defaultValue={editingInternship?.department}
                  placeholder="Engineering"
                  className="border-border bg-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={editingInternship?.duration}
                  placeholder="3 months"
                  className="border-border bg-secondary"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stipend">Stipend</Label>
                <Input
                  id="stipend"
                  name="stipend"
                  defaultValue={editingInternship?.stipend}
                  placeholder="GHS 2,500/month"
                  className="border-border bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  defaultValue={
                    editingInternship?.deadline
                      ? format(editingInternship.deadline, 'yyyy-MM-dd')
                      : ''
                  }
                  className="border-border bg-secondary"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue={editingInternship?.status || 'active'}>
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingInternship?.description}
                placeholder="Describe the role, team, and what the candidate will learn or work on..."
                className="min-h-[100px] border-border bg-secondary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  defaultValue={editingInternship?.responsibilities?.join('\n')}
                  placeholder={'Develop web applications\nCollaborate with team\nWrite documentation'}
                  className="min-h-[100px] border-border bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="requirements">Requirements (one per line) *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  defaultValue={editingInternship?.requirements?.join('\n')}
                  placeholder={'Computer Science student\nJavaScript knowledge\nProblem-solving skills'}
                  className="min-h-[100px] border-border bg-secondary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  defaultValue={editingInternship?.benefits?.join('\n')}
                  placeholder={'Competitive stipend\nFlexible hours\nCertificate'}
                  className="min-h-[80px] border-border bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  defaultValue={editingInternship?.skills?.join(', ')}
                  placeholder="JavaScript, React, Node.js, Git"
                  className="min-h-[80px] border-border bg-secondary"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  defaultValue={editingInternship?.contactEmail}
                  placeholder="careers@company.com"
                  className="border-border bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  defaultValue={editingInternship?.contactPhone}
                  placeholder="+233 20 123 4567"
                  className="border-border bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={editingInternship?.website}
                  placeholder="https://company.com"
                  className="border-border bg-secondary"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 mt-4 border-t border-border bg-card pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {editingInternship ? 'Save Changes' : 'Post Internship'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}