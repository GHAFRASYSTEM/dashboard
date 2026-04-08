export interface NewMarketplaceAd {
  title: string
  description: string
  summary: string
  images: string[]
  price: string
  priceType: 'fixed' | 'negotiable' | 'free' | 'contact'
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  location: string
  submittedBy: string
  email: string
  phone: string
}

export interface MarketplaceAd {
  id: string
  title: string
  description: string
  summary: string
  images: string[]
  price: number
  priceType: 'fixed' | 'negotiable' | 'free' | 'contact'
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  location: string
  submittedBy: string
  email: string
  phone: string
  avatar?: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
  views: number
  likes: number
  featured: boolean
}