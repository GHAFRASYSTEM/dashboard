import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Housing } from '../types/housing'
import { amenitiesList } from '../utils/housing-config'

interface Props {
  housing: Housing
}

export function HousingAmenitiesCard({ housing }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities & Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {housing.amenities.map((amenityId) => {
            const amenity = amenitiesList.find((item) => item.id === amenityId)
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
  )
}