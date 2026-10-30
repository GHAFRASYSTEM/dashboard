import { Link } from 'react-router-dom'
import {
  Megaphone,
  UserPlus,
  Home,
  Briefcase,
  DollarSign,
  Images,
} from 'lucide-react'

const actions = [
  {
    label: 'New Announcement',
    icon: Megaphone,
    href: '/announcements/new',
    color: 'text-blue-400 bg-blue-400/10',
  },
  {
    label: 'Add Member',
    icon: UserPlus,
    href: '/members/new',
    color: 'text-primary bg-primary/10',
  },
  {
    label: 'Post Housing',
    icon: Home,
    href: '/housing/new',
    color: 'text-primary bg-primary/10',
  },
  {
    label: 'Post Opportunity',
    icon: Briefcase,
    href: '/internships?new=1',
    color: 'text-amber-400 bg-amber-400/10',
  },
  {
    label: 'Record Payment',
    icon: DollarSign,
    href: '/contributions/new',
    color: 'text-primary bg-primary/10',
  },
  {
    label: 'Upload to Gallery',
    icon: Images,
    href: '/gallery/upload',
    color: 'text-blue-400 bg-blue-400/10',
  },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-[14px] font-medium text-foreground">Quick Actions</h3>
        <p className="mt-0.5 text-[12px] text-muted-foreground">Common tasks</p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            to={action.href}
            className="group flex flex-col items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3 py-4 text-center transition-all hover:bg-secondary hover:border-border/80"
          >
            <div className={`flex size-9 items-center justify-center rounded-lg ${action.color}`}>
              <action.icon className="size-4" />
            </div>
            <span className="text-[11.5px] font-medium text-muted-foreground leading-tight group-hover:text-foreground transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
