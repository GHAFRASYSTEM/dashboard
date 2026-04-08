import { Card, CardContent } from '../../../components/ui/card'
import { Users, UserCheck, UserX, Shield } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface MemberStatsProps {
  total: number
  active: number
  inactive: number
  executives: number
}

export function MemberStats({
  total,
  active,
  inactive,
  executives,
}: MemberStatsProps) {
  const stats = [
    {
      icon: <Users className="size-6 text-primary" />,
      bg: 'bg-primary/10',
      gradient: 'from-primary/5 to-primary/10',
      value: total,
      label: 'Total Members',
    },
    {
      icon: <UserCheck className="size-6 text-emerald-500" />,
      bg: 'bg-emerald-500/10',
      gradient: 'from-emerald-500/5 to-emerald-500/10',
      value: active,
      label: 'Active Members',
    },
    {
      icon: <Shield className="size-6 text-amber-500" />,
      bg: 'bg-amber-500/10',
      gradient: 'from-amber-500/5 to-amber-500/10',
      value: executives,
      label: 'With Positions',
    },
    {
      icon: <UserX className="size-6 text-destructive" />,
      bg: 'bg-destructive/10',
      gradient: 'from-destructive/5 to-destructive/10',
      value: inactive,
      label: 'Inactive',
    },
  ]

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Card
          key={i}
          className={cn('relative overflow-hidden border-border bg-gradient-to-br', s.gradient)}
        >
          <div className="absolute -mr-10 -mt-10 top-0 right-0 size-20 rounded-full bg-white/5" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={cn('rounded-xl p-3', s.bg)}>{s.icon}</div>
              <div>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}