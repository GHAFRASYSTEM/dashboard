import { useCallback, useEffect, useRef, useState } from 'react'
import { financeApi } from '../api/financeApi'
import type { FinanceSummaryParams } from '../api/financeApi'
import { getFinanceCurrency, setFinanceCurrency } from '../pages/finance/utils/finance-format'
import type {
  FinanceFilters,
  FinanceListResponse,
  FinanceRecord,
  FinanceSummary,
} from '../pages/finance/types/finance'

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

export function useFinanceList(filters: FinanceFilters) {
  const key = JSON.stringify(filters)
  const load = useCallback(
    (signal: AbortSignal) => financeApi.list(JSON.parse(key) as FinanceFilters, signal),
    [key],
  )
  const { data, ...rest } = useAsyncResource<FinanceListResponse>(load)
  return { records: data?.data ?? [], meta: data?.meta, periodTotals: data?.period_totals, ...rest }
}

export function useFinanceSummary(params: FinanceSummaryParams = {}) {
  const key = JSON.stringify(params)
  const load = useCallback(async (signal: AbortSignal) => {
    const summary: FinanceSummary = await financeApi.summary(JSON.parse(key) as FinanceSummaryParams, signal)
    setFinanceCurrency(summary.currency)
    return summary
  }, [key])
  return useAsyncResource<FinanceSummary>(load)
}

export function useFinanceRecord(id: string) {
  const load = useCallback((signal: AbortSignal) => financeApi.getOne(id, signal), [id])
  return useAsyncResource<FinanceRecord>(load)
}

// Currency comes from /summary; fetch it once and reuse it on the records pages.
export function useFinanceCurrency() {
  const [currency, setCurrency] = useState(getFinanceCurrency())
  useEffect(() => {
    if (currency) return
    let active = true
    financeApi
      .summary()
      .then((summary) => {
        setFinanceCurrency(summary.currency)
        if (active) setCurrency(summary.currency)
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [currency])
  return currency ?? 'EUR'
}
