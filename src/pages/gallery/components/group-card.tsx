import { format } from 'date-fns'
import { Eye, Layers, MoreVertical, Play, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { cn } from '../../../lib/utils'
import type { MediaGroup, MediaItem } from '../types/gallery'
import { getCategoryColor } from '../utils/gallery-config'

interface Props {
  group: MediaGroup
  allMedia: MediaItem[]
  onOpenLightbox: (items: MediaItem[], index: number) => void
  onDelete: (id: string) => void
}

export function GroupCard({ group, allMedia, onOpenLightbox, onDelete }: Props) {
  const items = group.items
    .map((id) => allMedia.find((mediaItem) => mediaItem.id === id))
    .filter(Boolean) as MediaItem[]

  const preview = items.slice(0, 4)

  return (
    <Card className="overflow-hidden border-white/10 bg-[#141418] transition-all hover:border-white/20">
      <div className="grid grid-cols-2 gap-0.5 bg-black/20">
        {preview.map((item, index) => (
          <button
            key={item.id}
            className="relative aspect-square overflow-hidden"
            onClick={() => onOpenLightbox(items, index)}
          >
            <img
              src={item.thumbnail ?? item.url}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />

            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Play className="size-4 fill-white text-white" />
                </div>
              </div>
            )}

            {index === 3 && items.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="text-xl font-bold text-white">+{items.length - 4}</span>
              </div>
            )}
          </button>
        ))}

        {preview.length < 4 &&
          Array.from({ length: 4 - preview.length }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square bg-white/5" />
          ))}
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{group.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-white/50">{group.description}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="size-8 shrink-0 text-white/50 hover:text-white">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="border-white/10 bg-[#1e1e24]">
              <DropdownMenuItem
                className="text-white/80 focus:bg-white/10"
                onClick={() => onOpenLightbox(items, 0)}
              >
                <Eye className="mr-2 size-4" />
                View All
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400"
                onClick={() => onDelete(group.id)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className={cn('rounded-full border px-2 py-0.5 text-xs', getCategoryColor(group.category))}>
            {group.category}
          </span>
          <span className="flex items-center gap-1">
            <Layers className="size-3" />
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
          <span>{format(group.createdAt, 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  )
}