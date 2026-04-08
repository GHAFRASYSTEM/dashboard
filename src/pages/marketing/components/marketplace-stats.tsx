import { CheckCircle, Clock, TrendingUp, XCircle } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'

interface Props {
  pendingCount: number
  approvedCount: number
  rejectedCount: number
  totalViews: number
}

export function MarketplaceStats({
  pendingCount,
  approvedCount,
  rejectedCount,
  totalViews,
}: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-amber-500/5 to-amber-500/10">
        <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-amber-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
              <Clock className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
        <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-emerald-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
              <CheckCircle className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Published Ads</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-red-500/5 to-red-500/10">
        <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-red-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
              <XCircle className="size-6 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{rejectedCount}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
        <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-blue-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
              <TrendingUp className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}