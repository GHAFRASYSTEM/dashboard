'use client'

import { useState, type SetStateAction } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Calendar, Eye, Heart, Tag } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { mockAds } from './data/mock-marketplace-ads'
import { MarketplaceContactDialog } from './components/marketplace-contact-dialog'
import { MarketplaceDeleteDialog } from './components/marketplace-delete-dialog'
import { MarketplaceDetailGallery } from './components/marketplace-detail-gallery'
import { MarketplaceDetailSidebar } from './components/marketplace-detail-sidebar'
import { MarketplaceFullscreenDialog } from './components/marketplace-fullscreen-dialog'
import { MarketplaceNotFound } from './components/marketplace-not-found'
import { MarketplaceRelatedAds } from './components/marketplace-related-ads'
import { MarketplaceShareDialog } from './components/marketplace-share-dialog'
import type { MarketplaceAd } from './types/marketplace'
import { conditionConfig, statusConfig } from './utils/marketplace-config'
import {
  formatMarketplacePrice,
  renderMarketplaceDescription,
} from './utils/marketplace-helpers'

export default function MarketplaceDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [message, setMessage] = useState('')

  const adFromState = location.state?.ad as MarketplaceAd | undefined
  const ad = adFromState || mockAds.find((item) => item.id === params.id)

  if (!ad) {
    return <MarketplaceNotFound />
  }

  const StatusIcon = statusConfig[ad.status].icon

  const relatedAds = mockAds
    .filter(
      (item) =>
        item.id !== ad.id &&
        item.category === ad.category &&
        item.status === 'approved'
    )
    .slice(0, 3)

  const handleApprove = () => {
    navigate('/marketing')
  }

  const handleReject = () => {
    navigate('/marketing')
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    navigate('/marketing')
  }

  const openRelated = (relatedAd: MarketplaceAd) => {
    navigate(`/marketing/${relatedAd.id}`, {
      state: { ad: relatedAd },
    })
  }

  const prevImage = () => {
    setCurrentImageIndex((current) => (current - 1 + ad.images.length) % ad.images.length)
  }

  const nextImage = () => {
    setCurrentImageIndex((current) => (current + 1) % ad.images.length)
  }

  return (
    <DashboardLayout
      title={ad.title}
      breadcrumbs={[
        { label: 'Marketplace', href: '/marketing' },
        { label: ad.title },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <MarketplaceDetailGallery
            ad={ad}
            currentImageIndex={currentImageIndex}
            isLiked={isLiked}
            onLikeToggle={() => setIsLiked((prev) => !prev)}
            onShare={() => setIsShareDialogOpen(true)}
            onFullscreen={() => setIsFullscreenOpen(true)}
            onPrev={prevImage}
            onNext={nextImage}
            onSelectImage={setCurrentImageIndex}
          />

          <Card className="border-border lg:hidden">
            <CardContent className="pt-6">
              <div className="mb-3 flex items-center gap-2">
                <Badge className={`${statusConfig[ad.status].color} border`}>
                  <StatusIcon className="mr-1 size-3" />
                  {statusConfig[ad.status].label}
                </Badge>
                <Badge variant="secondary">{ad.category}</Badge>
                <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                  {conditionConfig[ad.condition].label}
                </Badge>
              </div>

              <h1 className="mb-2 text-2xl font-bold text-foreground">{ad.title}</h1>
              <p className="mb-1 text-3xl font-bold text-primary">{formatMarketplacePrice(ad)}</p>
              {ad.priceType === 'negotiable' && (
                <p className="text-sm font-medium text-emerald-600">Price is negotiable</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground">
                {renderMarketplaceDescription(ad.description)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Category</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Tag className="size-4 text-primary" />
                    {ad.category}
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Condition</p>
                  <p className="font-semibold">{conditionConfig[ad.condition].label}</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{ad.location}</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Posted</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Calendar className="size-4 text-primary" />
                    {ad.submittedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Eye className="size-5 text-muted-foreground" />
                    <span className="text-lg font-semibold">{ad.views}</span>
                    <span className="text-muted-foreground">views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart
                      className={`size-5 ${
                        isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      }`}
                    />
                    <span className="text-lg font-semibold">{ad.likes + (isLiked ? 1 : 0)}</span>
                    <span className="text-muted-foreground">likes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setIsLiked((prev) => !prev)}
                  >
                    <Heart
                      className={`mr-2 size-4 ${
                        isLiked ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => setIsShareDialogOpen(true)}>
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <MarketplaceRelatedAds ads={relatedAds} onOpen={openRelated} />
        </div>

        <MarketplaceDetailSidebar
          ad={ad}
          onContact={() => setIsContactDialogOpen(true)}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />
      </div>

      <MarketplaceShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        ad={ad}
      />

      <MarketplaceContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        ad={ad}
        message={message}
        onMessageChange={(value: SetStateAction<string>) => setMessage(value)}
      />

      <MarketplaceDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        ad={ad}
        onDelete={handleDelete}
      />

      <MarketplaceFullscreenDialog
        open={isFullscreenOpen}
        onOpenChange={setIsFullscreenOpen}
        ad={ad}
        currentImageIndex={currentImageIndex}
        onPrev={prevImage}
        onNext={nextImage}
        onSelectImage={setCurrentImageIndex}
      />
    </DashboardLayout>
  )
}