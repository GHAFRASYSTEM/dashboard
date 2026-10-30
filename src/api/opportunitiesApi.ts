import { apiFetch } from './api'
import type {
  Opportunity,
  OpportunityAction,
  OpportunityFilters,
  OpportunityListResponse,
  OpportunityPayload,
} from '../pages/internships/types/opportunity'

// Admin endpoints: every call requires a signed-in user whose profile role is 'admin'.
const BASE = '/opportunities/admin'

function query(params: object) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value))
  })
  const value = search.toString()
  return value ? `?${value}` : ''
}

export const opportunitiesApi = {
  async list(filters: OpportunityFilters = {}, signal?: AbortSignal): Promise<OpportunityListResponse> {
    const res = await apiFetch<OpportunityListResponse>(`${BASE}${query(filters)}`, { signal })
    return { data: res.data, meta: res.meta }
  },

  async getOne(id: string, signal?: AbortSignal) {
    const res = await apiFetch<{ data: Opportunity }>(`${BASE}/${id}`, { signal })
    return res.data
  },

  // New opportunities always start as drafts.
  async create(payload: OpportunityPayload) {
    const res = await apiFetch<{ data: Opportunity }>(BASE, { method: 'POST', body: JSON.stringify(payload) })
    return res.data
  },

  async update(id: string, changes: Partial<OpportunityPayload>) {
    const res = await apiFetch<{ data: Opportunity }>(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(changes) })
    return res.data
  },

  // publish: draft/closed → published, close: published → closed, archive: any → archived (final).
  async transition(id: string, action: OpportunityAction) {
    const res = await apiFetch<{ data: Opportunity }>(`${BASE}/${id}/${action}`, { method: 'POST' })
    return res.data
  },
}
