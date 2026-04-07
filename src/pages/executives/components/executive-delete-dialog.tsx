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
import type { Executive } from '../types/executive'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  executive: Executive
  onDelete: () => void
}

export function ExecutiveDeleteDialog({
  open,
  onOpenChange,
  executive,
  onDelete,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Executive</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {executive.name} from the executives list?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}