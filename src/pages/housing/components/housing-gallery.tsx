import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { cn } from '../../../lib/utils'
import type { Housing } from '../types/housing'
import { statusColors } from '../utils/housing-config'

interface Props {
  housing: Housing
  currentImageIndex: number
  isFavorite: boolean
  onToggleFavorite: () => void
  onOpenImageModal: () => void
  onPrevImage: () => void
  onNextImage: () => void
  onSelectImage: (index: number) => void
}

export function HousingGallery({
  housing,
  currentImageIndex,
  isFavorite,
  onToggleFavorite,
  onOpenImageModal,
  onPrevImage,
  onNextImage,
  onSelectImage,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-muted">
      <div className="relative aspect-[16/10] cursor-pointer" onClick={onOpenImageModal}>
        <img
          src={housing.images[currentImageIndex]}
          alt={`${housing.title} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

        <div className="absolute left-4 top-4">
          <Badge
            variant="outline"
            className={cn('border px-3 py-1 text-sm capitalize', statusColors[housing.status])}
          >
            {housing.status}
          </Badge>
        </div>

        <div className="absolute right-4 top-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
          >
            <Heart className={cn('size-5', isFavorite && 'fill-red-500 text-red-500')} />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="size-5" />
          </Button>
        </div>

        {housing.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onPrevImage()
              }}
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNextImage()
              }}
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur">
          {currentImageIndex + 1} / {housing.images.length}
        </div>
      </div>

      {housing.images.length > 1 && (
        <div className="flex gap-2 p-3">
          {housing.images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelectImage(index)}
              className={cn(
                'relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all',
                currentImageIndex === index
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              )}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}