import { Badge } from '../../../components/ui/badge'
import { Users } from 'lucide-react'
import type { Announcement } from '../types/announcement'
import {
  audienceConfig,
  priorityConfig,
  statusConfig,
} from '../utils/announcement-config'

interface Props {
  announcement: Announcement
}

export function AnnouncementMetaBadges({ announcement }: Props) {
  const StatusIcon = statusConfig[announcement.status].icon

  return (
    <>
      <div className="absolute left-3 top-3 flex gap-2">
        <Badge className={statusConfig[announcement.status].className}>
          <StatusIcon className="mr-1 size-3" />
          {statusConfig[announcement.status].label}
        </Badge>
      </div>

      <div className="absolute right-3 top-3">
        <Badge className={priorityConfig[announcement.priority].className}>
          {priorityConfig[announcement.priority].label}
        </Badge>
      </div>

      <Badge variant="outline" className="text-xs">
        <Users className="mr-1 size-3" />
        {audienceConfig[announcement.audience].label}
      </Badge>
    </>
  )
}