'use client'

import { useEffect, useState, useCallback } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import type { Announcement } from './types/announcement'
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../../api/announcements'
import { fileToBase64 }            from './utils/fileToBase64'
import { filterAnnouncements, getAnnouncementStats } from './utils/announcement-helpers'
import { AnnouncementsStats }      from './components/announcements-stats'
import { AnnouncementsToolbar }    from './components/announcements-toolbar'
import { AnnouncementCard }        from './components/announcement-card'
import { AnnouncementsEmptyState } from './components/announcements-empty-state'
import { AnnouncementFormDialog }  from './components/announcement-form-dialog'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading,       setLoading]       = useState(true)
  const [isDialogOpen,  setIsDialogOpen]  = useState(false)
  const [editing,       setEditing]       = useState<Announcement | null>(null)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [categoryFilter,setCategoryFilter]= useState('all')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // ── Load ──────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch all (page 1, limit 100 for admin view — paginate later if needed)
      const res = await getAnnouncements(1, 50)
      setAnnouncements(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // ── Derived ───────────────────────────────────────────────────────────────
  const filtered = filterAnnouncements(announcements, searchQuery, categoryFilter)
  const stats    = getAnnouncementStats(announcements)

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditing(null)
    setUploadedImage(null)
    setIsDialogOpen(true)
  }

  const openEdit = (item: Announcement) => {
    setEditing(item)
    setUploadedImage(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this announcement? This cannot be undone.')) return
    await deleteAnnouncement(id)
    await load()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    setUploadedImage(base64)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const payload = {
      category: fd.get('category') as string,
      title:    fd.get('title')    as string,
      body:     fd.get('body')     as string,
      // Only send image if a new one was selected
      ...(uploadedImage ? { image: uploadedImage } : {}),
    }

    if (editing) {
      await updateAnnouncement(editing.id, payload)
    } else {
      await createAnnouncement(payload)
    }

    setIsDialogOpen(false)
    setUploadedImage(null)
    await load()
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout
      title="Announcements"
      breadcrumbs={[{ label: 'Announcements' }]}
    >
      <AnnouncementsStats stats={stats} />

      <AnnouncementsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={categoryFilter}
        onFilterChange={setCategoryFilter}
        onAdd={openAdd}
      />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(a => (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <AnnouncementsEmptyState
              searchQuery={searchQuery}
              filterStatus={categoryFilter}
              onAdd={openAdd}
            />
          )}
        </>
      )}

      <AnnouncementFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingAnnouncement={editing}
        uploadedImage={uploadedImage}
        onImageUpload={handleImageUpload}
        onRemoveImage={() => setUploadedImage(null)}
        onSubmit={handleSave}
      />
    </DashboardLayout>
  )
}