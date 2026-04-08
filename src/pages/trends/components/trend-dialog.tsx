import { useRef, useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { ImagePlus, Link2, Plus, X } from 'lucide-react'
import type { Trend, TrendLink } from '../types/trends'
import { CATEGORIES } from '../utils/trend-utils'

interface TrendDialogProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  editing: Trend | null
  onSave: (trend: Trend) => void
}

export function TrendDialog({
  open,
  onOpenChange,
  editing,
  onSave,
}: TrendDialogProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>(editing?.images ?? [])
  const [links, setLinks] = useState<TrendLink[]>(
    editing?.links ?? [{ label: '', url: '' }]
  )
  const [status, setStatus] = useState<Trend['status']>(editing?.status ?? 'draft')
  const [category, setCategory] = useState(editing?.category ?? 'General')

  const handleOpenChange = (value: boolean) => {
    if (value) {
      setImages(editing?.images ?? [])
      setLinks(editing?.links?.length ? editing.links : [{ label: '', url: '' }])
      setStatus(editing?.status ?? 'draft')
      setCategory(editing?.category ?? 'General')
    }
    onOpenChange(value)
  }

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages((prev) => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const updateLink = (index: number, field: keyof TrendLink, value: string) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    )
  }

  const addLink = () => {
    setLinks((prev) => [...prev, { label: '', url: '' }])
  }

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const saved: Trend = {
      id: editing?.id ?? Date.now().toString(),
      title: fd.get('title') as string,
      summary: fd.get('summary') as string,
      content: fd.get('content') as string,
      author: editing?.author ?? 'Admin',
      status,
      category,
      views: editing?.views ?? 0,
      images,
      links: links.filter((link) => link.url.trim()),
      createdAt: editing?.createdAt ?? new Date(),
    }

    onSave(saved)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden border-border bg-card p-0 sm:max-w-[680px]">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-5">
          <DialogTitle className="text-[16px] font-semibold tracking-tight">
            {editing ? 'Edit Trend' : 'Post New Trend'}
          </DialogTitle>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {editing
              ? 'Update this trend post.'
              : 'Share the latest news, updates, or stories with the community.'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-[12px] font-medium text-muted-foreground">
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={editing?.title}
                placeholder="e.g. Community Meetup 2024"
                className="h-10 border-border bg-secondary text-[13.5px]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="summary" className="text-[12px] font-medium text-muted-foreground">
                Summary
              </Label>
              <Textarea
                id="summary"
                name="summary"
                defaultValue={editing?.summary}
                placeholder="A short description shown in the trend card..."
                className="min-h-[72px] resize-none border-border bg-secondary text-[13.5px]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="content" className="text-[12px] font-medium text-muted-foreground">
                Full Content *
              </Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={editing?.content}
                placeholder="Write the full story, details, and context here..."
                className="min-h-[140px] resize-none border-border bg-secondary text-[13.5px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10 border-border bg-secondary text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    {CATEGORIES.map((categoryOption) => (
                      <SelectItem key={categoryOption} value={categoryOption}>
                        {categoryOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-muted-foreground">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as Trend['status'])}>
                  <SelectTrigger className="h-10 border-border bg-secondary text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] font-medium text-muted-foreground">Images</Label>
              <div className="flex flex-wrap gap-2">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className="group relative size-20 overflow-hidden rounded-lg border border-border"
                  >
                    <img src={src} alt="" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="size-3 text-foreground" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex size-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ImagePlus className="size-5" />
                  <span className="text-[10px] font-medium">Add image</span>
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageFiles}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[12px] font-medium text-muted-foreground">
                  Source Links
                </Label>
                <button
                  type="button"
                  onClick={addLink}
                  className="flex items-center gap-1 text-[11px] font-medium text-primary"
                >
                  <Plus className="size-3" />
                  Add link
                </button>
              </div>

              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Link2 className="size-3.5 text-muted-foreground" />
                    </div>

                    <Input
                      value={link.label}
                      onChange={(e) => updateLink(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="h-8 w-32 shrink-0 border-border bg-secondary text-[12px]"
                    />

                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      placeholder="https://..."
                      className="h-8 flex-1 border-border bg-secondary text-[12px]"
                    />

                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/50 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-border px-6 py-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-9 border border-border text-[13px]">
              Cancel
            </Button>
            <Button type="submit" className="h-9 px-5 text-[13px]">
              {editing ? 'Save Changes' : 'Post Trend'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}