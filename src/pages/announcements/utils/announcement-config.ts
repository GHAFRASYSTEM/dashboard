import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Users,
} from 'lucide-react'
import type { Announcement } from '../types/announcement'

type ConfigItem = {
  label: string
  className: string
  icon: LucideIcon
}

type AudienceConfigItem = {
  label: string
  description: string
  icon: LucideIcon
}

export const priorityConfig: Record<Announcement['priority'], ConfigItem> = {
  low: {
    label: 'Low Priority',
    className:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    icon: CheckCircle2,
  },
  medium: {
    label: 'Medium Priority',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: Clock,
  },
  high: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: AlertTriangle,
  },
}

export const statusConfig: Record<Announcement['status'], ConfigItem> = {
  published: {
    label: 'Published',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: Eye,
  },
  draft: {
    label: 'Draft',
    className:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    icon: FileText,
  },
  pending: {
    label: 'Scheduled',
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Clock,
  },
}

export const audienceConfig: Record<Announcement['audience'], AudienceConfigItem> = {
  all: {
    label: 'Everyone',
    description: 'Visible to all users',
    icon: Users,
  },
  members: {
    label: 'Members Only',
    description: 'Visible to registered members',
    icon: Users,
  },
  executives: {
    label: 'Executives',
    description: 'Visible to executive team only',
    icon: Users,
  },
}