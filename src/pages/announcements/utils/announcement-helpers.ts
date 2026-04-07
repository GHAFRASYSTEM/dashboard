import type { Announcement } from '../types/announcement'

export const filterAnnouncements = (
  announcements: Announcement[],
  searchQuery: string,
  filterStatus: string
) => {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return announcements.filter((announcement) => {
    const matchesSearch =
      normalizedQuery === '' ||
      announcement.title.toLowerCase().includes(normalizedQuery) ||
      announcement.content.toLowerCase().includes(normalizedQuery)

    const matchesStatus =
      filterStatus === 'all' || announcement.status === filterStatus

    return matchesSearch && matchesStatus
  })
}

export const getAnnouncementStats = (announcements: Announcement[]) => {
  return {
    published: announcements.filter((announcement) => announcement.status === 'published')
      .length,
    scheduled: announcements.filter((announcement) => announcement.status === 'pending')
      .length,
    drafts: announcements.filter((announcement) => announcement.status === 'draft').length,
  }
}