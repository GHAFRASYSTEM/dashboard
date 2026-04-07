export type MediaType = 'image' | 'video'

export interface MediaItem {
  id: string
  title: string
  url: string
  thumbnail?: string
  type: MediaType
  category: string
  uploadedBy: string
  uploadedAt: Date
  size: string
  duration?: string
}

export interface MediaGroup {
  id: string
  title: string
  description: string
  items: string[]
  createdAt: Date
  createdBy: string
  category: string
}