import type { LucideIcon } from 'lucide-react'
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import type { Internship } from '../types/internship'

type BadgeConfig = {
  label: string
  className: string
}

type StatusBadgeConfig = BadgeConfig & {
  icon: LucideIcon
}

export const typeConfig: Record<Internship['type'], BadgeConfig> = {
  remote: {
    label: 'Remote',
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  onsite: {
    label: 'On-site',
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  hybrid: {
    label: 'Hybrid',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
}

export const contractTypeConfig: Record<Internship['contractType'], BadgeConfig> = {
  internship: {
    label: 'Internship',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  fulltime: {
    label: 'Permanent Job',
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  alternance: {
    label: 'Alternance',
    className: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  },
}

export const statusConfig: Record<Internship['status'], StatusBadgeConfig> = {
  active: {
    label: 'Active',
    icon: CheckCircle2,
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  pending: {
    label: 'Pending',
    icon: AlertCircle,
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  inactive: {
    label: 'Closed',
    icon: XCircle,
    className: 'bg-muted text-muted-foreground border-border',
  },
}