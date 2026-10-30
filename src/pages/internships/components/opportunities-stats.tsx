import type { LucideIcon } from 'lucide-react'
import { AlertCircle, CheckCircle2, PencilLine, XCircle } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import type { OpportunityCounts } from '../../../hooks/useOpportunities'

const cards: {
  key: keyof OpportunityCounts
  label: string
  icon: LucideIcon
  tone: string
  iconTone: string
}[] = [
  {
    key: 'live',
    label: 'Live listings',
    icon: CheckCircle2,
    tone: 'from-emerald-500/5 to-emerald-500/10',
    iconTone: 'bg-emerald-500/10 ring-emerald-500/20 text-emerald-600',
  },
  {
    key: 'drafts',
    label: 'Drafts',
    icon: PencilLine,
    tone: 'from-primary/5 to-primary/10',
    iconTone: 'bg-primary/10 ring-primary/20 text-primary',
  },
  {
    key: 'expired',
    label: 'Expired, still published',
    icon: AlertCircle,
    tone: 'from-amber-500/5 to-amber-500/10',
    iconTone: 'bg-amber-500/10 ring-amber-500/20 text-amber-600',
  },
  {
    key: 'closed',
    label: 'Closed',
    icon: XCircle,
    tone: 'from-muted/40 to-muted',
    iconTone: 'bg-muted ring-border text-muted-foreground',
  },
]

interface Props {
  counts: OpportunityCounts | null
}

export function OpportunitiesStats({ counts }: Props) {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, tone, iconTone }) => (
        <Card key={key} className={`relative overflow-hidden border-border bg-gradient-to-br ${tone}`}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ring-1 ${iconTone}`}>
                <Icon className="size-6" />
              </div>
              <div>
                <p className="text-3xl font-bold">{counts ? counts[key] : '—'}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
