import { format } from 'date-fns'
import { CheckSquare, Download, Eye, Film, Image as ImageIcon, Play, Square, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
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

export function GalleryGridView({
  items,
  selectionMode,
  selectedIds,
  onToggleSelect,
  onOpenLightbox,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => {
        const isSelected = selectedIds.has(item.id)

        return (
          <Card
            key={item.id}
            className={cn(
              'group relative overflow-hidden border bg-[#141418] transition-all',
              isSelected
                ? 'border-violet-500 ring-1 ring-violet-500'
                : 'border-white/8 hover:border-white/20'
            )}
          >
            <div
              className="relative aspect-square cursor-pointer overflow-hidden bg-[#0c0c10]"
              onClick={() => {
                if (selectionMode) {
                  onToggleSelect(item.id)
                } else {
                  onOpenLightbox(items, items.indexOf(item))
                }
              }}
            >
              <img
                src={item.thumbnail ?? item.url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition group-hover:bg-black/70">
                    <Play className="ml-0.5 size-5 fill-white text-white" />
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                      {item.duration}
                    </span>
                  )}
                </div>
              )}

              {!selectionMode && (
                <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 rounded bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                      onClick={() => onOpenLightbox(items, items.indexOf(item))}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 rounded bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <Download className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 rounded bg-rose-500/20 text-rose-400 backdrop-blur-sm hover:bg-rose-500/40"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="absolute top-2 left-2">
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm',
                    getCategoryColor(item.category)
                  )}
                >
                  {item.category}
                </span>
              </div>

              <div className="absolute top-2 right-2">
                {item.type === 'video' ? (
                  <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-medium text-rose-300 backdrop-blur-sm">
                    <Film className="size-2.5" />
                    Video
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-medium text-sky-300 backdrop-blur-sm">
                    <ImageIcon className="size-2.5" />
                    Photo
                  </span>
                )}
              </div>

              {selectionMode && (
                <div className="absolute top-2 right-2">
                  {isSelected ? (
                    <CheckSquare className="size-6 text-violet-400 drop-shadow" />
                  ) : (
                    <Square className="size-6 text-white/50 drop-shadow" />
                  )}
                </div>
              )}
            </div>

            <CardContent className="p-3">
              <p className="truncate text-sm font-medium text-white">{item.title}</p>
              <div className="mt-1 flex items-center justify-between text-xs text-white/40">
                <span>{item.size}</span>
                <span>{format(item.uploadedAt, 'MMM d, yyyy')}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}