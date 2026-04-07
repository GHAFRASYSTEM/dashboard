import { Send } from 'lucide-react'
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
import { Textarea } from '../../../components/ui/textarea'
import type { Executive } from '../types/executive'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  executive: Executive
}

export function ExecutiveContactDialog({
  open,
  onOpenChange,
  executive,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              className="min-h-[120px] bg-secondary"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            <Send className="mr-2 size-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}