import type { LucideIcon } from 'lucide-react'
import { AlertCircle, Archive, CheckCircle2, PencilLine, XCircle } from 'lucide-react'
import type {
  ApplicationMethod,
  Opportunity,
  OpportunityAvailability,
  OpportunityFilters,
  OpportunityType,
} from '../types/opportunity'

type BadgeConfig = {
  label: string
  className: string
}

type StatusBadgeConfig = BadgeConfig & {
  icon: LucideIcon
}

export const typeConfig: Record<OpportunityType, BadgeConfig> = {
  job: {
    label: 'Job',
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  internship: {
    label: 'Internship',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
}

// `availability` is computed by the backend from status + deadline, so it is what the badge shows.
export const availabilityConfig: Record<OpportunityAvailability, StatusBadgeConfig> = {
  open: {
    label: 'Live',
    icon: CheckCircle2,
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  expired: {
    label: 'Expired',
    icon: AlertCircle,
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  draft: {
    label: 'Draft',
    icon: PencilLine,
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    className: 'bg-muted text-muted-foreground border-border',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    className: 'bg-muted text-muted-foreground border-border',
  },
}

export const applicationMethodLabels: Record<ApplicationMethod, string> = {
  url: 'Apply online (link)',
  email: 'Apply by email',
  other: 'Other instructions',
}

// The status filter is availability-based; `live` and `expired` both map to published listings.
export type StatusFilter = 'all' | 'draft' | 'live' | 'expired' | 'closed' | 'archived'

export const statusFilterOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'live', label: 'Live' },
  { value: 'expired', label: 'Expired' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
]

export const statusFilterParams: Record<StatusFilter, Pick<OpportunityFilters, 'status' | 'expired'>> = {
  all: {},
  draft: { status: 'draft' },
  live: { status: 'published', expired: false },
  expired: { status: 'published', expired: true },
  closed: { status: 'closed' },
  archived: { status: 'archived' },
}

// Values are "<sort_by>:<sort_order>" for /opportunities/admin. Listings without the field sort last.
export const DEFAULT_SORT = 'created_at:desc'

export const sortOptions: { value: string; label: string }[] = [
  { value: 'created_at:desc', label: 'Newest first' },
  { value: 'created_at:asc', label: 'Oldest first' },
  { value: 'updated_at:desc', label: 'Recently updated' },
  { value: 'published_at:desc', label: 'Recently published' },
  { value: 'application_deadline:asc', label: 'Deadline: soonest first' },
  { value: 'title:asc', label: 'Title A–Z' },
]

// Allowed transitions, mirroring the backend state machine. Archived is final.
export const canEdit = (item: Opportunity) => item.status !== 'archived'
export const canPublish = (item: Opportunity) => item.status === 'draft' || item.status === 'closed'
export const canClose = (item: Opportunity) => item.status === 'published'
export const canArchive = (item: Opportunity) => item.status !== 'archived'
