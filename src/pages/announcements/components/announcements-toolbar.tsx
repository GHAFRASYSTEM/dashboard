import { Search, Plus, SlidersHorizontal } from 'lucide-react'
import { Input }   from '../../../components/ui/input'
import { Button }  from '../../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { CATEGORY_OPTIONS } from '../utils/announcement-config'

interface Props {
  searchQuery:    string
  onSearchChange: (v: string) => void
  filterStatus:   string
  onFilterChange: (v: string) => void
  onAdd:          () => void
}

export function AnnouncementsToolbar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search announcements…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category filter */}
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-36">
            <SlidersHorizontal className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORY_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Add button */}
      <Button onClick={onAdd} className="shrink-0 gap-2">
        <Plus className="size-4" />
        New Announcement
      </Button>
    </div>
  )
}