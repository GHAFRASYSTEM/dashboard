import { apiFetch } from './api'

type Envelope<T> = { success: boolean; data: T; meta?: { total: number; page: number; limit: number; pages: number } }

export const NOTIFICATION_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'meetings', label: 'Meetings' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'dues', label: 'Dues' },
  { value: 'announcements', label: 'News & updates' },
  { value: 'french_practice', label: 'French practice' },
  { value: 'opportunities', label: 'Jobs & internships' },
] as const

export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number]['value']

export type Audience =
  | { type: 'all' }
  | { type: 'users'; userIds: string[] }
  | { type: 'unpaid_dues'; month: number; year: number }
  | { type: 'not_checked_in'; meetingId: string }
  | { type: 'not_practiced_today'; day: string }
  | { type: 'city'; city: string }

export type SendInput = {
  category: NotificationCategory
  title: string
  body: string
  audience: Audience
  channels: ('push' | 'email')[]
  route?: string
}

export type SendResult = {
  campaignId: string | null
  recipients: number
  pushSent: number
  pushFailed: number
  emailsSent: number
}

export type Campaign = {
  id: string
  category: NotificationCategory
  title: string
  body: string
  audience: Audience
  channels: string[]
  source: 'manual' | 'automatic'
  recipients: number
  push_sent: number
  push_failed: number
  emails_sent: number
  created_at: string
  sender: { name: string | null; email: string | null } | null
}

export const notificationsApi = {
  send: (input: SendInput) =>
    apiFetch<Envelope<SendResult>>('/notifications/admin/send', { method: 'POST', body: JSON.stringify(input) }).then(r => r.data),

  preview: (audience: Audience) =>
    apiFetch<Envelope<{ recipients: number }>>('/notifications/admin/preview', { method: 'POST', body: JSON.stringify({ audience }) }).then(r => r.data),

  campaigns: (page = 1, limit = 20) =>
    apiFetch<Envelope<Campaign[]>>(`/notifications/admin/campaigns?page=${page}&limit=${limit}`),
}

export type AppSettings = { card_section_enabled: boolean }

export const settingsApi = {
  get: () => apiFetch<Envelope<AppSettings>>('/settings').then(r => r.data),
  update: (patch: Partial<AppSettings>) =>
    apiFetch<Envelope<AppSettings>>('/settings', { method: 'PATCH', body: JSON.stringify(patch) }).then(r => r.data),
}
