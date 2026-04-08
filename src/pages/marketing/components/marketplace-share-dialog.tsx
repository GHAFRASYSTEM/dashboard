import { Copy, Link as LinkIcon, Mail } from 'lucide-react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import type { MarketplaceAd } from '../types/marketplace'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  ad: MarketplaceAd
}

export function MarketplaceShareDialog({ open, onOpenChange, ad }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Listing</DialogTitle>
          <DialogDescription>Share this listing with others</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <LinkIcon className="size-4 flex-shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate text-sm">https://marketplace.com/listing/{ad.id}</span>
            <Button size="sm" variant="secondary">
              <Copy className="size-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" className="size-12 rounded-full">
              <FaFacebook className="size-5" />
            </Button>
            <Button variant="outline" size="icon" className="size-12 rounded-full">
              <FaTwitter className="size-5" />
            </Button>
            <Button variant="outline" size="icon" className="size-12 rounded-full">
              <Mail className="size-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}