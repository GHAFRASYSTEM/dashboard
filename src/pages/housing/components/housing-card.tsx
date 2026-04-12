import { Link }   from 'react-router-dom';
import { Bath, Bed, MapPin, Square, Euro } from 'lucide-react';
import { Badge }       from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';
import { cn }          from '../../../lib/utils';
import type { Housing } from '../types/housing';

const TYPE_COLORS: Record<string, string> = {
  Studio:     'bg-blue-50 text-blue-700 border-blue-200',
  Apartment:  'bg-purple-50 text-purple-700 border-purple-200',
  Room:       'bg-amber-50 text-amber-700 border-amber-200',
  Colocation: 'bg-green-50 text-green-700 border-green-200',
};

interface Props { housing: Housing }

export function HousingCard({ housing }: Props) {
  const img = housing.images[0];

  return (
    <Link to={`/housing/${housing.id}`} className="block h-full focus:outline-none">
      <Card className="h-full cursor-pointer overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">

        {/* Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          {img ? (
            <img
              src={img}
              alt={housing.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <Badge
              variant="outline"
              className={cn(
                'border backdrop-blur-sm text-xs',
                housing.available
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              )}
            >
              {housing.available ? 'Available' : 'Unavailable'}
            </Badge>

            <Badge
              variant="outline"
              className={cn('text-xs', TYPE_COLORS[housing.type])}
            >
              {housing.type}
            </Badge>
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{housing.title}</h3>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{housing.city}{housing.location ? ` · ${housing.location}` : ''}</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-0.5 text-lg font-bold text-primary">
                <Euro className="size-4" />
                {housing.price.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-xs text-muted-foreground">{housing.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-2 text-xs">
            <div className="flex flex-col items-center gap-0.5">
              <Bed className="size-3.5 text-primary" />
              <span className="font-semibold">{housing.bedrooms}</span>
              <span className="text-muted-foreground">Beds</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Bath className="size-3.5 text-primary" />
              <span className="font-semibold">{housing.bathrooms}</span>
              <span className="text-muted-foreground">Baths</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Square className="size-3.5 text-primary" />
              <span className="font-semibold">{housing.size}</span>
              <span className="text-muted-foreground">m²</span>
            </div>
          </div>

          {/* Extra charges pill */}
          {housing.charges.length > 0 && (
            <p className="text-xs text-muted-foreground">
              + {housing.charges.length} charge{housing.charges.length > 1 ? 's' : ''} included
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}