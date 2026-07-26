import type { PickupStatus, Gare } from '../types/pickup';

const STATUS_TABS: { value: PickupStatus | 'all'; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'pending',   label: 'Needs a buddy' },
  { value: 'assigned',  label: 'Assigned' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const GARES: Gare[] = ['Lille Flandres', 'Lille Europe'];

type Props = {
  status:   PickupStatus | 'all';
  gare:     Gare | 'all';
  onStatus: (s: PickupStatus | 'all') => void;
  onGare:   (g: Gare | 'all') => void;
};

export function PickupFiltersBar({ status, gare, onStatus, onGare }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1.5">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onStatus(tab.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <select
        value={gare}
        onChange={e => onGare(e.target.value as Gare | 'all')}
        className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground"
      >
        <option value="all">All stations</option>
        {GARES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
    </div>
  );
}