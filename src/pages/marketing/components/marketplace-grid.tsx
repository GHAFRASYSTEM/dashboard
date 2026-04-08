import { format } from 'date-fns'
import {
  Check,
  Eye,
  Heart,
  ImageIcon,
  MoreVertical,
  Trash2,
  X,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import type { MarketplaceAd } from '../types/marketplace'
import { conditionConfig, statusConfig } from '../utils/marketplace-config'
import { formatMarketplacePrice } from '../utils/marketplace-helpers'

interface Props {
  ads: MarketplaceAd[]
  onView: (ad: MarketplaceAd) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}

export function MarketplaceGrid({
  ads,
  onView,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {ads.map((ad) => {
        const StatusIcon = statusConfig[ad.status].icon

        return (
          <Card
            key={ad.id}
            className="group cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30"
            onClick={() => onView(ad)}
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
                  <ImageIcon className="size-12 text-muted-foreground/50" />
                </div>
              )}

              {ad.images.length > 1 && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  <ImageIcon className="size-3" />
                  {ad.images.length}
                </div>
              )}

              <div className="absolute top-2 left-2 flex items-center gap-2">
                <Badge className={`${statusConfig[ad.status].color} border`}>
                  <StatusIcon className="mr-1 size-3" />
                  {statusConfig[ad.status].label}
                </Badge>
              </div>

              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 bg-white/90 shadow-sm hover:bg-white"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onView(ad)
                      }}
                    >
                      <Eye className="mr-2 size-4" />
                      View Details
                    </DropdownMenuItem>

                    {ad.status === 'pending' && (
                      <>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onApprove(ad.id)
                          }}
                        >
                          <Check className="mr-2 size-4" />
                          Approve
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onReject(ad.id)
                          }}
                        >
                          <X className="mr-2 size-4" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(ad.id)
                      }}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {ad.title}
                </h3>
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{ad.summary}</p>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{formatMarketplacePrice(ad)}</span>
                <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                  {conditionConfig[ad.condition].label}
                </Badge>
              </div>

              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{ad.location}</span>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={ad.avatar} />
                    <AvatarFallback className="text-xs">{ad.submittedBy[0]}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[80px] truncate text-xs text-muted-foreground">
                    {ad.submittedBy}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3" />
                    {ad.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="size-3" />
                    {ad.likes}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}