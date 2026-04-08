import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { CalendarDays, Eye, FolderOpen, Images, User2 } from 'lucide-react'
import type { Trend } from '../types/trends'

interface TrendOverviewCardProps {
  trend: Trend
}

export function TrendOverviewCard({ trend }: TrendOverviewCardProps) {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            <User2 className="size-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Author</p>
            <p className="text-sm font-medium text-foreground">{trend.author}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            <CalendarDays className="size-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-sm font-medium text-foreground">
              {format(new Date(trend.createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            <FolderOpen className="size-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-sm font-medium text-foreground">{trend.category}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            <Eye className="size-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Views</p>
            <p className="text-sm font-medium text-foreground">
              {trend.views.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            <Images className="size-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Media</p>
            <p className="text-sm font-medium text-foreground">
              {trend.images.length} image{trend.images.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}