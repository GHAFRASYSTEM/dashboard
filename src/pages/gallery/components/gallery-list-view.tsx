import { format } from 'date-fns'
import { CheckSquare, Download, Eye, MoreVertical, Play, Square, Trash2, Volume2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { cn } from '../../../lib/utils'
import type { MediaItem } from '../types/gallery'
import { getCategoryColor } from '../utils/gallery-config'

interface Props {
  items: MediaItem[]
  selectionMode: boolean
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onOpenLightbox: (items: MediaItem[], index: number) => void
  onDelete: (id: string) => void
}

export function GalleryListView({
  items,
  selectionMode,
  selectedIds,
  onToggleSelect,
  onOpenLightbox,
  onDelete,
}: Props) {
  return (
    <Card className="border-white/8 bg-[#141418]">
      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {items.map((item) => {
            const isSelected = selectedIds.has(item.id)

            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 transition hover:bg-white/3',
                  isSelected && 'bg-violet-500/5'
                )}
              >
                {selectionMode && (
                  <button onClick={() => onToggleSelect(item.id)} className="shrink-0">
                    {isSelected ? (
                      <CheckSquare className="size-5 text-violet-400" />
                    ) : (
                      <Square className="size-5 text-white/30" />
                    )}
                  </button>
                )}

                <button
                  className="relative size-16 shrink-0 overflow-hidden rounded-lg"
                  onClick={() => onOpenLightbox(items, items.indexOf(item))}
                >
                  <img
                    src={item.thumbnail ?? item.url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Play className="size-4 fill-white text-white" />
                    </div>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{item.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                    <span className={cn('rounded-full border px-2 py-0.5', getCategoryColor(item.category))}>
                      {item.category}
                    </span>
                    <span>{item.type === 'video' ? `Video · ${item.duration}` : 'Photo'}</span>
                    <span>{item.size}</span>
                    <span>{format(item.uploadedAt, 'MMM d, yyyy')}</span>
                    <span>{item.uploadedBy}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="size-8 text-white/40 hover:text-white">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="border-white/10 bg-[#1e1e24]">
                    <DropdownMenuItem
                      className="text-white/80 focus:bg-white/10"
                      onClick={() => onOpenLightbox(items, items.indexOf(item))}
                    >
                      {item.type === 'video' ? (
                        <>
                          <Volume2 className="mr-2 size-4" />
                          Watch
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 size-4" />
                          Preview
                        </>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-white/80 focus:bg-white/10">
                      <Download className="mr-2 size-4" />
                      Download
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}