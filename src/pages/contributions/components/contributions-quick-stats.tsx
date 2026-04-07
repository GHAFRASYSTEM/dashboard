import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  collectionRate: number
  outstanding: number
}

export function ContributionsQuickStats({
  collectionRate,
  outstanding,
}: Props) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Collection Rate</span>
          <span className="font-semibold text-success">{collectionRate}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg. Monthly</span>
          <span className="font-semibold">$4,533</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">YTD Total</span>
          <span className="font-semibold">$27,200</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Outstanding</span>
          <span className="font-semibold text-destructive">${outstanding}</span>
        </div>
      </CardContent>
    </Card>
  )
}