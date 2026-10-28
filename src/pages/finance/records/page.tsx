import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { Button } from '../../../components/ui/button'
import { Skeleton } from '../../../components/ui/skeleton'
import { FinanceFilters } from '../components/finance-filters'
import { FinanceError } from '../components/finance-states'
import { FinanceRecordsTable } from '../components/finance-records-table'
import { FinanceStats } from '../components/finance-stats'
import { useFinanceCurrency, useFinanceList } from '../../../hooks/useFinance'
import type { FinanceCategory, FinanceFilters as Filters } from '../types/finance'

const PAGE_SIZE = 20

export default function FinanceRecordsPage() {
  const [params, setParams] = useSearchParams()
  const currency = useFinanceCurrency()
  const page = Math.max(1, Number(params.get('page')) || 1)
  const paramsKey = params.toString()

  const filters = useMemo<Filters>(() => {
    const read = new URLSearchParams(paramsKey)
    return {
      category: (read.get('category') as FinanceCategory) || undefined,
      month: read.get('month') || undefined,
      date_from: read.get('date_from') || undefined,
      date_to: read.get('date_to') || undefined,
      search: read.get('search') || undefined,
      min_amount: read.get('min_amount') || undefined,
      max_amount: read.get('max_amount') || undefined,
      has_document: read.get('has_document') === 'true' ? true : undefined,
      sort_by: read.get('sort_by') || 'transaction_date',
      sort_order: (read.get('sort_order') as 'asc' | 'desc') || 'desc',
      page: Math.max(1, Number(read.get('page')) || 1),
      limit: PAGE_SIZE,
    }
  }, [paramsKey])

  const { records, meta, periodTotals, loading, error, refetch } = useFinanceList(filters)
  const clear = () => setParams({}, { replace: true })

  function goToPage(next: number) {
    const search = new URLSearchParams(params)
    search.set('page', String(next))
    setParams(search)
  }

  return (
    <DashboardLayout
      title="Financial records"
      subtitle="Search and manage income and expenses"
      breadcrumbs={[{ label: 'Finance', href: '/finance' }, { label: 'Records' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Records</h2>
            <p className="text-sm text-muted-foreground">Totals reflect the current filters across all pages.</p>
          </div>
          <Button asChild>
            <Link to="/finance/records/new">
              <Plus className="size-4" />
              Add record
            </Link>
          </Button>
        </div>

        {periodTotals && (
          <FinanceStats
            income={periodTotals.income}
            expenses={periodTotals.expenses}
            net={periodTotals.net}
            currency={currency}
            label="Current filters"
            hideNet={Boolean(filters.category)}
          />
        )}

        <FinanceFilters />

        {loading && records.length === 0 && !error && (
          <div className="space-y-2" aria-busy="true" aria-label="Loading records">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        )}
        {error ? <FinanceError error={error} onRetry={() => void refetch()} onReset={clear} /> : null}
        {!error && (!loading || records.length > 0) && (
          <div className={loading ? 'opacity-60 transition-opacity' : undefined}>
            <FinanceRecordsTable records={records} currency={currency} onClear={clear} />
          </div>
        )}

        {meta && meta.pages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Page {meta.page} of {meta.pages} · {meta.total} records
            </span>
            <div className="flex gap-2">
              <Button variant="outline" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                Previous
              </Button>
              <Button variant="outline" disabled={page >= meta.pages} onClick={() => goToPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
