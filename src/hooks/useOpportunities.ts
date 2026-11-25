import { useCallback, useEffect, useRef, useState } from 'react'
import { opportunitiesApi } from '../api/opportunitiesApi'
import type {
  OpportunityFilters,
  OpportunityListResponse,
} from '../pages/internships/types/opportunity'

// Loads a resource and aborts the in-flight request when inputs change, so stale responses are ignored.
function useAsyncResource<T>(load: (signal: AbortSignal) => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const controller = useRef<AbortController | null>(null)

  const refetch = useCallback(async () => {
    controller.current?.abort()
    const next = new AbortController()
    controller.current = next
    setLoading(true)
    try {
      const result = await load(next.signal)
      if (next.signal.aborted) return
      setData(result)
      setError(null)
    } catch (nextError) {
      if (next.signal.aborted) return
      setError(nextError)
    } finally {
      if (!next.signal.aborted) setLoading(false)
    }
  }, [load])

  useEffect(() => {
    void refetch()
    return () => controller.current?.abort()
  }, [refetch])

  return { data, error, loading, refetch }
}

export function useOpportunitiesList(filters: OpportunityFilters) {
  const key = JSON.stringify(filters)
  const load = useCallback(
    (signal: AbortSignal) => opportunitiesApi.list(JSON.parse(key) as OpportunityFilters, signal),
    [key],
  )
  const { data, ...rest } = useAsyncResource<OpportunityListResponse>(load)
  return { opportunities: data?.data ?? [], meta: data?.meta, ...rest }
}

export type OpportunityCounts = {
  live: number
  drafts: number
  expired: number
  closed: number
}

// Each count is a one-row admin list query; only `meta.total` is used.
const countQueries: Record<keyof OpportunityCounts, OpportunityFilters> = {
  live: { status: 'published', expired: false },
  drafts: { status: 'draft' },
  expired: { status: 'published', expired: true },
  closed: { status: 'closed' },
}

export function useOpportunityCounts() {
  const load = useCallback(async (signal: AbortSignal) => {
    const entries = await Promise.all(
      Object.entries(countQueries).map(async ([name, filters]) => {
        const res = await opportunitiesApi.list({ ...filters, page: 1, limit: 1 }, signal)
        return [name, res.meta.total] as const
      }),
    )
    return Object.fromEntries(entries) as OpportunityCounts
  }, [])
  return useAsyncResource<OpportunityCounts>(load)
}
