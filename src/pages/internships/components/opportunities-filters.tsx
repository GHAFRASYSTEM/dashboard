import { useEffect, useState } from 'react'
import { MapPin, Plus, Search } from 'lucide-react'
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
import { statusFilterOptions } from '../utils/opportunity-config'
import type { StatusFilter } from '../utils/opportunity-config'

interface Props {
  search: string
  onSearchChange: (value: string) => void
  location: string
  onLocationChange: (value: string) => void
  type: string
  onTypeChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  onAdd: () => void
}

// Keeps typing responsive and only reports the value once the user pauses.
function useDebouncedInput(value: string, onChange: (value: string) => void) {
  const [draft, setDraft] = useState(value)
  const [synced, setSynced] = useState(value)
  // Follow outside changes (e.g. "Clear filters") without an effect.
  if (value !== synced) {
    setSynced(value)
    setDraft(value)
  }
  useEffect(() => {
    if (draft === value) return
    const timer = window.setTimeout(() => onChange(draft), 350)
    return () => window.clearTimeout(timer)
  }, [draft, value, onChange])
  return [draft, setDraft] as const
}

export function OpportunitiesFilters({
  search,
  onSearchChange,
  location,
  onLocationChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onAdd,
}: Props) {
  const [searchDraft, setSearchDraft] = useDebouncedInput(search, onSearchChange)
  const [locationDraft, setLocationDraft] = useDebouncedInput(location, onLocationChange)

  return (
    <Card className="border-border">
      <div className="flex flex-col justify-between gap-4 p-6 lg:flex-row">
        <div className="flex flex-1 flex-wrap gap-3">
          <div className="relative min-w-[220px] max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search by title or organization"
              placeholder="Search title or organization..."
              value={searchDraft}
              maxLength={100}
              onChange={(e) => setSearchDraft(e.target.value)}
              className="border-border bg-secondary pl-9"
            />
          </div>

          <div className="relative w-full sm:w-[180px]">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Filter by location"
              placeholder="Location"
              value={locationDraft}
              maxLength={100}
              onChange={(e) => setLocationDraft(e.target.value)}
              className="border-border bg-secondary pl-9"
            />
          </div>

          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger aria-label="Filter by type" className="w-full border-border bg-secondary sm:w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="job">Jobs</SelectItem>
              <SelectItem value="internship">Internships</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(value) => onStatusChange(value as StatusFilter)}>
            <SelectTrigger aria-label="Filter by status" className="w-full border-border bg-secondary sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              {statusFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 size-4" />
          New opportunity
        </Button>
      </div>
    </Card>
  )
}
