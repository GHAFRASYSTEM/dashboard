import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog'
import { Button }   from '../../../components/ui/button'
import { Input }    from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Label }    from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { AnnouncementImageUpload } from './announcement-image-upload'
import { CATEGORY_OPTIONS }         from '../utils/announcement-config'
import type { Announcement }        from '../types/announcement'
import { useRef, useEffect, useState } from 'react'

interface Props {
  open:                  boolean
  onOpenChange:          (open: boolean) => void
  editingAnnouncement:   Announcement | null
  uploadedImage:         string | null
  onImageUpload:         (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage:         () => void
  onSubmit:              (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export function AnnouncementFormDialog({
  open,
  onOpenChange,
  editingAnnouncement,
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  onSubmit,
}: Props) {
  const formRef          = useRef<HTMLFormElement>(null)
  const [saving, setSaving] = useState(false)
  // Category must be controlled because it's in a shadcn Select
  const [category, setCategory] = useState(
    editingAnnouncement?.category ?? 'news'
  )

  // Sync category when editing a different announcement
  useEffect(() => {
    setCategory(editingAnnouncement?.category ?? 'news')
  }, [editingAnnouncement, open])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit(e)
    } finally {
      setSaving(false)
    }
  }

  const isEditing = !!editingAnnouncement

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit announcement' : 'New announcement'}
          </DialogTitle>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            {/* Hidden input so FormData picks it up */}
            <input type="hidden" name="category" value={category} />
            <Select
  value={category}
  onValueChange={(value) =>
    setCategory(value as Announcement['category'])
  }
>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              required
              minLength={3}
              maxLength={200}
              placeholder="Announcement title"
              defaultValue={editingAnnouncement?.title ?? ''}
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label htmlFor="body">
              Body <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="body"
              name="body"
              required
              minLength={10}
              rows={5}
              placeholder="Write the full announcement content here…"
              defaultValue={editingAnnouncement?.body ?? ''}
              className="resize-none"
            />
          </div>

          {/* Image */}
          <AnnouncementImageUpload
            uploadedImage={uploadedImage ?? editingAnnouncement?.image_uri ?? null}
            onImageUpload={onImageUpload}
            onRemoveImage={onRemoveImage}
          />

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving
                ? isEditing ? 'Saving…' : 'Publishing…'
                : isEditing ? 'Save changes' : 'Publish'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}