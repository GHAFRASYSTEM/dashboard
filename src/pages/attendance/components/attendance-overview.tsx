
import {
  Users,
  CalendarCheck,
  UserCheck,
  UserX,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import type { AttendanceStats } from '../types/attendance'

interface AttendanceOverviewProps {
  stats: AttendanceStats | null
  loading: boolean
}

export function AttendanceOverview({
  stats,
  loading,
}: AttendanceOverviewProps) {
  const cards = [
    {
      label: 'Registered Members',
      value: stats?.totalMembers?.toLocaleString() ?? '—',
      description: 'Total GHAFRA members',
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Meetings Held',
      value: stats?.meetingsHeld?.toLocaleString() ?? '—',
      description: 'Completed meetings',
      icon: CalendarCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Present',
      value: stats?.totalAttended?.toLocaleString() ?? '—',
      description: 'Members marked present',
      icon: UserCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Absent',
      value: stats?.totalAbsent?.toLocaleString() ?? '—',
      description: 'Members marked absent',
      icon: UserX,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      label: 'Attendance Rate',
      value: stats ? `${stats.attendanceRate}%` : '—',
      description: 'Overall attendance rate',
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Card key={card.label} className="border-border">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`rounded-xl p-3 ${card.bg}`}>
                  <Icon className={`size-6 ${card.color}`} />
                </div>
              </div>

              {loading ? (
                <div className="h-9 w-20 animate-pulse rounded bg-muted" />
              ) : (
                <p className="text-3xl font-bold">{card.value}</p>
              )}

              <p className="mt-1 text-sm font-medium">{card.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
