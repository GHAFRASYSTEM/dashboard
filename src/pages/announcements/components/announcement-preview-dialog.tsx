import { format } from 'date-fns'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Calendar, Edit2 } from 'lucide-react'
import type { Announcement } from '../types/announcement'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  announcement: Announcement | null
  onEdit: (announcement: Announcement) => void
}

export function AnnouncementPreviewDialog({
  open,
  onOpenChange,
  announcement,
  onEdit,
}: Props) {
  if (!announcement) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[700px]">
        <DialogHeader className="sr-only">
          <DialogTitle>{announcement.title}</DialogTitle>
          <DialogDescription>
            View announcement details
          </DialogDescription>
        </DialogHeader>

        {/* IMAGE */}
        {announcement.image_uri && (
          <div className="h-64 bg-muted">
            <img
              src={announcement.image_uri}
              alt={announcement.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3">
                {announcement.category}
              </Badge>

              <h2 className="text-2xl font-bold text-foreground">
                {announcement.title}
              </h2>
            </div>
          </div>

          <p className="mb-6 whitespace-pre-line leading-relaxed text-muted-foreground">
            {announcement.body}
          </p>

          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              {format(
                new Date(announcement.published_at),
                'MMMM d, yyyy'
              )}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenChange(false)
                onEdit(announcement)
              }}
            >
              <Edit2 className="mr-2 size-4" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}