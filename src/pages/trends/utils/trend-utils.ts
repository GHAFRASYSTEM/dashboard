import type { Trend } from '../types/trends'

export const CATEGORIES = [
  'General',
  'Community',
  'Events',
  'Health',
  'Business',
  'Technology',
  'Culture',
]

export const statusStyles: Record<Trend['status'], string> = {
  published: 'bg-primary/10 text-primary border-primary/20',
  draft: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-warning/10 text-warning border-warning/20',
}

export const detailStatusStyles: Record<Trend['status'], string> = {
  published: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  draft: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}