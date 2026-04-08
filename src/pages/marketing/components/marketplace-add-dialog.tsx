import { Plus, Upload, X } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'

interface NewMarketplaceAd {
  title: string
  description: string
  summary: string
  images: string[]
  price: string
  priceType: 'fixed' | 'negotiable' | 'free' | 'contact'
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  location: string
  submittedBy: string
  email: string
  phone: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: string[]
  newAd: NewMarketplaceAd
  onNewAdChange: (value: NewMarketplaceAd) => void
  onUploadImage: () => void
  onRemoveImage: (index: number) => void
  onAdd: () => void
}

export function MarketplaceAddDialog({
  open,
  onOpenChange,
  categories,
  newAd,
  onNewAdChange,
  onUploadImage,
  onRemoveImage,
  onAdd,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="size-5" />
            Add New Listing
          </DialogTitle>
          <DialogDescription>
            Create a new marketplace listing directly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Images</Label>
            <div className="grid grid-cols-4 gap-3">
              {newAd.images.map((image, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <img src={image} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="size-6 text-white" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                onClick={onUploadImage}
              >
                <Upload className="size-6" />
                <span className="text-xs">Add Image</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter listing title"
              value={newAd.title}
              onChange={(e) => onNewAdChange({ ...newAd, title: e.target.value })}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Short Summary *</Label>
            <Input
              id="summary"
              placeholder="Brief summary (shown in cards)"
              value={newAd.summary}
              onChange={(e) => onNewAdChange({ ...newAd, summary: e.target.value })}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the product or service"
              value={newAd.description}
              onChange={(e) => onNewAdChange({ ...newAd, description: e.target.value })}
              className="min-h-[100px] border-border bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={newAd.price}
                onChange={(e) => onNewAdChange({ ...newAd, price: e.target.value })}
                className="border-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceType">Price Type</Label>
              <Select
                value={newAd.priceType}
                onValueChange={(value) =>
                  onNewAdChange({
                    ...newAd,
                    priceType: value as typeof newAd.priceType,
                  })
                }
              >
                <SelectTrigger className="border-border bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="contact">Contact for Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={newAd.category}
                onValueChange={(value) => onNewAdChange({ ...newAd, category: value })}
              >
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={newAd.condition}
                onValueChange={(value) =>
                  onNewAdChange({
                    ...newAd,
                    condition: value as typeof newAd.condition,
                  })
                }
              >
                <SelectTrigger className="border-border bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Enter location"
              value={newAd.location}
              onChange={(e) => onNewAdChange({ ...newAd, location: e.target.value })}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-4 border-t border-border pt-4">
            <h4 className="font-medium">Contact Information</h4>

            <div className="space-y-2">
              <Label htmlFor="submittedBy">Name / Business Name *</Label>
              <Input
                id="submittedBy"
                placeholder="Enter name or business name"
                value={newAd.submittedBy}
                onChange={(e) => onNewAdChange({ ...newAd, submittedBy: e.target.value })}
                className="border-border bg-background"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={newAd.email}
                  onChange={(e) => onNewAdChange({ ...newAd, email: e.target.value })}
                  className="border-border bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={newAd.phone}
                  onChange={(e) => onNewAdChange({ ...newAd, phone: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onAdd}
            disabled={
              !newAd.title ||
              !newAd.description ||
              !newAd.category ||
              !newAd.submittedBy ||
              !newAd.email
            }
            className="bg-primary text-primary-foreground"
          >
            <Plus className="mr-2 size-4" />
            Add Listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}