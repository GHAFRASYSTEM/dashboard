import { ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import { formatFinanceAmount } from '../utils/finance-format'

interface FinanceStatsProps {
  income: string
  expenses: string
  net: string
  currency?: string
  label?: string
  // When a single category is filtered the backend returns "0.00" for the other total, so net is meaningless.
  hideNet?: boolean
}

export function FinanceStats({ income, expenses, net, currency, label = 'All time', hideNet = false }: FinanceStatsProps) {
  const stats = [
    { label: 'Total income', value: formatFinanceAmount(income, currency), icon: ArrowUpRight, color: 'text-success' },
    { label: 'Total expenses', value: formatFinanceAmount(expenses, currency), icon: ArrowDownLeft, color: 'text-destructive' },
    {
      label: 'Net balance',
      value: hideNet ? 'n/a' : formatFinanceAmount(net, currency),
      icon: Scale,
      color: hideNet ? 'text-muted-foreground' : Number(net) >= 0 ? 'text-success' : 'text-destructive',
    },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label: statLabel, value, icon: Icon, color }) => (
        <Card key={statLabel}>
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="text-xs text-muted-foreground">{statLabel}</p>
              <p className={`mt-2 text-2xl font-semibold ${color}`}>{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </div>
            <Icon className={`size-5 ${color}`} aria-hidden="true" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
