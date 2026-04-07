import type { Contribution } from '../types/contribution'

export const statusMap: Record<
  Contribution['status'],
  { label: string; className: string }
> = {
  paid: {
    label: 'Paid',
    className: 'bg-success/10 text-success',
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning',
  },
  overdue: {
    label: 'Overdue',
    className: 'bg-destructive/10 text-destructive',
  },
}