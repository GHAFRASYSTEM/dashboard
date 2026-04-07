import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'
import { cn } from '../../../lib/utils'
import type { Housing } from '../types/housing'
import { statusColors } from '../utils/housing-config'

interface Props {
  housing: Housing
}

export function HousingQuickFactsCard({ housing }: Props) {
  return (
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
  )
}