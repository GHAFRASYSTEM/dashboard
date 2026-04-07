import { Bath, Bed, Calendar, MapPin, Square } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Housing } from '../types/housing'
import { propertyTypeIcons } from '../utils/housing-config'

interface Props {
  housing: Housing
}

export function HousingSummaryCard({ housing }: Props) {
  const PropertyIcon = propertyTypeIcons[housing.propertyType]

  return (
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
  )
}