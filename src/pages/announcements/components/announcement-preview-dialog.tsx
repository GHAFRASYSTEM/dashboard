import { format } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Send,
  Users,
} from 'lucide-react'
import type { Announcement } from '../types/announcement'
import {
  audienceConfig,
  priorityConfig,
  statusConfig,
} from '../utils/announcement-config'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  announcement: Announcement | null
  currentImageIndex: number
  setCurrentImageIndex: Dispatch<SetStateAction<number>>
  onEdit: (announcement: Announcement) => void
}

export function AnnouncementPreviewDialog({
  open,
  onOpenChange,
  announcement,
  currentImageIndex,
  setCurrentImageIndex,
  onEdit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[700px]">
        <DialogHeader className="sr-only">
          <DialogTitle>{announcement?.title}</DialogTitle>
          <DialogDescription>View announcement details</DialogDescription>
        </DialogHeader>

        {announcement && (
          <>
            {announcement.images.length > 0 && (
              <div className="relative h-64 bg-muted">
                <img
                  src={announcement.images[currentImageIndex]}
                  alt={announcement.title}
                  className="h-full w-full object-cover"
                />

                {announcement.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                      onClick={() =>
                        setCurrentImageIndex((i) =>
                          i === 0 ? announcement.images.length - 1 : i - 1
                        )
                      }
                    >
                      <ChevronLeft className="size-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                      onClick={() =>
                        setCurrentImageIndex((i) =>
                          i === announcement.images.length - 1 ? 0 : i + 1
                        )
                      }
                    >
                      <ChevronRight className="size-5" />
                    </Button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {announcement.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`size-2 rounded-full transition-colors ${
                            i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentImageIndex(i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className={statusConfig[announcement.status].className}>
                      {statusConfig[announcement.status].label}
                    </Badge>

                    <Badge className={priorityConfig[announcement.priority].className}>
                      {priorityConfig[announcement.priority].label}
                    </Badge>

                    <Badge variant="outline">
                      <Users className="mr-1 size-3" />
                      {audienceConfig[announcement.audience].label}
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground">
                    {announcement.title}
                  </h2>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                {announcement.content}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  {announcement.authorAvatar ? (
                    <img
                      src={announcement.authorAvatar}
                      alt={announcement.author}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">
                        {announcement.author.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-foreground">
                      {announcement.author}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {announcement.publishedAt
                        ? format(announcement.publishedAt, 'MMMM d, yyyy')
                        : announcement.scheduledAt
                        ? `Scheduled for ${format(
                            announcement.scheduledAt,
                            'MMMM d, yyyy'
                          )}`
                        : format(announcement.createdAt, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
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

                  {announcement.status !== 'published' && (
                    <Button size="sm">
                      <Send className="mr-2 size-4" />
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}