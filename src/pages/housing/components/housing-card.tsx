import { Link } from 'react-router-dom'
import { Bath, Bed, MapPin, Square } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { cn } from '../../../lib/utils'
import type { Housing } from '../types/housing'
import { amenitiesList, propertyTypeIcons, statusColors } from '../utils/housing-config'

interface Props {
  housing: Housing
}

export function HousingCard({ housing }: Props) {
  const PropertyIcon = propertyTypeIcons[housing.propertyType]

  return (
    <Link to={`/housing/${housing.id}`} className="block h-full focus:outline-none">
      <Card className="h-full cursor-pointer overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
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
}