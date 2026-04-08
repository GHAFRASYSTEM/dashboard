export type AnnouncementCategory =
  | 'news'
  | 'event'
  | 'housing'
  | 'personal'
  | 'update'

export interface Announcement {
  id: string
  category: AnnouncementCategory
  title: string
  body: string
  image_uri?: string | null
  published_at: string
}