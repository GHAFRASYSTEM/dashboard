import {
  AlertTriangle,
  Check,
  Edit2,
  Flag,
  MessageCircle,
  Phone,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { MarketplaceAd } from '../types/marketplace'
import { conditionConfig, statusConfig } from '../utils/marketplace-config'
import { formatMarketplacePrice } from '../utils/marketplace-helpers'

interface Props {
  ad: MarketplaceAd
  onContact: () => void
  onApprove: () => void
  onReject: () => void
  onDelete: () => void
}

export function MarketplaceDetailSidebar({
  ad,
  onContact,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  const StatusIcon = statusConfig[ad.status].icon

  return (
    <div className="space-y-6">
      <Card className="hidden border-border lg:block">
        <CardContent className="pt-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge className={`${statusConfig[ad.status].color} border`}>
              <StatusIcon className="mr-1 size-3" />
              {statusConfig[ad.status].label}
            </Badge>
            {ad.featured && (
              <Badge className="border-0 bg-amber-500 text-white">
                <Star className="mr-1 size-3" />
                Featured
              </Badge>
            )}
          </div>

          <h1 className="mb-2 text-2xl font-bold text-foreground">{ad.title}</h1>

          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary">{ad.category}</Badge>
            <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
              {conditionConfig[ad.condition].label}
            </Badge>
          </div>

          <p className="mb-1 text-3xl font-bold text-primary">{formatMarketplacePrice(ad)}</p>
          {ad.priceType === 'negotiable' && (
            <p className="text-sm font-medium text-emerald-600">Price is negotiable</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Seller Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <Avatar className="size-16 border-2 border-primary/20">
              <AvatarImage src={ad.avatar} />
              <AvatarFallback className="bg-primary/10 text-lg text-primary">
                {ad.submittedBy[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{ad.submittedBy}</p>
              <p className="text-sm text-muted-foreground">Member since 2023</p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`mailto:${ad.email}`}
              className="group flex items-center gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <span className="text-sm truncate">{ad.email}</span>
            </a>

            <a
              href={`tel:${ad.phone}`}
              className="group flex items-center gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <span className="text-sm">{ad.phone}</span>
            </a>
          </div>

          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={onContact}>
              <MessageCircle className="mr-2 size-4" />
              Send Message
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <a href={`tel:${ad.phone}`}>
                <Phone className="mr-2 size-4" />
                Call Seller
              </a>
            </Button>
          </div>

          <div className="mt-4 rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            <Check className="mx-auto mb-2 size-5 text-emerald-500" />
            Verified listing by Housing Manager
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {ad.status === 'pending' && (
            <>
              <Button
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={onApprove}
              >
                <Check className="mr-2 size-4" />
                Approve & Publish
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-600 hover:bg-red-500/10"
                onClick={onReject}
              >
                <X className="mr-2 size-4" />
                Reject
              </Button>
            </>
          )}

          <Button variant="outline" className="w-full">
            <Edit2 className="mr-2 size-4" />
            Edit Listing
          </Button>

          <Button
            variant="outline"
            className="w-full border-red-500/50 text-red-600 hover:bg-red-500/10"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 size-4" />
            Delete Listing
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="size-4 text-amber-600" />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              Meet in a safe, public location
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              Check the item before payment
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              Only pay after collecting item
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              Verify seller contact information
            </li>
          </ul>
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive">
        <Flag className="mr-2 size-4" />
        Report this listing
      </Button>
    </div>
  )
}