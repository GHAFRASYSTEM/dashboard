import { Layers, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { MediaGroup, MediaItem } from '../types/gallery'
import { GroupCard } from './group-card'

interface Props {
  groups: MediaGroup[]
  media: MediaItem[]
  onOpenLightbox: (items: MediaItem[], index: number) => void
  onDeleteGroup: (id: string) => void
  onCreateGroup: () => void
}

export function GalleryGroupsView({
  groups,
  media,
  onOpenLightbox,
  onDeleteGroup,
  onCreateGroup,
}: Props) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">
          Media Groups
        </h2>
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          onClick={onCreateGroup}
        >
          <Plus className="mr-1.5 size-3.5" />
          New Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="py-16 text-center">
          <Layers className="mx-auto mb-4 size-12 text-white/20" />
          <p className="text-white/40">No groups yet. Select media and publish as a group.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              allMedia={media}
              onOpenLightbox={onOpenLightbox}
              onDelete={onDeleteGroup}
            />
          ))}
        </div>
      )}
    </div>
  )
}