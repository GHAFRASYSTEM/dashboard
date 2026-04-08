import { ImageIcon } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import type { MarketplaceAd } from '../types/marketplace'
import { formatMarketplacePrice } from '../utils/marketplace-helpers'

interface Props {
  ads: MarketplaceAd[]
  onOpen: (ad: MarketplaceAd) => void
}

export function MarketplaceRelatedAds({ ads, onOpen }: Props) {
  if (ads.length === 0) return null

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Related Listings</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {ads.map((ad) => (
          <Card
            key={ad.id}
            className="group cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30"
            onClick={() => onOpen(ad)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {ad.images[0] ? (
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <ImageIcon className="size-8 text-muted-foreground/50" />
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="mb-1 line-clamp-1 font-medium text-foreground transition-colors group-hover:text-primary">
                {ad.title}
              </h3>
              <p className="font-bold text-primary">{formatMarketplacePrice(ad)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}