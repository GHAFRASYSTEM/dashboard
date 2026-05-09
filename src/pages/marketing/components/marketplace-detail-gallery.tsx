import { ChevronLeft, ChevronRight, Heart, ImageIcon, Share2, Star } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import type { MarketplaceAd } from '../types/marketplace'

interface Props {
  ad: MarketplaceAd
  currentImageIndex: number
  isLiked: boolean
  onLikeToggle: () => void
  onShare: () => void
  onFullscreen: () => void
  onPrev: () => void
  onNext: () => void
  onSelectImage: (index: number) => void
}

export function MarketplaceDetailGallery({
  ad,
  currentImageIndex,
  isLiked,
  onLikeToggle,
  onShare,
  onFullscreen,
  onPrev,
  onNext,
  onSelectImage,
}: Props) {

  return (
    <div className="overflow-hidden rounded-2xl border-border">
      <div className="relative aspect-16/10 bg-muted">
        {ad.images.length > 0 ? (
          <>
            <img
              src={ad.images[currentImageIndex]}
              alt={ad.title}
              className="size-full cursor-pointer object-cover"
              onClick={onFullscreen}
            />

            {ad.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="border-0 bg-amber-500 text-white shadow-lg">
                  <Star className="mr-1 size-3" />
                  Featured
                </Badge>
              </div>
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                onClick={onLikeToggle}
              >
                <Heart className={`size-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>

              <Button
                size="icon"
                variant="secondary"
                className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                onClick={onShare}
              >
                <Share2 className="size-5" />
              </Button>
            </div>

            {ad.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 size-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
                  onClick={onPrev}
                >
                  <ChevronLeft className="size-5" />
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 size-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
                  onClick={onNext}
                >
                  <ChevronRight className="size-5" />
                </Button>

                <div className="absolute bottom-4 left-1/2 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white">
                  {currentImageIndex + 1} / {ad.images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageIcon className="size-16 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {ad.images.length > 1 && (
        <div className="border-t border-border p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {ad.images.map((image, index) => (
              <button
                key={index}
                className={`relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onSelectImage(index)}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}