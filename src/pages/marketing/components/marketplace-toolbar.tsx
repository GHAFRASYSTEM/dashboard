import { Grid3X3, List, Plus, Search, Tag } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs'

interface Props {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (value: string) => void
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected'
  onStatusChange: (value: 'all' | 'pending' | 'approved' | 'rejected') => void
  searchQuery: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (value: 'grid' | 'list') => void
  onAdd: () => void
}

export function MarketplaceToolbar({
  categories,
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAdd,
}: Props) {
  return (
    <Card className="mb-6 border-border">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search ads, products, or sellers..."
              className="border-border bg-background pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full border-border bg-background md:w-[200px]">
              <Tag className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={statusFilter} onValueChange={(value) => onStatusChange(value as typeof statusFilter)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
              <TabsTrigger value="approved" className="text-xs">Published</TabsTrigger>
              <TabsTrigger value="rejected" className="text-xs">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('grid')}
            >
              <Grid3X3 className="size-4" />
            </Button>

            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('list')}
            >
              <List className="size-4" />
            </Button>

            <Button onClick={onAdd} className="bg-primary text-primary-foreground">
              <Plus className="mr-2 size-4" />
              Add Listing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}