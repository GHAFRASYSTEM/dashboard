import { Badge } from '../../../components/ui/badge'
import { Users } from 'lucide-react'
import type { Announcement } from '../types/announcement'

interface Props {
  announcement: Announcement
}

export function AnnouncementMetaBadges({ announcement }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* CATEGORY BADGE */}
      <Badge variant="outline" className="text-xs">
        {announcement.category}
      </Badge>

      {/* DATE BADGE */}
      <Badge variant="outline" className="text-xs">
        {new Date(announcement.published_at).toLocaleDateString()}
      </Badge>

      {/* STATIC ICON BADGE (optional label replacement for audience) */}
      <Badge variant="outline" className="text-xs">
        <Users className="mr-1 size-3" />
        Public
      </Badge>
    </div>
  )
}