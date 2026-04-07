import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Plus, Search } from 'lucide-react'

interface Props {
  searchQuery: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterChange: (value: string) => void
  onAdd: () => void
}

export function AnnouncementsToolbar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-border bg-card pl-10"
        />
      </div>

      <div className="flex gap-3">
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[140px] border-border bg-card">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending">Scheduled</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onAdd} className="gap-2">
          <Plus className="size-4" />
          <span className="hidden sm:inline">New Announcement</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>
    </div>
  )
}