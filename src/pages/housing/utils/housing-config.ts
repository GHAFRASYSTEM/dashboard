import {
  Building,
  Car,
  Dog,
  Dumbbell,
  Home,
  Shield,
  Snowflake,
  Tv,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react'
import type { Amenity, Housing } from '../types/housing'

export const amenitiesList: Amenity[] = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'pool', label: 'Pool', icon: Waves },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'tv', label: 'TV/Cable', icon: Tv },
  { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
  { id: 'security', label: '24/7 Security', icon: Shield },
  { id: 'heating', label: 'Heating', icon: Snowflake },
  { id: 'pets', label: 'Pet Friendly', icon: Dog },
]

export const statusColors: Record<Housing['status'], string> = {
  available: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  rented: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}

export const propertyTypeIcons: Record<Housing['propertyType'], typeof Building> = {
  apartment: Building,
  house: Home,
  studio: Building,
  condo: Building,
  townhouse: Home,
}