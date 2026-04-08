import { apiFetch } from './api'
import type { Announcement } from '../pages/announcements/types/announcement'

export async function getAnnouncements(
  page = 1,
  limit = 10
) {
  return apiFetch<{
    data: Announcement[]
    total: number
    page: number
    limit: number
  }>(`/announcements?page=${page}&limit=${limit}`)
}

export async function getAnnouncement(id: string) {
  return apiFetch<Announcement>(`/announcements/${id}`)
}

export async function createAnnouncement(input: {
  category: string
  title: string
  body: string
  image?: string
}) {
  return apiFetch<Announcement>(`/announcements`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function updateAnnouncement(
  id: string,
  input: Partial<{
    category: string
    title: string
    body: string
    image: string
  }>
) {
  return apiFetch<Announcement>(`/announcements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export async function deleteAnnouncement(id: string) {
  return apiFetch<{ deleted: true; id: string }>(
    `/announcements/${id}`,
    { method: 'DELETE' }
  )
}
