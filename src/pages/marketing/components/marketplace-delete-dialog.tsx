import { Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import type { MarketplaceAd } from '../types/marketplace'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  ad: MarketplaceAd
  onDelete: () => void
}

export function MarketplaceDeleteDialog({
  open,
  onOpenChange,
  ad,
  onDelete,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" />
            Delete Listing
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this listing? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="font-medium">{ad.title}</p>
          <p className="text-sm text-muted-foreground">{ad.category}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}