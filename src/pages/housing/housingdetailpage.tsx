'use client'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { HousingAmenitiesCard } from './components/housing-amenities-card'
import { HousingContactCard } from './components/housing-contact-card'
import { HousingContactDialog } from './components/housing-contact-dialog'
import { HousingDescriptionCard } from './components/housing-description-card'
import { HousingGallery } from './components/housing-gallery'
import { HousingImageDialog } from './components/housing-image-dialog'
import { HousingLocationCard } from './components/housing-location-card'
import { HousingNotFound } from './components/housing-not-found'
import { HousingQuickFactsCard } from './components/housing-quick-facts-card'
import { HousingSummaryCard } from './components/housing-summary-card'
import { mockHousing } from './data/mock-housing'

export default function HousingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const housing = mockHousing.find((item) => item.id === id)

  if (!housing) {
    return <HousingNotFound />
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % housing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + housing.images.length) % housing.images.length)
  }

  return (
    <DashboardLayout
      title={housing.title}
      breadcrumbs={[
        { label: 'Housing', href: '/housing' },
        { label: housing.title },
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <HousingGallery
            housing={housing}
            currentImageIndex={currentImageIndex}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite((prev) => !prev)}
            onOpenImageModal={() => setIsImageModalOpen(true)}
            onPrevImage={prevImage}
            onNextImage={nextImage}
            onSelectImage={setCurrentImageIndex}
          />

          <HousingSummaryCard housing={housing} />
          <HousingDescriptionCard description={housing.description} />
          <HousingAmenitiesCard housing={housing} />
          <HousingLocationCard location={housing.location} address={housing.address} />
        </div>

        <div className="space-y-6">
          <HousingContactCard
            housing={housing}
            onOpenContactDialog={() => setIsContactDialogOpen(true)}
          />
          <HousingQuickFactsCard housing={housing} />
        </div>
      </div>

      <HousingContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        housing={housing}
      />

      <HousingImageDialog
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
        housing={housing}
        currentImageIndex={currentImageIndex}
        onPrevImage={prevImage}
        onNextImage={nextImage}
      />
    </DashboardLayout>
  )
}