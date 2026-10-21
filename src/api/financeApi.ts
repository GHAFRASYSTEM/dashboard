 import { apiFetch } from './api'
import type {
  FinanceFilters,
  FinanceListResponse,
  FinanceRecord,
  FinanceRecordPayload,
  FinanceSummary,
} from '../pages/finance/types/finance'

// Flip to true to work without the backend. Remove together with the mock once integrated.
const useMockFinance = false

const BASE = '/organization-finance'

export type FinanceSummaryParams = {
  month?: string
  date_from?: string
  date_to?: string
  months?: number
}

function query(params: object) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value))
  })
  const value = search.toString()
  return value ? `?${value}` : ''
}

const mockSummary: FinanceSummary = {
  currency: 'EUR',
  total_income: '0.00',
  total_expenses: '0.00',
  net_balance: '0.00',
  selected_period: null,
  breakdown_by_category: { income: '0.00', expense: '0.00' },
  monthly_trend: [],
  recent_records: [],
}

const mockList: FinanceListResponse = {
  data: [],
  meta: { page: 1, limit: 20, total: 0, pages: 0 },
  period_totals: { income: '0.00', expenses: '0.00', net: '0.00' },
}

function buildFormData(payload: Partial<FinanceRecordPayload> & { remove_document?: boolean }) {
  const body = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return
    body.append(key, value instanceof File ? value : String(value))
  })
  return body
}

export const financeApi = {
  async list(filters: FinanceFilters = {}, signal?: AbortSignal): Promise<FinanceListResponse> {
    if (useMockFinance) return mockList
    // Lists carry `meta` and `period_totals` beside `data`, so keep the whole envelope.
    const res = await apiFetch<FinanceListResponse>(`${BASE}${query(filters)}`, { signal })
    return { data: res.data, meta: res.meta, period_totals: res.period_totals }
  },

  async summary(params: FinanceSummaryParams = {}, signal?: AbortSignal) {
    if (useMockFinance) return mockSummary
    const res = await apiFetch<{ data: FinanceSummary }>(`${BASE}/summary${query(params)}`, { signal })
    return res.data
  },

  async getOne(id: string, signal?: AbortSignal) {
    const res = await apiFetch<{ data: FinanceRecord }>(`${BASE}/${id}`, { signal })
    return res.data
  },

  async create(payload: FinanceRecordPayload) {
    const res = await apiFetch<{ data: FinanceRecord }>(BASE, { method: 'POST', body: buildFormData(payload) })
    return res.data
  },

  async update(id: string, payload: Partial<FinanceRecordPayload> & { remove_document?: boolean }) {
    const res = await apiFetch<{ data: FinanceRecord }>(`${BASE}/${id}`, { method: 'PATCH', body: buildFormData(payload) })
    return res.data
  },

  async remove(id: string) {
    await apiFetch(`${BASE}/${id}`, { method: 'DELETE' })
  },
}
