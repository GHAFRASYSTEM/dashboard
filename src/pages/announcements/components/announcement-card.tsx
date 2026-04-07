import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
  Bell,
  Edit2,
  ImagePlus,
  MoreVertical,
  Send,
  Trash2,
} from 'lucide-react'
import type { Announcement } from '../types/announcement'
import { audienceConfig } from '../utils/announcement-config'
import { AnnouncementMetaBadges } from './announcement-meta-badges'

interface Props {
  announcement: Announcement
  onEdit: (announcement: Announcement) => void
  onDelete: (id: string) => void
}

export function AnnouncementCard({ announcement, onEdit, onDelete }: Props) {
  return (
    <Link to={`/announcements/${announcement.id}`} className="block h-full">
      <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        {announcement.images.length > 0 ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={announcement.images[0]}
              alt={announcement.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {announcement.images.length > 1 && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                <ImagePlus className="size-3" />
                +{announcement.images.length - 1}
              </div>
            )}

            <AnnouncementMetaBadges announcement={announcement} />
          </div>
        ) : (
          <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Bell className="size-12 text-primary/20" />
            <AnnouncementMetaBadges announcement={announcement} />
          </div>
        )}

        <CardContent className="p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {announcement.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {announcement.content}
          </p>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              {announcement.authorAvatar ? (
                <img
                  src={announcement.authorAvatar}
                  alt={announcement.author}
                  className="size-8 rounded-full object-cover ring-2 ring-background"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xs font-medium text-primary">
                    {announcement.author.charAt(0)}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">
                  {announcement.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {announcement.publishedAt
                    ? format(announcement.publishedAt, 'MMM d, yyyy')
                    : announcement.scheduledAt
                    ? `Scheduled: ${format(announcement.scheduledAt, 'MMM d')}`
                    : format(announcement.createdAt, 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {audienceConfig[announcement.audience].label}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      onEdit(announcement)
                    }}
                  >
                    <Edit2 className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>

                  {announcement.status !== 'published' && (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <Send className="mr-2 size-4" />
                      Publish Now
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={(e) => {
                      e.preventDefault()
                      onDelete(announcement.id)
                    }}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}