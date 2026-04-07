import type { LucideIcon } from 'lucide-react'

export type AmenityId =
  | 'wifi'
  | 'parking'
  | 'gym'
  | 'pool'
  | 'ac'
  | 'tv'
  | 'kitchen'
  | 'security'
  | 'heating'
  | 'pets'

export interface Amenity {
  id: AmenityId
  label: string
  icon: LucideIcon
}

export interface Housing {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  amenities: AmenityId[]
  propertyType: 'apartment' | 'house' | 'studio' | 'condo' | 'townhouse'
  status: 'available' | 'rented' | 'pending'
  yearBuilt: number
  contactName: string
  contactPhone: string
  contactEmail: string
  createdAt: Date
}