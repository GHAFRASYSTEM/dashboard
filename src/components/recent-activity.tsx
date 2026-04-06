import { cn } from '../lib/utils'

interface Activity {
  id: string
  message: string
  time: string
  type: 'member' | 'housing' | 'contribution' | 'internship' | 'marketing' | 'general'
}

const activities: Activity[] = [
  {
    id: '1',
    message: 'New member Amara Osei registered',
    time: '2 min ago',
    type: 'member',
  },
  {
    id: '2',
    message: 'Housing listing #204 was approved',
    time: '18 min ago',
    type: 'housing',
  },
  {
    id: '3',
    message: 'Contribution of $2,400 recorded for April',
    time: '1 hr ago',
    type: 'contribution',
  },
  {
    id: '4',
    message: 'Internship at TechCorp Ltd posted',
    time: '3 hrs ago',
    type: 'internship',
  },
  {
    id: '5',
    message: 'Marketing request #31 was declined',
    time: 'Yesterday',
    type: 'marketing',
  },
  {
    id: '6',
    message: 'Gallery: 12 new photos uploaded',
    time: 'Yesterday',
    type: 'general',
  },
]

const dotColor: Record<Activity['type'], string> = {
  member: 'bg-primary',
  housing: 'bg-info',
  contribution: 'bg-warning',
  internship: 'bg-primary',
  marketing: 'bg-destructive',
  general: 'bg-muted-foreground',
}

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-[14px] font-medium text-foreground">Recent Activity</h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">Latest actions across the platform</p>
        </div>
        <button className="text-[12px] font-medium text-primary hover:text-primary/80 transition-colors">
          View all →
        </button>
      </div>

      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3.5 px-5 py-3.5 transition-colors hover:bg-secondary/40"
          >
            {/* Dot */}
            <div className="relative mt-[7px] flex shrink-0 items-center justify-center">
              <span className={cn('size-2 rounded-full', dotColor[activity.type])} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-foreground leading-snug">{activity.message}</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/60">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
