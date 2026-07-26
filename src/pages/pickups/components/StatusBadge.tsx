import type { PickupStatus } from '../types/pickup';

const STYLES: Record<PickupStatus, string> = {
  pending:   'bg-amber-500/10 text-amber-600',
  assigned:  'bg-primary/10 text-primary',
  completed: 'bg-emerald-500/10 text-emerald-600',
  cancelled: 'bg-muted text-muted-foreground',
};

const LABELS: Record<PickupStatus, string> = {
  pending:   'Needs a buddy',
  assigned:  'Buddy assigned',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function StatusBadge({ status }: { status: PickupStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}