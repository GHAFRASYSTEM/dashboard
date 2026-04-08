import { Button } from '../../../components/ui/button'
import { Plus, TrendingUp } from 'lucide-react'

interface TrendsEmptyStateProps {
  hasSearch: boolean
  onAdd: () => void
}

export function TrendsEmptyState({ hasSearch, onAdd }: TrendsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
      <TrendingUp className="mb-3 size-8 text-muted-foreground/20" />
      <p className="text-[14px] font-medium text-muted-foreground">No trends found</p>
      <p className="mt-1 text-[12px] text-muted-foreground/60">
        {hasSearch ? 'Try a different search term' : 'Post your first trend to get started'}
      </p>

      {!hasSearch && (
        <Button onClick={onAdd} className="mt-4 h-8 gap-1.5 px-4 text-[13px]">
          <Plus className="size-3.5" />
          Post Trend
        </Button>
      )}
    </div>
  )
}