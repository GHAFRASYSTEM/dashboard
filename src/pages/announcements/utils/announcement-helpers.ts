import type { Announcement } from '../types/announcement'

export function filterAnnouncements(
  announcements: Announcement[],
  searchQuery:    string,
  categoryFilter: string,
): Announcement[] {
  const q = searchQuery.trim().toLowerCase()
  return announcements.filter(a => {
    const matchesSearch =
      q === '' ||
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q)
    const matchesCategory =
      categoryFilter === 'all' || a.category === categoryFilter
    return matchesSearch && matchesCategory
  })
}

export function getAnnouncementStats(announcements: Announcement[]) {
  return {
    total:    announcements.length,
    news:     announcements.filter(a => a.category === 'news').length,
    events:   announcements.filter(a => a.category === 'event').length,
    housing:  announcements.filter(a => a.category === 'housing').length,
    personal: announcements.filter(a => a.category === 'personal').length,
    updates:  announcements.filter(a => a.category === 'update').length,
  }
}