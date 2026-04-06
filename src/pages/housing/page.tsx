'use client'

import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Building,
  Home,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Wind,
  Tv,
  UtensilsCrossed,
  Shield,
  Snowflake,
  Dog,
} from 'lucide-react'
import { cn } from '../../lib/utils'

export type Amenity = {
  id:
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
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export type Housing = {
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
  amenities: Amenity['id'][]
  propertyType: 'apartment' | 'house' | 'studio' | 'condo' | 'townhouse'
  status: 'available' | 'rented' | 'pending'
  yearBuilt: number
  contactName: string
  contactPhone: string
  contactEmail: string
  createdAt: Date
}

const amenitiesList: Amenity[] = [
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

const mockHousing: Housing[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment',
    description:
      "Beautiful apartment with city views, modern kitchen with stainless steel appliances, hardwood floors throughout, and floor-to-ceiling windows. The master bedroom features a walk-in closet and en-suite bathroom. Building amenities include a rooftop deck, fitness center, and concierge service.",
    price: 1500,
    location: 'Downtown, City Center',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'gym', 'security', 'parking'],
    propertyType: 'apartment',
    status: 'available',
    yearBuilt: 2019,
    contactName: 'John Smith',
    contactPhone: '(555) 123-4567',
    contactEmail: 'john@example.com',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Cozy Studio Near Campus',
    description:
      'Perfect for students, fully furnished studio with modern amenities. Features a Murphy bed, compact kitchen, and study area. Walking distance to university and public transportation.',
    price: 800,
    location: 'University District',
    address: '456 College Ave, Unit 12, Boston, MA 02115',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'heating', 'kitchen'],
    propertyType: 'studio',
    status: 'available',
    yearBuilt: 2015,
    contactName: 'Sarah Johnson',
    contactPhone: '(555) 234-5678',
    contactEmail: 'sarah@example.com',
    createdAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    title: 'Spacious 3BR Family Home',
    description:
      'Large family home with backyard, perfect for families. Features include a renovated kitchen, hardwood floors, finished basement, and attached two-car garage. Located in a quiet neighborhood with excellent schools.',
    price: 2200,
    location: 'Suburban Heights',
    address: '789 Oak Lane, Chicago, IL 60614',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'parking', 'ac', 'heating', 'kitchen', 'pets'],
    propertyType: 'house',
    status: 'rented',
    yearBuilt: 2010,
    contactName: 'Mike Davis',
    contactPhone: '(555) 345-6789',
    contactEmail: 'mike@example.com',
    createdAt: new Date('2024-03-13'),
  },
  {
    id: '4',
    title: 'Luxury Penthouse Suite',
    description:
      "Top floor penthouse with panoramic views of the city skyline. Features include a private terrace, chef's kitchen, smart home technology, and premium finishes throughout.",
    price: 4500,
    location: 'Financial District',
    address: '100 Skyline Tower, PH-1, San Francisco, CA 94105',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'parking', 'gym', 'pool', 'ac', 'security', 'tv'],
    propertyType: 'condo',
    status: 'pending',
    yearBuilt: 2022,
    contactName: 'Emily Chen',
    contactPhone: '(555) 456-7890',
    contactEmail: 'emily@example.com',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: '5',
    title: '1BR Apartment Near Metro',
    description:
      'Convenient location, easy commute to downtown. Modern one-bedroom with updated appliances, in-unit washer/dryer, and balcony.',
    price: 1100,
    location: 'Transit Hub Area',
    address: '200 Metro Place, Apt 3C, Washington, DC 20001',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'security'],
    propertyType: 'apartment',
    status: 'available',
    yearBuilt: 2018,
    contactName: 'David Wilson',
    contactPhone: '(555) 567-8901',
    contactEmail: 'david@example.com',
    createdAt: new Date('2024-03-11'),
  },
  {
    id: '6',
    title: 'Charming Townhouse',
    description:
      'Historic townhouse with modern amenities. Features exposed brick, high ceilings, renovated kitchen and bathrooms, private patio, and two-story layout.',
    price: 1800,
    location: 'Old Town District',
    address: '55 Heritage Row, Philadelphia, PA 19106',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'heating', 'kitchen', 'pets'],
    propertyType: 'townhouse',
    status: 'available',
    yearBuilt: 1920,
    contactName: 'Lisa Brown',
    contactPhone: '(555) 678-9012',
    contactEmail: 'lisa@example.com',
    createdAt: new Date('2024-03-10'),
  },
]

const statusColors: Record<Housing['status'], string> = {
  available: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  rented: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}

const propertyTypeIcons: Record<Housing['propertyType'], typeof Building> = {
  apartment: Building,
  house: Home,
  studio: Building,
  condo: Building,
  townhouse: Home,
}

export default function HousingPage() {
  return (
    <DashboardLayout
      title="Housing Listings"
      breadcrumbs={[{ label: 'Housing' }]}
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockHousing.map((housing) => {
          const PropertyIcon = propertyTypeIcons[housing.propertyType]

          return (
            <Link
              key={housing.id}
              to={`/housing/${housing.id}`}
              className="block h-full focus:outline-none"
            >
              <Card className="h-full overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={housing.images[0]}
                    alt={housing.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <Badge
                      variant="outline"
                      className={cn('border capitalize backdrop-blur-sm', statusColors[housing.status])}
                    >
                      {housing.status}
                    </Badge>

                    <Badge variant="secondary" className="capitalize">
                      <PropertyIcon className="mr-1 size-3" />
                      {housing.propertyType}
                    </Badge>
                  </div>
                </div>

                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">{housing.title}</h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" />
                        <span className="truncate">{housing.location}</span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-xl font-bold text-primary">
                        ${housing.price.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {housing.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                      <Bed className="size-4 text-primary" />
                      <span className="font-semibold">{housing.bedrooms}</span>
                      <span className="text-xs text-muted-foreground">Beds</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                      <Bath className="size-4 text-primary" />
                      <span className="font-semibold">{housing.bathrooms}</span>
                      <span className="text-xs text-muted-foreground">Baths</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                      <Square className="size-4 text-primary" />
                      <span className="font-semibold">{housing.sqft}</span>
                      <span className="text-xs text-muted-foreground">Sqft</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {housing.amenities.slice(0, 4).map((amenityId) => {
                      const amenity = amenitiesList.find((item) => item.id === amenityId)
                      if (!amenity) return null

                      return (
                        <div
                          key={amenityId}
                          className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs"
                        >
                          <amenity.icon className="size-3.5 text-primary" />
                          <span>{amenity.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </DashboardLayout>
  )
}