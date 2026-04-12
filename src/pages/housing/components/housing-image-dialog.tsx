import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import type { Housing } from '../types/housing';

interface Props {
  open:          boolean;
  onOpenChange:  (o: boolean) => void;
  housing:       Housing;
  currentIndex:  number;
  onPrev:        () => void;
  onNext:        () => void;
}

export function HousingImageDialog({ open, onOpenChange, housing, currentIndex, onPrev, onNext }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0">
        <div className="relative aspect-video">
          <img
            src={housing.images[currentIndex]}
            alt={`${housing.title} ${currentIndex + 1}`}
            className="h-full w-full object-contain"
          />
          {housing.images.length > 1 && (
            <>
              <button
                type="button" onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button" onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur">
            {currentIndex + 1} / {housing.images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}