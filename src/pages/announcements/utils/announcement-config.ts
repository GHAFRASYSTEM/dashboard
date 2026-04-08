import type { AnnouncementCategory } from '../types/announcement'

export const CATEGORY_CONFIG: Record<
  AnnouncementCategory,
  { label: string; color: string; bg: string; dot: string }
> = {
  news:     { label: 'News',     color: 'text-blue-700',    bg: 'bg-blue-50',    dot: 'bg-blue-500' },
  event:    { label: 'Event',    color: 'text-violet-700',  bg: 'bg-violet-50',  dot: 'bg-violet-500' },
  housing:  { label: 'Housing',  color: 'text-amber-700',   bg: 'bg-amber-50',   dot: 'bg-amber-500' },
  personal: { label: 'Personal', color: 'text-rose-700',    bg: 'bg-rose-50',    dot: 'bg-rose-500' },
  update:   { label: 'Update',   color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
}

export const CATEGORY_OPTIONS: { value: AnnouncementCategory; label: string }[] = [
  { value: 'news',     label: 'News' },
  { value: 'event',    label: 'Event' },
  { value: 'housing',  label: 'Housing' },
  { value: 'personal', label: 'Personal' },
  { value: 'update',   label: 'Update' },
]