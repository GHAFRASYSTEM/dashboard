import { Plus, Search } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'

interface Props {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  typeFilter: string
  onTypeChange: (value: string) => void
  contractFilter: string
  onContractChange: (value: string) => void
  onAdd: () => void
}

export function InternshipsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  contractFilter,
  onContractChange,
  onAdd,
}: Props) {
  return (
    <Card className="border-border">
      <div className="border-b border-border p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-1 flex-wrap gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border-border bg-secondary pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[140px] border-border bg-secondary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={onTypeChange}>
              <SelectTrigger className="w-[140px] border-border bg-secondary">
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={contractFilter} onValueChange={onContractChange}>
              <SelectTrigger className="w-[160px] border-border bg-secondary">
                <SelectValue placeholder="Contract" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="all">All Contracts</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="fulltime">Permanent Job</SelectItem>
                <SelectItem value="alternance">Alternance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onAdd}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 size-4" />
            Post Internship
          </Button>
        </div>
      </div>
    </Card>
  )
}