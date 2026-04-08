export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusConfig(status: string) {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        dot: 'bg-emerald-500',
        badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      }
    case 'inactive':
      return {
        label: 'Inactive',
        dot: 'bg-zinc-400',
        badge: 'bg-destructive/10 text-destructive border-destructive/20',
      }
    case 'pending':
      return {
        label: 'Pending',
        dot: 'bg-amber-400',
        badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      }
    default:
      return {
        label: status,
        dot: 'bg-zinc-400',
        badge: 'bg-muted text-muted-foreground',
      }
  }
}