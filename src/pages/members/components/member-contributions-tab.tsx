import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Receipt, Wallet } from 'lucide-react'
import type { Contribution } from '../types/members'

interface MemberContributionsTabProps {
  contributions: Contribution[]
}

export function MemberContributionsTab({
  contributions,
}: MemberContributionsTabProps) {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Payment History</CardTitle>
        <Button size="sm">
          <Receipt className="mr-2 size-4" />
          Record Payment
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    contribution.status === 'completed'
                      ? 'bg-emerald-500/10'
                      : contribution.status === 'pending'
                        ? 'bg-amber-500/10'
                        : 'bg-destructive/10'
                  }`}
                >
                  <Wallet
                    className={`size-5 ${
                      contribution.status === 'completed'
                        ? 'text-emerald-500'
                        : contribution.status === 'pending'
                          ? 'text-amber-500'
                          : 'text-destructive'
                    }`}
                  />
                </div>

                <div>
                  <p className="font-medium">{contribution.type}</p>
                  <p className="text-sm text-muted-foreground">{contribution.reference}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">GHS {contribution.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {format(contribution.date, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}