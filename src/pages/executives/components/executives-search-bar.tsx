import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Plus, Search } from 'lucide-react'

interface Props {
  search: string
  onSearchChange: (value: string) => void
  onAdd: () => void
}

export function ExecutivesSearchBar({
  search,
  onSearchChange,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search executives by name or position..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-border bg-secondary pl-10"
        />
      </div>

      <Button onClick={onAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Plus className="mr-2 size-4" />
        Add Executive
      </Button>
    </div>
  )
}