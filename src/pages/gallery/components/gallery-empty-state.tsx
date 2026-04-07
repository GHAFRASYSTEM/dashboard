import { Images } from 'lucide-react'

export function GalleryEmptyState() {
  return (
    <div className="py-16 text-center">
      <Images className="mx-auto mb-4 size-12 text-white/20" />
      <p className="text-white/40">No media found matching your filters.</p>
    </div>
  )
}