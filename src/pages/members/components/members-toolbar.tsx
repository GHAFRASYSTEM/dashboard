import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Download, Grid, List, Plus, Search } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface MembersToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (value: 'grid' | 'list') => void
  onAddMember: () => void
}

export function MembersToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onAddMember,
}: MembersToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or ID…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-36 bg-card border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-border">
          <Button
            variant="ghost"
            size="icon"
            className={cn('size-9 rounded-none', viewMode === 'grid' && 'bg-secondary')}
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn('size-9 rounded-none', viewMode === 'list' && 'bg-secondary')}
            onClick={() => onViewModeChange('list')}
          >
            <List className="size-4" />
          </Button>
        </div>

        <Button variant="outline" className="border-border">
          <Download className="mr-2 size-4" />
          Export
        </Button>

        <Button onClick={onAddMember}>
          <Plus className="mr-2 size-4" />
          Add Member
        </Button>
      </div>
    </div>
  )
}