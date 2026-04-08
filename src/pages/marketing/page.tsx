'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { MarketplaceAddDialog } from './components/marketplace-add-dialog'
import { MarketplaceEmptyState } from './components/marketplace-empty-state'
import { MarketplaceGrid } from './components/marketplace-grid'
import { MarketplaceList } from './components/marketplace-list'
import { MarketplaceStats } from './components/marketplace-stats'
import { MarketplaceToolbar } from './components/marketplace-toolbar'
import { MarketplaceViewDialog } from './components/marketplace-view-dialog'
import { categories, mockAds } from './data/mock-marketplace-ads'
import type { MarketplaceAd,NewMarketplaceAd } from './types/marketplace'
import { filterMarketplaceAds, getMarketplaceStats } from './utils/marketplace-helpers'



export default function MarketplacePage() {
  const navigate = useNavigate()

  const [ads, setAds] = useState(mockAds)
  const [selectedAd, setSelectedAd] = useState<MarketplaceAd | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [newAd, setNewAd] = useState<NewMarketplaceAd>({
    title: '',
    description: '',
    summary: '',
    images: [],
    price: '',
    priceType: 'fixed',
    category: '',
    condition: 'new',
    location: '',
    submittedBy: '',
    email: '',
    phone: '',
  })

  const stats = getMarketplaceStats(ads)
  const filteredAds = filterMarketplaceAds(ads, selectedCategory, statusFilter, searchQuery)
  const featuredAds = filteredAds.filter((ad) => ad.featured && ad.status === 'approved')

  const handleApprove = (id: string) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: 'approved' as const } : ad))
    )
    setIsViewDialogOpen(false)
  }

  const handleReject = (id: string) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: 'rejected' as const } : ad))
    )
    setIsViewDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id))
    setIsViewDialogOpen(false)
  }

  const handleView = (ad: MarketplaceAd) => {
    setSelectedAd(ad)
    setCurrentImageIndex(0)
    setIsViewDialogOpen(true)

    navigate(`/marketing/${ad.id}`, {
      state: { ad },
    })
  }

  const handleImageUpload = () => {
    setNewAd((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`,
      ],
    }))
  }

  const handleRemoveImage = (index: number) => {
    setNewAd((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }))
  }

  const handleAddAd = () => {
    const ad: MarketplaceAd = {
      id: String(ads.length + 1),
      ...newAd,
      price: parseFloat(newAd.price) || 0,
      status: 'approved',
      submittedAt: new Date(),
      views: 0,
      likes: 0,
      featured: false,
    }

    setAds((prev) => [ad, ...prev])

    setNewAd({
      title: '',
      description: '',
      summary: '',
      images: [],
      price: '',
      priceType: 'fixed',
      category: '',
      condition: 'new',
      location: '',
      submittedBy: '',
      email: '',
      phone: '',
    })

    setIsAddDialogOpen(false)
  }

  return (
    <DashboardLayout title="Marketplace" breadcrumbs={[{ label: 'Marketplace' }]}>
      <MarketplaceStats
        pendingCount={stats.pendingCount}
        approvedCount={stats.approvedCount}
        rejectedCount={stats.rejectedCount}
        totalViews={stats.totalViews}
      />

      <MarketplaceToolbar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAdd={() => setIsAddDialogOpen(true)}
      />

      {filteredAds.length === 0 ? (
        <MarketplaceEmptyState
          hasFilters={
            !!searchQuery ||
            selectedCategory !== 'All Categories' ||
            statusFilter !== 'all'
          }
          onAdd={() => setIsAddDialogOpen(true)}
        />
      ) : viewMode === 'grid' ? (
        <MarketplaceGrid
          ads={filteredAds}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      ) : (
        <MarketplaceList
          ads={filteredAds}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}

      <MarketplaceViewDialog
        ad={selectedAd}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        currentImageIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
      />

      <MarketplaceAddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        categories={categories}
        newAd={newAd}
        onNewAdChange={setNewAd}
        onUploadImage={handleImageUpload}
        onRemoveImage={handleRemoveImage}
        onAdd={handleAddAd}
      />
    </DashboardLayout>
  )
}