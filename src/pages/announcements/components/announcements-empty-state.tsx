import { Button } from '../../../components/ui/button'
import { Megaphone, Plus } from 'lucide-react'

interface Props {
  searchQuery: string
  filterStatus: string
  onAdd: () => void
}

export function AnnouncementsEmptyState({
  searchQuery,
  filterStatus,
  onAdd,
}: Props) {
  return (
    <div className="py-16 text-center">
      <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-muted">
        <Megaphone className="size-8 text-muted-foreground" />
      </div>

      <h3 className="mb-2 text-lg font-medium text-foreground">
        No announcements found
      </h3>

      <p className="mb-4 text-muted-foreground">
        {searchQuery || filterStatus !== 'all'
          ? 'Try adjusting your search or filter criteria'
          : 'Get started by creating your first announcement'}
      </p>

      {!searchQuery && filterStatus === 'all' && (
        <Button onClick={onAdd} className="gap-2">
          <Plus className="size-4" />
          Create Announcement
        </Button>
      )}
    </div>
  )
}