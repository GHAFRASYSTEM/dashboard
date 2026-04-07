import { useState } from 'react'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { MediaItem } from '../types/gallery'

interface Props {
  items: MediaItem[]
  initialIndex: number
  onClose: () => void
}

export function GalleryLightbox({ items, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)
  const item = items[index]

  const prev = () => setIndex((current) => (current - 1 + items.length) % items.length)
  const next = () => setIndex((current) => (current + 1) % items.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
      >
        <X className="size-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            className="absolute left-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            className="absolute right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      <div
        className="relative mx-16 flex max-h-[85vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[75vh] rounded-xl object-contain shadow-2xl"
            style={{ maxWidth: '100%' }}
          />
        ) : (
          <video
            src={item.url}
            controls
            autoPlay
            className="max-h-[75vh] rounded-xl shadow-2xl"
            style={{ maxWidth: '100%' }}
          />
        )}

        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-white/50">
            {item.category} · {item.uploadedBy} · {format(item.uploadedAt, 'MMM d, yyyy')}
          </p>
        </div>

        {items.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {items.map((mediaItem, itemIndex) => (
              <button
                key={mediaItem.id}
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  'relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition',
                  itemIndex === index
                    ? 'border-white'
                    : 'border-transparent opacity-50 hover:opacity-80'
                )}
              >
                <img
                  src={mediaItem.thumbnail ?? mediaItem.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {mediaItem.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="size-4 fill-white text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
          {index + 1} / {items.length}
        </div>
      )}
    </div>
  )
}