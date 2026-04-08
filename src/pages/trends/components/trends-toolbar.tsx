import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { cn } from '../../../lib/utils'
import { Plus, Search } from 'lucide-react'

interface TrendsToolbarProps {
  filterStatus: string
  setFilterStatus: (value: string) => void
  counts: {
    all: number
    published: number
    draft: number
    pending: number
  }
  search: string
  setSearch: (value: string) => void
  onAdd: () => void
}

export function TrendsToolbar({
  filterStatus,
  setFilterStatus,
  counts,
  search,
  setSearch,
  onAdd,
}: TrendsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        {(['all', 'published', 'pending', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors',
              filterStatus === status
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {status} <span className="ml-0.5 opacity-60">({counts[status]})</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
          <Input
            placeholder="Search trends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-52 border-border bg-secondary pl-8 text-[13px]"
          />
        </div>

        <Button onClick={onAdd} className="h-8 gap-1.5 px-4 text-[13px] font-medium">
          <Plus className="size-3.5" />
          Post Trend
        </Button>
      </div>
    </div>
  )
}