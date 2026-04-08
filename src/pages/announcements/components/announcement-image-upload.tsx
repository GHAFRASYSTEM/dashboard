import { ImagePlus, X, Upload } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  uploadedImage:  string | null
  onRemoveImage:  () => void
  onImageUpload:  (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AnnouncementImageUpload({
  uploadedImage,
  onRemoveImage,
  onImageUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Image <span className="text-muted-foreground">(optional)</span>
      </label>

      <div className="relative overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/50">
        {uploadedImage ? (
          <div className="relative aspect-video">
            <img
              src={uploadedImage}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            {/* Remove */}
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
            >
              <X className="size-3.5" />
            </button>
            {/* Replace overlay */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white transition-colors hover:bg-black/80"
            >
              <Upload className="size-3" />
              Replace
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-video w-full flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <div className="rounded-full bg-muted p-3">
              <ImagePlus className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Click to upload image
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                PNG, JPG, WebP — max 10 MB
              </p>
            </div>
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={onImageUpload}
        />
      </div>
    </div>
  )
}