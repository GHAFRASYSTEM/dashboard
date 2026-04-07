import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  location: string
  address: string
}

export function HousingLocationCard({ location, address }: Props) {
  return (
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
            <h4 className="font-semibold">{location}</h4>
            <p className="text-muted-foreground">{address}</p>
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
  )
}