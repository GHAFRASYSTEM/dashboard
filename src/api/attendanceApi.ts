import { apiFetch } from './api'

type Envelope<T> = { success: boolean; data: T; meta?: { total: number; page: number; limit: number; pages: number } }

export type MeetingStatus = 'upcoming' | 'cancelled' | 'completed'

export type Meeting = {
  id: string
  title: string
  description: string | null
  location_name: string | null
  meeting_date: string
  starts_at: string | null
  ends_at: string | null
  latitude: number
  longitude: number
  radius_m: number
  is_active: boolean
  cancelled_at: string | null
  created_at: string
  updated_at: string
  status: MeetingStatus
  check_in_code?: string
}

export type RosterMember = {
  record_id: string | null
  user_id: string
  member: { id: string; name: string | null; email: string | null; photo_url: string | null } | null
  status: 'Attended' | 'Unavailable'
  recorded_at: string | null
  validation_status: 'geofence_verified' | 'admin_override' | null
  distance_m: number | null
}

export type Roster = {
  meeting: Meeting
  totals: { expected: number; attended: number; unavailable: number }
  members: RosterMember[]
}

export type MonthlySummary = {
  year: number
  month: number
  totals: { meetings: number; attended: number; unavailable: number }
  meetings: { meeting_id: string; title: string; meeting_date: string; status: MeetingStatus; expected: number; attended: number; unavailable: number }[]
}

export type MeetingInput = {
  title: string
  description?: string | null
  location_name?: string | null
  meeting_date: string
  starts_at?: string | null
  ends_at?: string | null
  latitude: number
  longitude: number
  radius_m: number
  is_active?: boolean
}

const unwrap = <T,>(p: Promise<Envelope<T>>) => p.then(r => r.data)

export const attendanceApi = {
  listMeetings: (status?: MeetingStatus, page = 1, limit = 50) =>
    apiFetch<Envelope<Meeting[]>>(`/attendance/meetings?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`),

  createMeeting: (input: MeetingInput) =>
    unwrap(apiFetch<Envelope<Meeting>>('/attendance/meetings', { method: 'POST', body: JSON.stringify(input) })),

  updateMeeting: (id: string, input: Partial<MeetingInput> & { cancelled?: boolean }) =>
    unwrap(apiFetch<Envelope<Meeting>>(`/attendance/meetings/${id}`, { method: 'PATCH', body: JSON.stringify(input) })),

  setActive: (id: string, is_active: boolean) =>
    unwrap(apiFetch<Envelope<Meeting>>(`/attendance/meetings/${id}/active`, { method: 'PATCH', body: JSON.stringify({ is_active }) })),

  deleteMeeting: (id: string) =>
    unwrap(apiFetch<Envelope<{ deleted: boolean }>>(`/attendance/meetings/${id}`, { method: 'DELETE' })),

  getCode: (id: string) =>
    unwrap(apiFetch<Envelope<{ meeting_id: string; check_in_code: string }>>(`/attendance/meetings/${id}/code`)),

  regenerateCode: (id: string) =>
    unwrap(apiFetch<Envelope<{ meeting_id: string; check_in_code: string }>>(`/attendance/meetings/${id}/code`, { method: 'POST' })),

  roster: (id: string) =>
    unwrap(apiFetch<Envelope<Roster>>(`/attendance/meetings/${id}/roster`)),

  markManually: (id: string, user_id: string) =>
    unwrap(apiFetch<Envelope<unknown>>(`/attendance/meetings/${id}/records`, { method: 'POST', body: JSON.stringify({ user_id }) })),

  deleteRecord: (recordId: string) =>
    unwrap(apiFetch<Envelope<unknown>>(`/attendance/records/${recordId}`, { method: 'DELETE' })),

  summary: (year: number, month: number) =>
    unwrap(apiFetch<Envelope<MonthlySummary>>(`/attendance/summary?year=${year}&month=${month}`)),
}

/** Readable message from an apiFetch rejection ({ status, data }). */
export function apiErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  const e = err as { status?: number; data?: { error?: { message?: string; issues?: { field: string; message: string }[] } } }
  const issues = e?.data?.error?.issues
  if (issues?.length) return issues.map(i => `${i.field}: ${i.message}`).join(' · ')
  return e?.data?.error?.message ?? fallback
}
