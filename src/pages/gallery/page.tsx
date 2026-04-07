'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { mockGroups, mockMedia } from './data/mock-gallery'
import { GalleryEmptyState } from './components/gallery-empty-state'
import { GalleryGridView } from './components/gallery-grid-view'
import { GalleryGroupsView } from './components/gallery-groups-view'
import { GalleryLightbox } from './components/gallery-lightbox'
import { GalleryListView } from './components/gallery-list-view'
import { GalleryStats } from './components/gallery-stats'
import { GalleryToolbar } from './components/gallery-toolbar'
import { PublishGroupDialog } from './components/publish-group-dialog'
import type { MediaGroup, MediaItem } from './types/gallery'
import { filterMediaItems, getGalleryStats } from './utils/gallery-helpers'

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>(mockMedia)
  const [groups, setGroups] = useState<MediaGroup[]>(mockGroups)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All Media')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'groups'>('grid')

  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const [lightboxItems, setLightboxItems] = useState<MediaItem[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [publishOpen, setPublishOpen] = useState(false)

  const filteredMedia = filterMediaItems(media, search, selectedCategory, typeFilter)
  const stats = getGalleryStats(media, groups.length)

  const openLightbox = (items: MediaItem[], index: number) => {
    setLightboxItems(items)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleDelete = (id: string) => {
    setMedia((previous) => previous.filter((item) => item.id !== id))
    setSelectedIds((previous) => {
      const next = new Set(previous)
      next.delete(id)
      return next
    })
  }

  const handlePublish = (groupData: Omit<MediaGroup, 'id' | 'createdAt'>) => {
    setGroups((previous) => [
      { ...groupData, id: `g${Date.now()}`, createdAt: new Date() },
      ...previous,
    ])
    setSelectedIds(new Set())
    setSelectionMode(false)
    setPublishOpen(false)
  }

  const handleDeleteGroup = (id: string) => {
    setGroups((previous) => previous.filter((group) => group.id !== id))
  }

  const exitSelection = () => {
    setSelectionMode(false)
    setSelectedIds(new Set())
  }

  return (
    <DashboardLayout title="Gallery Management" breadcrumbs={[{ label: 'Gallery' }]}>
      {lightboxOpen && (
        <GalleryLightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {publishOpen && (
        <PublishGroupDialog
          selectedIds={Array.from(selectedIds)}
          allMedia={media}
          onPublish={handlePublish}
          onClose={() => setPublishOpen(false)}
        />
      )}

      <div className="space-y-6">
        <GalleryStats stats={stats} />

        <GalleryToolbar
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectionMode={selectionMode}
          selectedCount={selectedIds.size}
          onEnterSelection={() => {
            setSelectionMode(true)
            setViewMode('grid')
          }}
          onExitSelection={exitSelection}
          onOpenPublish={() => setPublishOpen(true)}
        />

        {viewMode === 'groups' && (
          <GalleryGroupsView
            groups={groups}
            media={media}
            onOpenLightbox={openLightbox}
            onDeleteGroup={handleDeleteGroup}
            onCreateGroup={() => {
              setViewMode('grid')
              setSelectionMode(true)
            }}
          />
        )}

        {viewMode === 'grid' && (
          <GalleryGridView
            items={filteredMedia}
            selectionMode={selectionMode}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onOpenLightbox={openLightbox}
            onDelete={handleDelete}
          />
        )}

        {viewMode === 'list' && (
          <GalleryListView
            items={filteredMedia}
            selectionMode={selectionMode}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onOpenLightbox={openLightbox}
            onDelete={handleDelete}
          />
        )}

        {viewMode !== 'groups' && filteredMedia.length === 0 && <GalleryEmptyState />}
      </div>
    </DashboardLayout>
  )
}