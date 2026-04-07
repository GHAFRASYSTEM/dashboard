import { Briefcase, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'

interface Props {
  onAdd: () => void
}

export function InternshipsEmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Briefcase className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-medium">No internships found</h3>
      <p className="mb-4 text-muted-foreground">
        Try adjusting your search or filters
      </p>
      <Button onClick={onAdd} variant="outline" className="border-border">
        <Plus className="mr-2 size-4" />
        Post New Internship
      </Button>
    </div>
  )
}