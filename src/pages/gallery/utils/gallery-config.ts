export const MEDIA_CATEGORIES = ['All', 'Events', 'Community', 'Meetings', 'Training', 'Sports']

export const TYPE_FILTERS = ['All Media', 'Pictures', 'Videos'] as const

export const getCategoryColor = (category: string) => {
  const map: Record<string, string> = {
    Events: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    Community: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Meetings: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Training: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Sports: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }

  return map[category] ?? 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30'
}