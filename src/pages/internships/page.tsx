import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { toast } from '../../hooks/use-toast'
import { opportunitiesApi } from '../../api/opportunitiesApi'
import { useOpportunitiesList, useOpportunityCounts } from '../../hooks/useOpportunities'
import { OpportunitiesEmptyState } from './components/opportunities-empty-state'
import { OpportunitiesFilters } from './components/opportunities-filters'
import { OpportunitiesError } from './components/opportunities-states'
import { OpportunitiesStats } from './components/opportunities-stats'
import { OpportunitiesTable } from './components/opportunities-table'
import { OpportunityActionDialog } from './components/opportunity-action-dialog'
import { OpportunityFormDialog } from './components/opportunity-form-dialog'
import { OpportunityPreviewDialog } from './components/opportunity-preview-dialog'
import type { Opportunity, OpportunityAction, OpportunityFilters, OpportunityType } from './types/opportunity'
import { statusFilterOptions, statusFilterParams } from './utils/opportunity-config'
import type { StatusFilter } from './utils/opportunity-config'
import { getOpportunityError } from './utils/opportunity-errors'

const PAGE_SIZE = 20

const actionDone: Record<OpportunityAction, string> = {
  publish: 'Opportunity published',
  close: 'Applications closed',
  archive: 'Opportunity archived',
}

const actionFailed: Record<OpportunityAction, string> = {
  publish: "Couldn't publish",
  close: "Couldn't close applications",
  archive: "Couldn't archive",
}

export default function InternshipsPage() {
  const [params, setParams] = useSearchParams()
  const paramsKey = params.toString()

  // Filters live in the URL so they survive reloads and can be shared.
  const { search, location, type, status, page } = useMemo(() => {
    const read = new URLSearchParams(paramsKey)
    const typeParam = read.get('type')
    const statusParam = read.get('status')
    return {
      search: read.get('search') ?? '',
      location: read.get('location') ?? '',
      type: (typeParam === 'job' || typeParam === 'internship' ? typeParam : 'all') as OpportunityType | 'all',
      status: (statusFilterOptions.some((option) => option.value === statusParam) ? statusParam : 'all') as StatusFilter,
      page: Math.max(1, Number(read.get('page')) || 1),
    }
  }, [paramsKey])

  const filters = useMemo<OpportunityFilters>(
    () => ({
      search: search.trim() || undefined,
      location: location.trim() || undefined,
      type: type === 'all' ? undefined : type,
      ...statusFilterParams[status],
      page,
      limit: PAGE_SIZE,
    }),
    [search, location, type, status, page],
  )
  const hasFilters = Boolean(filters.search || filters.location || filters.type || status !== 'all')

  const { opportunities, meta, loading, error, refetch } = useOpportunitiesList(filters)
  const counts = useOpportunityCounts()
  const refetchCounts = counts.refetch

  // The dashboard's "Post opportunity" quick action links here with ?new=1.
  const [form, setForm] = useState<{ open: boolean; item: Opportunity | null; key: number }>(() => ({
    open: params.get('new') === '1',
    item: null,
    key: 0,
  }))
  const [viewing, setViewing] = useState<Opportunity | null>(null)
  const [actionTarget, setActionTarget] = useState<{ item: Opportunity; action: OpportunityAction } | null>(null)
  const [actionPending, setActionPending] = useState(false)

  const setFilter = useCallback(
    (key: string, value: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (value && value !== 'all') next.set(key, value)
          else next.delete(key)
          next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )
  const onSearchChange = useCallback((value: string) => setFilter('search', value), [setFilter])
  const onLocationChange = useCallback((value: string) => setFilter('location', value), [setFilter])
  const clearFilters = () => setParams({}, { replace: true })

  function goToPage(next: number) {
    const search = new URLSearchParams(params)
    search.set('page', String(next))
    setParams(search)
  }

  const refreshAll = useCallback(() => {
    void refetch()
    void refetchCounts()
  }, [refetch, refetchCounts])

  function openForm(item: Opportunity | null) {
    setViewing(null)
    setForm((prev) => ({ open: true, item, key: prev.key + 1 }))
  }

  function handleFormOpenChange(open: boolean) {
    setForm((prev) => ({ ...prev, open }))
    if (!open && params.has('new')) {
      const next = new URLSearchParams(params)
      next.delete('new')
      setParams(next, { replace: true })
    }
  }

  function handleSaved(item: Opportunity, message: string) {
    handleFormOpenChange(false)
    toast({ title: message, description: item.title })
    refreshAll()
  }

  async function confirmAction() {
    if (!actionTarget) return
    const { item, action } = actionTarget
    setActionPending(true)
    try {
      const updated = await opportunitiesApi.transition(item.id, action)
      toast({ title: actionDone[action], description: updated.title })
      setViewing((current) => (current?.id === updated.id ? updated : current))
    } catch (nextError) {
      toast({ variant: 'destructive', title: actionFailed[action], description: getOpportunityError(nextError).message })
    } finally {
      setActionPending(false)
      setActionTarget(null)
      refreshAll()
    }
  }

  return (
    <DashboardLayout
      title="Jobs & Internships"
      subtitle="Publish and manage the opportunities members see in the mobile app"
      breadcrumbs={[{ label: 'Jobs & Internships' }]}
    >
      <OpportunitiesStats counts={counts.data} />

      <div className="space-y-4">
        <OpportunitiesFilters
          search={search}
          onSearchChange={onSearchChange}
          location={location}
          onLocationChange={onLocationChange}
          type={type}
          onTypeChange={(value) => setFilter('type', value)}
          status={status}
          onStatusChange={(value) => setFilter('status', value)}
          onAdd={() => openForm(null)}
        />

        {error ? (
          <OpportunitiesError error={error} onRetry={() => void refetch()} onReset={clearFilters} />
        ) : (
          <Card className="border-border py-0">
            {loading && opportunities.length === 0 ? (
              <div className="space-y-2 p-4" aria-busy="true" aria-label="Loading opportunities">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full" />
                ))}
              </div>
            ) : opportunities.length > 0 ? (
              <div className={loading ? 'opacity-60 transition-opacity' : undefined}>
                <OpportunitiesTable
                  opportunities={opportunities}
                  onView={setViewing}
                  onEdit={openForm}
                  onAction={(item, action) => setActionTarget({ item, action })}
                />
              </div>
            ) : (
              <OpportunitiesEmptyState hasFilters={hasFilters} onAdd={() => openForm(null)} onClear={clearFilters} />
            )}
          </Card>
        )}

        {meta && meta.pages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Page {meta.page} of {meta.pages} · {meta.total} listings
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

      <OpportunityPreviewDialog
        opportunity={viewing}
        onOpenChange={(open) => {
          if (!open) setViewing(null)
        }}
        onEdit={openForm}
        onAction={(item, action) => setActionTarget({ item, action })}
      />

      <OpportunityFormDialog
        key={form.key}
        open={form.open}
        opportunity={form.item}
        onOpenChange={handleFormOpenChange}
        onSaved={handleSaved}
        onChanged={refreshAll}
      />

      <OpportunityActionDialog
        target={actionTarget}
        pending={actionPending}
        onCancel={() => setActionTarget(null)}
        onConfirm={() => void confirmAction()}
      />
    </DashboardLayout>
  )
}
