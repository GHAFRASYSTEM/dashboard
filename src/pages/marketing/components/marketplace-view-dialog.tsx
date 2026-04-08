import { format } from 'date-fns'
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ImageIcon,
  Mail,
  Package,
  Phone,
  Trash2,
  X,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import type { MarketplaceAd } from '../types/marketplace'
import { conditionConfig, statusConfig } from '../utils/marketplace-config'
import { formatMarketplacePrice } from '../utils/marketplace-helpers'

interface Props {
  ad: MarketplaceAd | null
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImageIndex: number
  onImageChange: (index: number) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}

export function MarketplaceViewDialog({
  ad,
  open,
  onOpenChange,
  currentImageIndex,
  onImageChange,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  if (!ad) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5" />
            Listing Details
          </DialogTitle>
          <DialogDescription>
            Review and manage this marketplace listing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {ad.images.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                <img
                  src={ad.images[currentImageIndex]}
                  alt={ad.title}
                  className="size-full object-cover"
                />

                {ad.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 size-8 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={() =>
                        onImageChange((currentImageIndex - 1 + ad.images.length) % ad.images.length)
                      }
                    >
                      <ChevronLeft className="size-4" />
                    </Button>

                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 size-8 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={() =>
                        onImageChange((currentImageIndex + 1) % ad.images.length)
                      }
                    >
                      <ChevronRight className="size-4" />
                    </Button>

                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
                      {ad.images.map((_, index) => (
                        <button
                          key={index}
                          className={`size-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => onImageChange(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {ad.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {ad.images.map((img, index) => (
                    <button
                      key={index}
                      className={`relative size-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => onImageChange(index)}
                    >
                      <img src={img} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className={`${statusConfig[ad.status].color} border`}>
                {statusConfig[ad.status].label}
              </Badge>
              <Badge variant="secondary">{ad.category}</Badge>
              <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                {conditionConfig[ad.condition].label}
              </Badge>
            </div>

            <h2 className="text-2xl font-bold text-foreground">{ad.title}</h2>
            <p className="mt-2 text-2xl font-bold text-primary">{formatMarketplacePrice(ad)}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
            <p className="text-foreground">{ad.description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Summary</h4>
            <p className="text-foreground">{ad.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="size-4" />
                Submitted
              </h4>
              <p className="text-foreground">{format(ad.submittedAt, 'MMMM d, yyyy')}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
              <p className="text-foreground">{ad.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-y border-border py-3">
            <div className="flex items-center gap-2">
              <Eye className="size-5 text-muted-foreground" />
              <span className="font-medium">{ad.views}</span>
              <span className="text-muted-foreground">views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="size-5 text-muted-foreground" />
              <span className="font-medium">{ad.likes}</span>
              <span className="text-muted-foreground">likes</span>
            </div>
          </div>

          <Card className="border-border bg-muted/30">
            <CardContent className="pt-4">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">Contact Information</h4>
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src={ad.avatar} />
                  <AvatarFallback>{ad.submittedBy[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-semibold">{ad.submittedBy}</p>
                  <div className="mt-1 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                    <span className="flex items-center gap-1">
                      <Mail className="size-4" />
                      {ad.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="size-4" />
                      {ad.phone}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          {ad.status === 'pending' ? (
            <>
              <Button
                variant="outline"
                onClick={() => onReject(ad.id)}
                className="border-red-500/50 text-red-600 hover:bg-red-500/10"
              >
                <X className="mr-2 size-4" />
                Reject
              </Button>
              <Button
                onClick={() => onApprove(ad.id)}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Check className="mr-2 size-4" />
                Approve & Publish
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => onDelete(ad.id)}
                className="border-red-500/50 text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}