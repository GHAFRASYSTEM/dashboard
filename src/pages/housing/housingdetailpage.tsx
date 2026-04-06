'use client'

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
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
  Check,
  MessageCircle,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Housing, Amenity } from './page'

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
      "Beautiful apartment with city views, modern kitchen with stainless steel appliances, hardwood floors throughout, and floor-to-ceiling windows. The master bedroom features a walk-in closet and en-suite bathroom. Building amenities include a rooftop deck, fitness center, and concierge service.\n\nThis stunning apartment offers the perfect blend of modern design and comfortable living. Located in the heart of downtown, you'll have easy access to restaurants, shopping, and entertainment. The open-concept living space is perfect for entertaining, while the bedrooms provide peaceful retreats at the end of the day.\n\nThe kitchen features granite countertops, stainless steel appliances, and plenty of cabinet space. Both bathrooms have been recently renovated with modern fixtures and finishes.",
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
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop',
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
      "Top floor penthouse with panoramic views of the city skyline. Features include a private terrace, chef's kitchen, smart home technology, and premium finishes throughout. Building offers valet parking and concierge services.",
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
      'Convenient location, easy commute to downtown. Modern one-bedroom with updated appliances, in-unit washer/dryer, and balcony. Building features secure entry and bike storage.',
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
      'Historic townhouse with modern amenities. Features exposed brick, high ceilings, renovated kitchen and bathrooms, private patio, and two-story layout. Walking distance to shops and restaurants.',
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

export default function HousingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const housing = mockHousing.find((h) => h.id === id)

  if (!housing) {
    return (
      <DashboardLayout
        title="Property Not Found"
        breadcrumbs={[
          { label: 'Housing', href: '/housing' },
          { label: 'Not Found' },
        ]}
      >
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="mb-2 text-2xl font-bold">Property Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link to="/housing">
              <ArrowLeft className="mr-2 size-4" />
              Back to Listings
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const PropertyIcon = propertyTypeIcons[housing.propertyType]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % housing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + housing.images.length) % housing.images.length)
  }

  return (
    <DashboardLayout
      title={housing.title}
      breadcrumbs={[
        { label: 'Housing', href: '/housing' },
        { label: housing.title },
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-muted">
            <div
              className="relative aspect-[16/10] cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            >
              <img
                src={housing.images[currentImageIndex]}
                alt={`${housing.title} - Image ${currentImageIndex + 1}`}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

              <div className="absolute left-4 top-4">
                <Badge
                  variant="outline"
                  className={cn('border px-3 py-1 text-sm capitalize', statusColors[housing.status])}
                >
                  {housing.status}
                </Badge>
              </div>

              <div className="absolute right-4 top-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFavorite((prev) => !prev)
                  }}
                >
                  <Heart className={cn('size-5', isFavorite && 'fill-red-500 text-red-500')} />
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="size-5" />
                </Button>
              </div>

              {housing.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur">
                {currentImageIndex + 1} / {housing.images.length}
              </div>
            </div>

            {housing.images.length > 1 && (
              <div className="flex gap-2 p-3">
                {housing.images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all',
                      currentImageIndex === index
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      <PropertyIcon className="mr-1 size-3" />
                      {housing.propertyType}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Listed {housing.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <CardTitle className="text-2xl">{housing.title}</CardTitle>

                  <div className="mt-2 flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{housing.address}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${housing.price.toLocaleString()}
                  </div>
                  <span className="text-sm text-muted-foreground">per month</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/50 p-4 sm:grid-cols-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Bed className="size-6 text-primary" />
                  <span className="text-lg font-semibold">{housing.bedrooms}</span>
                  <span className="text-xs text-muted-foreground">Bedrooms</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <Bath className="size-6 text-primary" />
                  <span className="text-lg font-semibold">{housing.bathrooms}</span>
                  <span className="text-xs text-muted-foreground">Bathrooms</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <Square className="size-6 text-primary" />
                  <span className="text-lg font-semibold">{housing.sqft.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">Sq. Ft.</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <Calendar className="size-6 text-primary" />
                  <span className="text-lg font-semibold">{housing.yearBuilt}</span>
                  <span className="text-xs text-muted-foreground">Year Built</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                {housing.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {housing.amenities.map((amenityId) => {
                  const amenity = amenitiesList.find((a) => a.id === amenityId)
                  if (!amenity) return null

                  return (
                    <div
                      key={amenityId}
                      className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <amenity.icon className="size-5 text-primary" />
                      </div>
                      <span className="font-medium">{amenity.label}</span>
                    </div>
                  )
                })}
              </div>

              {housing.amenities.length === 0 && (
                <p className="text-center text-muted-foreground">No amenities listed</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{housing.location}</h4>
                  <p className="text-muted-foreground">{housing.address}</p>
                </div>
              </div>

              <div className="mt-4 aspect-[2/1] overflow-hidden rounded-xl bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <MapPin className="mr-2 size-5" />
                  Map view coming soon
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Contact Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      housing.contactName
                    )}`}
                  />
                  <AvatarFallback>
                    {housing.contactName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-semibold">{housing.contactName}</h4>
                  <p className="text-sm text-muted-foreground">Property Agent</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <a
                  href={`tel:${housing.contactPhone}`}
                  className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{housing.contactPhone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${housing.contactEmail}`}
                  className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{housing.contactEmail}</p>
                  </div>
                </a>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => setIsContactDialogOpen(true)}>
                  <MessageCircle className="mr-2 size-4" />
                  Send Message
                </Button>

                <Button variant="outline" className="w-full" size="lg" asChild>
                  <a href={`tel:${housing.contactPhone}`}>
                    <Phone className="mr-2 size-4" />
                    Call Agent
                  </a>
                </Button>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                <Check className="mx-auto mb-2 size-5 text-emerald-500" />
                Verified listing by Housing Manager
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Type</span>
                <span className="font-medium capitalize">{housing.propertyType}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Year Built</span>
                <span className="font-medium">{housing.yearBuilt}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rent</span>
                <span className="font-medium">${housing.price.toLocaleString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className={cn('border capitalize', statusColors[housing.status])}>
                  {housing.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Agent</DialogTitle>
            <DialogDescription>
              Send a message to {housing.contactName} about {housing.title}
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setIsContactDialogOpen(false)
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Your Phone</Label>
              <Input id="phone" placeholder="(555) 123-4567" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="I'm interested in this property..."
                defaultValue={`Hi, I'm interested in the ${housing.title} listed at $${housing.price.toLocaleString()}/month. Please contact me with more information.`}
                className="min-h-[120px]"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-5xl p-0">
          <div className="relative aspect-video">
            <img
              src={housing.images[currentImageIndex]}
              alt={`${housing.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-contain"
            />

            {housing.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
                >
                  <ChevronLeft className="size-6" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-all hover:bg-background"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-2 backdrop-blur">
              {currentImageIndex + 1} / {housing.images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}