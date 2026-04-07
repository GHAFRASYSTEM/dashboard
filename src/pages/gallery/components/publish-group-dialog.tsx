import { useState } from 'react'
import { Play, Send } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import type { MediaGroup, MediaItem } from '../types/gallery'
import { MEDIA_CATEGORIES } from '../utils/gallery-config'

interface Props {
  selectedIds: string[]
  allMedia: MediaItem[]
  onPublish: (group: Omit<MediaGroup, 'id' | 'createdAt'>) => void
  onClose: () => void
}

export function PublishGroupDialog({
  selectedIds,
  allMedia,
  onPublish,
  onClose,
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Events')

  const selectedMedia = allMedia.filter((item) => selectedIds.includes(item.id))

  const handleSubmit = () => {
    if (!title.trim()) return

    onPublish({
      title,
      description,
      items: selectedIds,
      createdBy: 'Admin',
      category,
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="border-white/10 bg-[#141418] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-white">Publish as Group</DialogTitle>
          <DialogDescription className="text-white/50">
            Bundle {selectedIds.length} selected item{selectedIds.length > 1 ? 's' : ''} into a named collection with a description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {selectedMedia.map((item) => (
              <div key={item.id} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={item.thumbnail ?? item.url}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Play className="size-4 fill-white text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Group Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Birthday Celebration 2024"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add context about this collection — event details, date, who attended…"
                rows={3}
                className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-white/60">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#1e1e24]">
                  {MEDIA_CATEGORIES.filter((categoryOption) => categoryOption !== 'All').map((categoryOption) => (
                    <SelectItem
                      key={categoryOption}
                      value={categoryOption}
                      className="text-white focus:bg-white/10"
                    >
                      {categoryOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} className="text-white/60 hover:text-white">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40"
          >
            <Send className="mr-2 size-4" />
            Publish Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}