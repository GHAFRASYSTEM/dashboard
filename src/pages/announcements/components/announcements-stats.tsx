import { Card, CardContent } from '../../../components/ui/card'
import {
  Newspaper, CalendarDays, Home, Heart, RefreshCw, LayoutGrid,
} from 'lucide-react'

interface Props {
  stats: ReturnType<typeof import('../utils/announcement-helpers').getAnnouncementStats>
}

const STAT_CARDS = [
  { key: 'total',    label: 'Total',    icon: LayoutGrid,   from: 'from-slate-600',   to: 'to-slate-700'   },
  { key: 'news',     label: 'News',     icon: Newspaper,    from: 'from-blue-500',    to: 'to-blue-600'    },
  { key: 'events',   label: 'Events',   icon: CalendarDays, from: 'from-violet-500',  to: 'to-violet-600'  },
  { key: 'housing',  label: 'Housing',  icon: Home,         from: 'from-amber-500',   to: 'to-amber-600'   },
  { key: 'personal', label: 'Personal', icon: Heart,        from: 'from-rose-500',    to: 'to-rose-600'    },
  { key: 'updates',  label: 'Updates',  icon: RefreshCw,    from: 'from-emerald-500', to: 'to-emerald-600' },
] as const

export function AnnouncementsStats({ stats }: Props) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {STAT_CARDS.map(({ key, label, icon: Icon, from, to }) => (
        <Card
          key={key}
          className={`relative overflow-hidden border-0 bg-gradient-to-br ${from} ${to} text-white`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">{label}</p>
                <p className="mt-1 text-3xl font-bold">
                  {stats[key as keyof typeof stats]}
                </p>
              </div>
              <div className="rounded-lg bg-white/20 p-2">
                <Icon className="size-4" />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 size-16 rounded-full bg-white/10" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}