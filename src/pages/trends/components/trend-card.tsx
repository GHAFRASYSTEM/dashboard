import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Badge } from '../../../components/ui/badge'
import { cn } from '../../../lib/utils'
import { Edit2, ExternalLink, Eye, MoreHorizontal, Trash2, TrendingUp } from 'lucide-react'
import type { Trend } from '../types/trends'
import { statusStyles } from '../utils/trend-utils'

interface TrendCardProps {
  trend: Trend
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function TrendCard({ trend, onView, onEdit, onDelete }: TrendCardProps) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/80 hover:shadow-[0_0_0_1px_hsl(var(--border)/0.5)]"
      onClick={onView}
    >
      {trend.images[0] ? (
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          <img
            src={trend.images[0]}
            alt={trend.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {trend.images.length > 1 && (
            <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
              +{trend.images.length - 1} more
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center bg-secondary/60">
          <TrendingUp className="size-8 text-muted-foreground/20" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {trend.category}
          </span>
          <Badge
            variant="outline"
            className={cn(
              'rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize',
              statusStyles[trend.status]
            )}
          >
            {trend.status}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug tracking-tight text-foreground">
          {trend.title}
        </h3>

        <p className="line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-muted-foreground">
          {trend.summary}
        </p>

        {trend.links.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {trend.links.slice(0, 2).map((link, index) => (
              <span
                key={index}
                className="flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[11px] text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-2.5" />
                {link.label || 'Source'}
              </span>
            ))}
            {trend.links.length > 2 && (
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                +{trend.links.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[9px] font-semibold text-primary">
              {trend.author[0]}
            </div>
            <span className="text-[11px] text-muted-foreground">{trend.author}</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-[11px] text-muted-foreground">
              {format(trend.createdAt, 'MMM d')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {trend.status === 'published' && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Eye className="size-3" />
                {trend.views.toLocaleString()}
              </span>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="flex size-6 items-center justify-center rounded-md text-muted-foreground/50 opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100">
                  <MoreHorizontal className="size-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 border-border bg-card text-[13px]"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem onClick={onView} className="gap-2 text-[12.5px]">
                  <Eye className="size-3.5" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="gap-2 text-[12.5px]">
                  <Edit2 className="size-3.5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="gap-2 text-[12.5px] text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}