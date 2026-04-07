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
import type { Housing } from '../types/housing'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  housing: Housing
}

export function HousingContactDialog({ open, onOpenChange, housing }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Agent</DialogTitle>
          <DialogDescription>
            Send a message to {housing.contactName} about {housing.title}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onOpenChange(false)
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Your Phone</Label>
            <Input id="phone" placeholder="(555) 123-4567" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="I'm interested in this property..."
              defaultValue={`Hi, I'm interested in the ${housing.title} listed at $${housing.price.toLocaleString()}/month. Please contact me with more information.`}
              className="min-h-[120px]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}