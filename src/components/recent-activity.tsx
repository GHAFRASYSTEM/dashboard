import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  time: string
  type: 'create' | 'update' | 'delete' | 'approve' | 'reject'
}

const activities: Activity[] = [
  {
    id: '1',
    user: { name: 'John Doe', initials: 'JD' },
    action: 'created',
    target: 'new housing listing',
    time: '2 minutes ago',
    type: 'create',
  },
  {
    id: '2',
    user: { name: 'Sarah Smith', initials: 'SS' },
    action: 'approved',
    target: 'marketing request',
    time: '15 minutes ago',
    type: 'approve',
  },
  {
    id: '3',
    user: { name: 'Mike Johnson', initials: 'MJ' },
    action: 'updated',
    target: 'announcement',
    time: '1 hour ago',
    type: 'update',
  },
  {
    id: '4',
    user: { name: 'Emily Brown', initials: 'EB' },
    action: 'published',
    target: 'new trend post',
    time: '2 hours ago',
    type: 'create',
  },
  {
    id: '5',
    user: { name: 'Admin User', initials: 'AU' },
    action: 'added',
    target: 'new executive',
    time: '3 hours ago',
    type: 'create',
  },
]

const typeColors = {
  create: 'bg-success/10 text-success',
  update: 'bg-info/10 text-info',
  delete: 'bg-destructive/10 text-destructive',
  approve: 'bg-success/10 text-success',
  reject: 'bg-destructive/10 text-destructive',
}

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="size-9">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback className="bg-secondary text-xs">
                {activity.user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                <Badge variant="secondary" className={cn('font-normal', typeColors[activity.type])}>
                  {activity.action}
                </Badge>{' '}
                {activity.target}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
