import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  currentImageIndex: number
  onPrev: () => void
  onNext: () => void
  onSelectImage: (index: number) => void
}

export function MarketplaceFullscreenDialog({
  open,
  onOpenChange,
  ad,
  currentImageIndex,
  onPrev,
  onNext,
  onSelectImage,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] border-0 bg-black/95 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{ad.title} - Image Gallery</DialogTitle>
          <DialogDescription>Full screen image view</DialogDescription>
        </DialogHeader>

        <div className="relative flex h-[90vh] w-full items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-6" />
          </Button>

          <img
            src={ad.images[currentImageIndex]}
            alt={ad.title}
            className="max-h-full max-w-full object-contain"
          />

          {ad.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 size-12 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={onPrev}
              >
                <ChevronLeft className="size-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 size-12 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={onNext}
              >
                <ChevronRight className="size-8" />
              </Button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {ad.images.map((_, index) => (
                  <button
                    key={index}
                    className={`size-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => onSelectImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}