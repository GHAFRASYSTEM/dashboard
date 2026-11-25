import { Briefcase, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'

interface Props {
  hasFilters: boolean
  onAdd: () => void
  onClear: () => void
}

export function OpportunitiesEmptyState({ hasFilters, onAdd, onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Briefcase className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-medium">
        {hasFilters ? 'No listings match these filters' : 'No jobs or internships yet'}
      </h3>
      <p className="mb-4 text-muted-foreground">
        {hasFilters
          ? 'Try a different search, type or status.'
          : 'Create a listing and publish it to share it with members in the app.'}
      </p>
      {hasFilters ? (
        <Button onClick={onClear} variant="outline" className="border-border">
          Clear filters
        </Button>
      ) : (
        <Button onClick={onAdd} variant="outline" className="border-border">
          <Plus className="mr-2 size-4" />
          New opportunity
        </Button>
      )}
    </div>
  )
}
