import { format } from 'date-fns'
import { Card, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Bell, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import type { Announcement } from '../types/announcement'
import { CATEGORY_CONFIG } from '../utils/announcement-config'

interface Props {
  announcement: Announcement
  onEdit:       (a: Announcement) => void
  onDelete:     (id: string) => void
}

export function AnnouncementCard({ announcement, onEdit, onDelete }: Props) {
  const cfg = CATEGORY_CONFIG[announcement.category]

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      {/* Image or placeholder */}
      {announcement.image_uri ? (
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img
            src={announcement.image_uri}
            alt={announcement.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category badge over image */}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}
          >
            {cfg.label}
          </span>
        </div>
      ) : (
        <div className="relative flex h-28 shrink-0 items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          <Bell className="size-10 text-primary/20" />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}
          >
            {cfg.label}
          </span>
        </div>
      )}

      <CardContent className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {announcement.title}
        </h3>

        {/* Body preview */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {announcement.body}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-block size-1.5 rounded-full ${cfg.dot}`}
            />
            <span className="text-xs text-muted-foreground">
              {format(new Date(announcement.published_at), 'MMM d, yyyy')}
            </span>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <MoreVertical className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(announcement)}>
                <Edit2 className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(announcement.id)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}