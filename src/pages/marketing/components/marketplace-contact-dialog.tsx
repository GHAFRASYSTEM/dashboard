import { Send } from 'lucide-react'
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
import { Textarea } from '../../../components/ui/textarea'
import type { MarketplaceAd } from '../types/marketplace'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  ad: MarketplaceAd
  message: string
  onMessageChange: (value: string) => void
}

export function MarketplaceContactDialog({
  open,
  onOpenChange,
  ad,
  message,
  onMessageChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>Send a message to {ad.submittedBy}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Avatar className="size-10">
              <AvatarImage src={ad.avatar} />
              <AvatarFallback>{ad.submittedBy[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{ad.submittedBy}</p>
              <p className="text-sm text-muted-foreground">Usually responds within 1 hour</p>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="mb-1 text-sm font-medium">Regarding:</p>
            <p className="text-sm text-muted-foreground">{ad.title}</p>
          </div>

          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[120px] border-border bg-background"
          />
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