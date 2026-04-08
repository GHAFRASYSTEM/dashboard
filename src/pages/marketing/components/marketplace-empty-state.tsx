import { Plus, Store } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'

interface Props {
  hasFilters: boolean
  onAdd: () => void
}

export function MarketplaceEmptyState({ hasFilters, onAdd }: Props) {
  return (
    <Card className="border-border">
      <CardContent className="py-16 text-center">
        <Store className="mx-auto mb-4 size-16 text-muted-foreground/50" />
        <h3 className="mb-2 text-lg font-semibold">No listings found</h3>
        <p className="mb-4 text-muted-foreground">
          {hasFilters ? 'Try adjusting your filters' : 'Start by adding your first listing'}
        </p>
        <Button onClick={onAdd}>
          <Plus className="mr-2 size-4" />
          Add Listing
        </Button>
      </CardContent>
    </Card>
  )
}