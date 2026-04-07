'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import type { Announcement } from './types/announcement'
import { mockAnnouncements } from './data/mock-announcements'
import { filterAnnouncements, getAnnouncementStats } from './utils/announcement-helpers'
import { AnnouncementsStats } from './components/announcements-stats'
import { AnnouncementsToolbar } from './components/announcements-toolbar'
import { AnnouncementCard } from './components/announcement-card'
import { AnnouncementsEmptyState } from './components/announcements-empty-state'
import { AnnouncementFormDialog } from './components/announcement-form-dialog'
import { AnnouncementPreviewDialog } from './components/announcement-preview-dialog'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredAnnouncements = filterAnnouncements(
    announcements,
    searchQuery,
    filterStatus
  )

  const stats = getAnnouncementStats(announcements)

  const handleAdd = () => {
    setEditingAnnouncement(null)
    setUploadedImages([])
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Announcement) => {
    setEditingAnnouncement(item)
    setUploadedImages(item.images)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const status = formData.get('status') as Announcement['status']

    const newAnnouncement: Announcement = {
      id: editingAnnouncement?.id || Date.now().toString(),
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: 'Admin',
      status,
      priority: formData.get('priority') as Announcement['priority'],
      audience: formData.get('audience') as Announcement['audience'],
      images: uploadedImages,
      publishedAt: status === 'published' ? new Date() : undefined,
      createdAt: editingAnnouncement?.createdAt || new Date(),
    }

    if (editingAnnouncement) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingAnnouncement.id ? newAnnouncement : a))
      )
    } else {
      setAnnouncements((prev) => [newAnnouncement, ...prev])
    }

    setIsDialogOpen(false)
    setUploadedImages([])
  }

  return (
    <DashboardLayout title="Announcements" breadcrumbs={[{ label: 'Announcements' }]}>
      <AnnouncementsStats stats={stats} />

      <AnnouncementsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onAdd={handleAdd}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <AnnouncementsEmptyState
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          onAdd={handleAdd}
        />
      )}

      <AnnouncementPreviewDialog
        open={!!viewingAnnouncement}
        onOpenChange={(open) => {
          if (!open) setViewingAnnouncement(null)
        }}
        announcement={viewingAnnouncement}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        onEdit={handleEdit}
      />

      <AnnouncementFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingAnnouncement={editingAnnouncement}
        uploadedImages={uploadedImages}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onSubmit={handleSave}
      />
    </DashboardLayout>
  )
}