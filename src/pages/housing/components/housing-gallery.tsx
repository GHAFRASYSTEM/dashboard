import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Housing } from '../types/housing';

interface Props {
  housing:           Housing;
  currentIndex:      number;
  onOpenModal:       () => void;
  onPrev:            () => void;
  onNext:            () => void;
  onSelect:          (i: number) => void;
}

export function HousingGallery({ housing, currentIndex, onOpenModal, onPrev, onNext, onSelect }: Props) {
  if (!housing.images.length) {
    return (
      <div className="flex aspect-16/10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        No images available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-muted">
      <div className="relative aspect-16/10 cursor-pointer" onClick={onOpenModal}>
        <img
          src={housing.images[currentIndex]}
          alt={`${housing.title} ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        {/* Available badge */}
        <div className="absolute left-4 top-4">
          <span className={cn(
            'rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm',
            housing.available
              ? 'bg-emerald-50/90 text-emerald-700 border-emerald-200'
              : 'bg-red-50/90 text-red-700 border-red-200'
          )}>
            {housing.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {housing.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">
          {currentIndex + 1} / {housing.images.length}
        </div>
      </div>

      {housing.images.length > 1 && (
        <div className="flex gap-2 p-2">
          {housing.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                'h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all',
                currentIndex === i
                  ? 'ring-2 ring-primary ring-offset-1'
                  : 'opacity-60 hover:opacity-100'
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}