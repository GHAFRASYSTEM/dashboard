import { Megaphone, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'

interface Props {
  searchQuery:  string
  filterStatus: string
  onAdd:        () => void
}

export function AnnouncementsEmptyState({
  searchQuery,
  filterStatus,
  onAdd,
}: Props) {
  const isFiltered = searchQuery.trim() !== '' || filterStatus !== 'all'

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-20 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Megaphone className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        {isFiltered ? 'No matching announcements' : 'No announcements yet'}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {isFiltered
          ? 'Try adjusting your search or filter.'
          : 'Create your first announcement to keep members informed.'}
      </p>
      {!isFiltered && (
        <Button onClick={onAdd} className="mt-6 gap-2">
          <Plus className="size-4" />
          New Announcement
        </Button>
      )}
    </div>
  )
}