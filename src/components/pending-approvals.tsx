import { cn } from '../lib/utils'
import { Check, X } from 'lucide-react'

interface Approval {
  id: string
  name: string
  initials: string
  type: string
  status: 'pending' | 'review'
  avatarColor: string
}

const approvals: Approval[] = [
  {
    id: '1',
    name: 'Kwame Asante',
    initials: 'KA',
    type: 'Membership request',
    status: 'pending',
    avatarColor: 'bg-primary/15 text-primary',
  },
  {
    id: '2',
    name: 'Zara Mensah',
    initials: 'ZM',
    type: 'Marketing service',
    status: 'review',
    avatarColor: 'bg-info/15 text-info',
  },
  {
    id: '3',
    name: 'Femi Okafor',
    initials: 'FO',
    type: 'Housing listing',
    status: 'pending',
    avatarColor: 'bg-warning/15 text-warning',
  },
  {
    id: '4',
    name: 'Ama Boateng',
    initials: 'AB',
    type: 'Internship application',
    status: 'pending',
    avatarColor: 'bg-primary/15 text-primary',
  },
  {
    id: '5',
    name: 'Kofi Adu',
    initials: 'KA',
    type: 'Membership request',
    status: 'review',
    avatarColor: 'bg-info/15 text-info',
  },
]

const statusBadge: Record<Approval['status'], string> = {
  pending: 'bg-warning/10 text-warning',
  review: 'bg-info/10 text-info',
}

const statusLabel: Record<Approval['status'], string> = {
  pending: 'Pending',
  review: 'In review',
}

export function PendingApprovals() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-[14px] font-medium text-foreground">Pending Approvals</h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">{approvals.length} items awaiting review</p>
        </div>
        <button className="text-[12px] font-medium text-primary hover:text-primary/80 transition-colors">
          Review all →
        </button>
      </div>

      <div className="divide-y divide-border">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40"
          >
            {/* Avatar */}
            <div
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold',
                item.avatarColor
              )}
            >
              {item.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-foreground truncate leading-tight">
                {item.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{item.type}</p>
            </div>

            {/* Status badge */}
            <span
              className={cn(
                'hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium sm:block',
                statusBadge[item.status]
              )}
            >
              {statusLabel[item.status]}
            </span>

            {/* Action buttons */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                <Check className="size-3.5" />
              </button>
              <button className="flex size-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20">
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
