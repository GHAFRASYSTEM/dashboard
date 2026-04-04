import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Home,
  Megaphone,
  Bell,
  Users,
  Briefcase,
} from 'lucide-react'

const actions = [
  {
    label: 'Post Trend',
    href: '/trends?action=new',
    icon: TrendingUp,
  },
  {
    label: 'Add Housing',
    href: '/housing?action=new',
    icon: Home,
  },
  {
    label: 'Announcement',
    href: '/announcements?action=new',
    icon: Megaphone,
  },
  {
    label: 'Send Notification',
    href: '/notifications?action=new',
    icon: Bell,
  },
  {
    label: 'Add Executive',
    href: '/executives?action=new',
    icon: Users,
  },
  {
    label: 'Post Internship',
    href: '/internships?action=new',
    icon: Briefcase,
  },
]

export function QuickActions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.href}
            variant="secondary"
            className="h-auto flex-col gap-2 bg-secondary py-4 hover:bg-secondary/80"
            asChild
          >
            <Link to={action.href}>
              <action.icon className="size-5" />
              <span className="text-xs">{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}