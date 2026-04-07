import { Button } from '../../../components/ui/button'
import { Plus, Users } from 'lucide-react'

interface Props {
  search: string
  onAdd: () => void
}

export function ExecutivesEmptyState({ search, onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
        <Users className="size-10 text-muted-foreground" />
      </div>

      <h3 className="mb-2 text-lg font-semibold">No executives found</h3>

      <p className="mb-6 max-w-md text-muted-foreground">
        {search
          ? `No executives match your search for "${search}". Try a different search term.`
          : 'Get started by adding your first executive member.'}
      </p>

      {!search && (
        <Button onClick={onAdd}>
          <Plus className="mr-2 size-4" />
          Add Executive
        </Button>
      )}
    </div>
  )
}