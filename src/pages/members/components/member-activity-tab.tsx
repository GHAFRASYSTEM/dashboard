import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Activity } from '../types/members'

interface MemberActivityTabProps {
  activities: Activity[]
}

export function MemberActivityTab({ activities }: MemberActivityTabProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative pl-10">
                <div
                  className={`absolute left-2.5 size-3 rounded-full border-2 border-card ${
                    index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                />

                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {format(activity.date, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}