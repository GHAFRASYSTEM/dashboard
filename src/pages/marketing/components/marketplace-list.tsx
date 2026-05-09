import { format } from 'date-fns'
import {
  Calendar,
  Check,
  Eye,
  Heart,
  ImageIcon,
  MapPin,
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

export function MarketplaceList({
  ads,
  onView,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  return (
    <div className="space-y-3">
      {ads.map((ad) => {
        const StatusIcon = statusConfig[ad.status].icon

        return (
          <Card
            key={ad.id}
            className="group cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30"
            onClick={() => onView(ad)}
          >
            <CardContent className="p-0">
              <div className="flex gap-4">
                <div className="relative aspect-4/3 w-48 shrink-0 overflow-hidden bg-muted">
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

                  {ad.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                      +{ad.images.length - 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 py-4 pr-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className={`${statusConfig[ad.status].color} border`}>
                          <StatusIcon className="mr-1 size-3" />
                          {statusConfig[ad.status].label}
                        </Badge>
                        <Badge variant="secondary">{ad.category}</Badge>
                        <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                          {conditionConfig[ad.condition].label}
                        </Badge>
                      </div>

                      <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {ad.title}
                      </h3>
                      <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                        {ad.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {ad.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {format(ad.submittedAt, 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="mb-2 text-xl font-bold text-primary">{formatMarketplacePrice(ad)}</p>

                      <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="size-4" />
                          {ad.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="size-4" />
                          {ad.likes}
                        </span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm">
                            Actions
                            <MoreVertical className="ml-2 size-4" />
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

                  <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                    <Avatar className="size-8">
                      <AvatarImage src={ad.avatar} />
                      <AvatarFallback>{ad.submittedBy[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{ad.submittedBy}</p>
                      <p className="text-xs text-muted-foreground">{ad.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}