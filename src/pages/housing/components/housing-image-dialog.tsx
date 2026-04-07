import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
} from '../../../components/ui/dialog'
import type { Housing } from '../types/housing'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  housing: Housing
  currentImageIndex: number
  onPrevImage: () => void
  onNextImage: () => void
}

export function HousingImageDialog({
  open,
  onOpenChange,
  housing,
  currentImageIndex,
  onPrevImage,
  onNextImage,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0">
        <div className="relative aspect-video">
          <img
            src={housing.images[currentImageIndex]}
            alt={`${housing.title} - Image ${currentImageIndex + 1}`}
            className="h-full w-full object-contain"
          />

          {housing.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevImage}
                className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                type="button"
                onClick={onNextImage}
                className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-2 backdrop-blur">
            {currentImageIndex + 1} / {housing.images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}