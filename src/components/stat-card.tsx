import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../lib/utils'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
  variant?: 'green' | 'blue' | 'amber' | 'red' | 'default'
  size?: 'default' | 'mini'
}

const variantStyles = {
  green: {
    icon: 'bg-primary/10 text-primary',
    accent: 'group-hover:opacity-100 bg-primary',
  },
  blue: {
    icon: 'bg-info/10 text-info',
    accent: 'group-hover:opacity-100 bg-info',
  },
  amber: {
    icon: 'bg-warning/10 text-warning',
    accent: 'group-hover:opacity-100 bg-warning',
  },
  red: {
    icon: 'bg-destructive/10 text-destructive',
    accent: 'group-hover:opacity-100 bg-destructive',
  },
  default: {
    icon: 'bg-secondary text-muted-foreground',
    accent: 'group-hover:opacity-100 bg-muted-foreground',
  },
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'default',
  size = 'default',
}: StatCardProps) {
  const styles = variantStyles[variant]

  if (size === 'mini') {
    return (
      <div className="group relative flex items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:border-border/80">
        <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', styles.icon)}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[20px] font-semibold tracking-tight text-foreground leading-tight">
            {value}
          </p>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground truncate">{title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:border-border/80">
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-200',
          styles.accent
        )}
      />

      <div className="mb-4 flex items-start justify-between">
        <div className={cn('flex size-9 items-center justify-center rounded-lg', styles.icon)}>
          <Icon className="size-4" />
        </div>

        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium',
              trend.isPositive
                ? 'bg-primary/10 text-primary'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {trend.value}%
          </div>
        )}
      </div>

      <p className="text-[26px] font-semibold tracking-tight text-foreground leading-none">
        {value}
      </p>
      <p className="mt-2 text-[12px] font-medium text-foreground/80">{title}</p>
      {description && (
        <p className="mt-0.5 text-[11.5px] text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
