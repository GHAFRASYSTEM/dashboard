export interface Comment {
  id: string
  author: string
  authorAvatar?: string
  content: string
  createdAt: Date
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorAvatar?: string
  authorRole?: string
  status: 'published' | 'draft' | 'pending'
  priority: 'low' | 'medium' | 'high'
  audience: 'all' | 'members' | 'executives'
  images: string[]
  scheduledAt?: Date
  publishedAt?: Date
  createdAt: Date
  views?: number
  likes?: number
  comments?: Comment[]
}