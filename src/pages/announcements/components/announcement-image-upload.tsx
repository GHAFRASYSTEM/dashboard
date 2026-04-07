import { ImagePlus, X } from 'lucide-react'

interface Props {
  uploadedImages: string[]
  onRemoveImage: (index: number) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AnnouncementImageUpload({
  uploadedImages,
  onRemoveImage,
  onImageUpload,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Images</label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {uploadedImages.map((img, index) => (
          <div key={index} className="group relative aspect-video overflow-hidden rounded-lg">
            <img src={img} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary/50 hover:bg-primary/5">
          <ImagePlus className="mb-2 size-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Add Image</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      </div>
    </div>
  )
}