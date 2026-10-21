import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { DashboardLayout } from '../../components/dashboard-layout'
import { useFinanceSummary } from '../../hooks/useFinance'
import { currentFinanceMonth, formatFinanceAmount, formatFinanceMonth } from './utils/finance-format'
import { FinanceCategoryChart } from './components/finance-category-chart'
import { FinanceError } from './components/finance-states'
import { FinanceStats } from './components/finance-stats'
import { FinanceTrendChart } from './components/finance-trend-chart'
import { RecentRecords } from './components/recent-records'

export default function FinancePage() {
  const [month, setMonth] = useState(currentFinanceMonth())
  const [months, setMonths] = useState(6)
  const { data, loading, error, refetch } = useFinanceSummary({ month: month || undefined, months })

  const period = data?.selected_period
  const periodLabel = period ? formatFinanceMonth(month) : 'all time'
  // Show the period's split when a period is selected, otherwise the all-time split.
  const breakdown = data?.breakdown_by_category

  return (
    <DashboardLayout
      title="Finance"
      subtitle="Monitor income, expenses, and supporting documents"
      breadcrumbs={[{ label: 'Finance' }]}
    >
      {loading && !data && (
        <div className="space-y-4" aria-busy="true" aria-label="Loading financial overview">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}
      {error && !data ? <FinanceError error={error} onRetry={() => void refetch()} /> : null}

      {data && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">All-time figures</p>
              <h2 className="mt-1 text-lg font-semibold">Financial overview</h2>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/finance/records/new?category=income">
                  <Plus className="size-4" />
                  Add income
                </Link>
              </Button>
              <Button asChild>
                <Link to="/finance/records/new?category=expense">
                  <Plus className="size-4" />
                  Add expense
                </Link>
              </Button>
            </div>
          </div>

          {error ? <FinanceError error={error} onRetry={() => void refetch()} /> : null}

          <FinanceStats income={data.total_income} expenses={data.total_expenses} net={data.net_balance} currency={data.currency} label="All time" />

          <Card>
            <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Selected period</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Figures for the chosen month only.</p>
              </div>
              <input
                aria-label="Selected month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="h-9 rounded-md border bg-background px-3 text-sm"
              />
            </CardHeader>
            <CardContent>
              {period ? (
                <dl className="grid gap-4 sm:grid-cols-4">
                  <Metric label={`Income · ${formatFinanceMonth(month)}`} value={formatFinanceAmount(period.income, data.currency)} tone="text-success" />
                  <Metric label="Expenses" value={formatFinanceAmount(period.expenses, data.currency)} tone="text-destructive" />
                  <Metric label="Net" value={formatFinanceAmount(period.net, data.currency)} tone={Number(period.net) >= 0 ? 'text-success' : 'text-destructive'} />
                  <Metric label="Records" value={`${period.income_count} income · ${period.expense_count} expense`} />
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">Select a period to see its figures.</p>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {breakdown && <FinanceCategoryChart income={breakdown.income} expense={breakdown.expense} currency={data.currency} periodLabel={periodLabel} />}
            <FinanceTrendChart trend={data.monthly_trend} currency={data.currency} months={months} onMonthsChange={setMonths} />
          </div>

          <RecentRecords records={data.recent_records} currency={data.currency} />
        </div>
      )}
    </DashboardLayout>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-lg font-semibold ${tone ?? ''}`}>{value}</dd>
    </div>
  )
}
