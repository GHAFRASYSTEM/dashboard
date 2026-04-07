import { Card, CardContent } from '../../../components/ui/card'
import { CheckCircle, DollarSign, Users, XCircle } from 'lucide-react'

interface Props {
  totalCollected: number
  paidCount: number
  pendingCount: number
  overdueCount: number
}

export function ContributionsStats({
  totalCollected,
  paidCount,
  pendingCount,
  overdueCount,
}: Props) {
  return (
    <div className="mb-6 grid gap-6 md:grid-cols-4">
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSign className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">${totalCollected}</p>
              <p className="text-sm text-muted-foreground">Collected This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle className="size-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{paidCount}</p>
              <p className="text-sm text-muted-foreground">Paid</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Users className="size-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <XCircle className="size-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overdueCount}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}