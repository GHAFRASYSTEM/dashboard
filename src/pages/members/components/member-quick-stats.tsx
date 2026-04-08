import { format, formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { TrendingUp } from 'lucide-react'
import type { Contribution, Member } from '../types/members'

interface MemberQuickStatsProps {
  member: Member
  contributions: Contribution[]
}

export function MemberQuickStats({
  member,
  contributions,
}: MemberQuickStatsProps) {
  const totalContributions = contributions.reduce(
    (sum, contribution) =>
      contribution.status === 'completed' ? sum + contribution.amount : sum,
    0
  )

  const tenure = formatDistanceToNow(member.joinedAt, { addSuffix: false })

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="size-5 text-primary" />
          Quick Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">Total Contributions</span>
          <span className="font-semibold">GHS {totalContributions.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">Member Since</span>
          <span className="font-semibold">{tenure}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">Last Payment</span>
          <span className="font-semibold">
            {member.lastPayment ? format(member.lastPayment, 'MMM d, yyyy') : 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">Transactions</span>
          <span className="font-semibold">{contributions.length}</span>
        </div>
      </CardContent>
    </Card>
  )
}