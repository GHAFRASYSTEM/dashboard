import { Badge } from '../../../components/ui/badge'
import { cn } from '../../../lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Trend } from '../types/trends'
import { detailStatusStyles } from '../utils/trend-utils'

interface TrendHeroProps {
  trend: Trend
  activeImg: number
  setActiveImg: React.Dispatch<React.SetStateAction<number>>
}

export function TrendHero({ trend, activeImg, setActiveImg }: TrendHeroProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {trend.images.length > 0 ? (
        <div className="relative h-[280px] w-full md:h-[360px] xl:h-[420px]">
          <img
            src={trend.images[activeImg]}
            alt={trend.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {trend.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImg((i) => (i - 1 + trend.images.length) % trend.images.length)
                }
                className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                onClick={() => setActiveImg((i) => (i + 1) % trend.images.length)}
                className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full border bg-background/80 px-3 py-1 text-[11px] font-medium capitalize backdrop-blur',
                  detailStatusStyles[trend.status]
                )}
              >
                {trend.status}
              </Badge>

              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
                {trend.category}
              </span>
            </div>

            <h2 className="max-w-4xl text-2xl font-semibold leading-tight text-white md:text-3xl">
              {trend.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 md:text-[15px]">
              {trend.summary}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-[220px] items-center justify-center bg-secondary text-muted-foreground">
          No image available
        </div>
      )}

      {trend.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto border-t border-border px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trend.images.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveImg(index)}
              className={cn(
                'h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition',
                index === activeImg
                  ? 'border-primary shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}