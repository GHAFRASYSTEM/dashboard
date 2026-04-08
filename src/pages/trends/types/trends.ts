export interface TrendLink {
  label: string
  url: string
}

export interface Trend {
  id: string
  title: string
  summary: string
  content: string
  author: string
  status: 'published' | 'draft' | 'pending'
  views: number
  images: string[]
  links: TrendLink[]
  createdAt: Date
  category: string
}