import type { LucideIcon } from 'lucide-react'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import type { MarketplaceAd } from '../types/marketplace'

type StatusConfigItem = {
  label: string
  color: string
  icon: LucideIcon
}

type ConditionConfigItem = {
  label: string
  color: string
}

export const statusConfig: Record<MarketplaceAd['status'], StatusConfigItem> = {
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock,
  },
  approved: {
    label: 'Published',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: XCircle,
  },
}

export const conditionConfig: Record<MarketplaceAd['condition'], ConditionConfigItem> = {
  new: {
    label: 'New',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  'like-new': {
    label: 'Like New',
    color: 'bg-blue-500/10 text-blue-600',
  },
  good: {
    label: 'Good',
    color: 'bg-amber-500/10 text-amber-600',
  },
  fair: {
    label: 'Fair',
    color: 'bg-orange-500/10 text-orange-600',
  },
}