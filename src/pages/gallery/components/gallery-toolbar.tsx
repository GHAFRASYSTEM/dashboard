import { CheckSquare, Film, Filter, Grid, Image as ImageIcon, Layers, List, Plus, Search, Send, Upload, X } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { cn } from '../../../lib/utils'
import { MEDIA_CATEGORIES, TYPE_FILTERS } from '../utils/gallery-config'

interface Props {
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  typeFilter: string
  onTypeChange: (value: string) => void
  viewMode: 'grid' | 'list' | 'groups'
  onViewModeChange: (value: 'grid' | 'list' | 'groups') => void
  selectionMode: boolean
  selectedCount: number
  onEnterSelection: () => void
  onExitSelection: () => void
  onOpenPublish: () => void
}

export function GalleryToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  typeFilter,
  onTypeChange,
  viewMode,
  onViewModeChange,
  selectionMode,
  selectedCount,
  onEnterSelection,
  onExitSelection,
  onOpenPublish,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-56">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
          <Input
            placeholder="Search media…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/30 focus:border-white/30"
          />
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-36 border-white/10 bg-white/5 text-white">
            <Filter className="mr-2 size-3.5 text-white/40" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#1e1e24]">
            {MEDIA_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category} className="text-white focus:bg-white/10">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex overflow-hidden rounded-lg border border-white/10">
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => onTypeChange(filter)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium transition',
                typeFilter === filter
                  ? 'bg-violet-600 text-white'
                  : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'
              )}
            >
              {filter === 'Pictures' && <ImageIcon className="mr-1 inline size-3" />}
              {filter === 'Videos' && <Film className="mr-1 inline size-3" />}
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {selectionMode ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/50">{selectedCount} selected</span>
            <Button
              size="sm"
              disabled={selectedCount === 0}
              onClick={onOpenPublish}
              className="bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40"
            >
              <Send className="mr-1.5 size-3.5" />
              Publish Group
            </Button>
            <Button size="sm" variant="ghost" onClick={onExitSelection} className="text-white/50 hover:text-white">
              <X className="mr-1 size-3.5" />
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={onEnterSelection}
            className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <CheckSquare className="mr-1.5 size-3.5" />
            Select
          </Button>
        )}

        <div className="flex overflow-hidden rounded-lg border border-white/10">
          {(['grid', 'list', 'groups'] as const).map((mode) => (
            <Button
              key={mode}
              variant="ghost"
              size="icon"
              className={cn(
                'size-9 rounded-none text-white/50 hover:text-white',
                viewMode === mode && 'bg-white/10 text-white'
              )}
              onClick={() => onViewModeChange(mode)}
              title={mode}
            >
              {mode === 'grid' && <Grid className="size-4" />}
              {mode === 'list' && <List className="size-4" />}
              {mode === 'groups' && <Layers className="size-4" />}
            </Button>
          ))}
        </div>

        <Button className="bg-violet-600 text-white hover:bg-violet-500">
          <Upload className="mr-2 size-4" />
          Upload
        </Button>
      </div>
    </div>
  )
}