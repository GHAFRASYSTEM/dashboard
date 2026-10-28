import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../../components/ui/sheet'

const selectClass = 'h-9 w-full rounded-md border bg-background px-3 text-sm'

const filterKeys = ['search', 'category', 'month', 'date_from', 'date_to', 'min_amount', 'max_amount', 'has_document']

const filterLabels: Record<string, string> = {
  search: 'Search',
  category: 'Type',
  month: 'Month',
  date_from: 'From',
  date_to: 'To',
  min_amount: 'Min',
  max_amount: 'Max',
  has_document: 'Has receipt',
}

// Filter state lives in the URL so refresh, back and share links all work.
export function FinanceFilters() {
  const [params, setParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(params.get('search') ?? '')

  // Replace history entries for filter edits so Back leaves the page instead of stepping through keystrokes.
  function apply(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    next.delete('page')
    setParams(next, { replace: true })
  }

  // Debounce the search box (350 ms) before it reaches the URL / API.
  useEffect(() => {
    const current = params.get('search') ?? ''
    if (searchInput === current) return
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(params)
      if (searchInput) next.set('search', searchInput)
      else next.delete('search')
      next.delete('page')
      setParams(next, { replace: true })
    }, 350)
    return () => window.clearTimeout(timer)
  }, [searchInput, params, setParams])

  // Keep the box in sync when the URL changes elsewhere (clear filters, back button).
  const urlSearch = params.get('search') ?? ''
  useEffect(() => {
    setSearchInput(urlSearch)
  }, [urlSearch])

  const active = filterKeys.filter((key) => params.get(key))
  const sort = `${params.get('sort_by') ?? 'transaction_date'}:${params.get('sort_order') ?? 'desc'}`

  const renderFields = (p: string) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-1">
        <Label htmlFor={`${p}-category`}>Type</Label>
        <select id={`${p}-category`} className={selectClass} value={params.get('category') ?? ''} onChange={(e) => apply({ category: e.target.value || null })}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-month`}>Month</Label>
        <Input id={`${p}-month`} type="month" value={params.get('month') ?? ''} onChange={(e) => apply({ month: e.target.value || null, date_from: null, date_to: null })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-from`}>From</Label>
        <Input id={`${p}-from`} type="date" value={params.get('date_from') ?? ''} max={params.get('date_to') ?? undefined} onChange={(e) => apply({ date_from: e.target.value || null, month: null })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-to`}>To</Label>
        <Input id={`${p}-to`} type="date" value={params.get('date_to') ?? ''} min={params.get('date_from') ?? undefined} onChange={(e) => apply({ date_to: e.target.value || null, month: null })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-min`}>Min amount</Label>
        <Input id={`${p}-min`} type="number" min="0" step="0.01" value={params.get('min_amount') ?? ''} onChange={(e) => apply({ min_amount: e.target.value || null })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-max`}>Max amount</Label>
        <Input id={`${p}-max`} type="number" min="0" step="0.01" value={params.get('max_amount') ?? ''} onChange={(e) => apply({ max_amount: e.target.value || null })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${p}-sort`}>Sort by</Label>
        <select
          id={`${p}-sort`}
          className={selectClass}
          value={sort}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split(':')
            apply({ sort_by: sortBy, sort_order: sortOrder })
          }}
        >
          <option value="transaction_date:desc">Newest first</option>
          <option value="transaction_date:asc">Oldest first</option>
          <option value="amount:desc">Largest amount</option>
          <option value="amount:asc">Smallest amount</option>
        </select>
      </div>
      <label className="flex items-end gap-2 pb-2 text-sm">
        <input type="checkbox" checked={params.get('has_document') === 'true'} onChange={(e) => apply({ has_document: e.target.checked ? 'true' : null })} />
        Has receipt
      </label>
    </div>
  )

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-52 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input aria-label="Search purpose or counterparty" value={searchInput} placeholder="Search purpose or counterparty" className="pl-9" onChange={(e) => setSearchInput(e.target.value)} />
          </div>
          {/* Small screens collapse the remaining filters into a sheet. */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="size-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto p-4">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              {renderFields("sheet")}
            </SheetContent>
          </Sheet>
          <Button variant="ghost" onClick={() => setParams({}, { replace: true })} disabled={active.length === 0 && !params.get('sort_by')}>
            Clear filters
          </Button>
        </div>
        <div className="hidden lg:block">{renderFields("inline")}</div>
        {active.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Active filters">
            {active.map((key) => (
              <li key={key} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                {filterLabels[key]}: {key === 'has_document' ? 'yes' : params.get(key)}
                <button type="button" aria-label={`Remove ${filterLabels[key]} filter`} onClick={() => apply({ [key]: null })}>
                  <X className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
