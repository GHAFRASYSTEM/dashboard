import { Card, CardContent } from '../../../components/ui/card';
import { Users, UserCheck, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { MemberStats } from '../types/members';

interface Props { stats: MemberStats | null; loading: boolean; }

export function MemberStats({ stats, loading }: Props) {
  const items = [
    {
      icon:     <Users className="size-6 text-primary" />,
      bg:       'bg-primary/10',
      gradient: 'from-primary/5 to-primary/10',
      value:    stats?.total ?? 0,
      label:    'Total Members',
    },
    {
      icon:     <UserCheck className="size-6 text-emerald-500" />,
      bg:       'bg-emerald-500/10',
      gradient: 'from-emerald-500/5 to-emerald-500/10',
      value:    stats?.verified ?? 0,
      label:    'Verified',
    },
    {
      icon:     <ShieldCheck className="size-6 text-blue-500" />,
      bg:       'bg-blue-500/10',
      gradient: 'from-blue-500/5 to-blue-500/10',
      value:    stats?.complete ?? 0,
      label:    'Profile Complete',
    },
    {
      icon:     <AlertCircle className="size-6 text-amber-500" />,
      bg:       'bg-amber-500/10',
      gradient: 'from-amber-500/5 to-amber-500/10',
      value:    stats?.incomplete ?? 0,
      label:    'Incomplete Profiles',
    },
  ];

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Card key={i} className={cn('relative overflow-hidden border-border bg-gradient-to-br', s.gradient)}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={cn('rounded-xl p-3', s.bg)}>{s.icon}</div>
              <div>
                <p className="text-3xl font-bold">
                  {loading ? '—' : s.value}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}