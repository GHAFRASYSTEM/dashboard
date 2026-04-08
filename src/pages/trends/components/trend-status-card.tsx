import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { cn } from '../../../lib/utils'
import type { Trend } from '../types/trends'
import { detailStatusStyles } from '../utils/trend-utils'

interface TrendStatusCardProps {
  status: Trend['status']
}

export function TrendStatusCard({ status }: TrendStatusCardProps) {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Publishing Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge
          variant="outline"
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium capitalize',
            detailStatusStyles[status]
          )}
        >
          {status}
        </Badge>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {status === 'published' &&
            'This trend is currently visible to users and contributing to engagement metrics.'}
          {status === 'draft' &&
            'This trend is still in draft mode and has not yet been published.'}
          {status === 'pending' &&
            'This trend is awaiting review before it can go live.'}
        </p>
      </CardContent>
    </Card>
  )
}