import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { format } from 'date-fns'
import {
  Images,
  Search,
  Filter,
  Upload,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Calendar,
  Folder,
  Grid,
  List,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface GalleryImage {
  id: string
  title: string
  url: string
  category: string
  uploadedBy: string
  uploadedAt: Date
  size: string
}

const mockImages: GalleryImage[] = [
  { id: '1', title: 'AGM 2024 - Opening Ceremony', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-15'), size: '2.4 MB' },
  { id: '2', title: 'Community Outreach Program', url: '/placeholder.jpg', category: 'Community', uploadedBy: 'John Doe', uploadedAt: new Date('2024-03-14'), size: '1.8 MB' },
  { id: '3', title: 'Executive Board Meeting', url: '/placeholder.jpg', category: 'Meetings', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-13'), size: '3.1 MB' },
  { id: '4', title: 'Member Appreciation Day', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Sarah Smith', uploadedAt: new Date('2024-03-12'), size: '2.7 MB' },
  { id: '5', title: 'Youth Workshop', url: '/placeholder.jpg', category: 'Training', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-11'), size: '1.5 MB' },
  { id: '6', title: 'Charity Fundraiser', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Mike Johnson', uploadedAt: new Date('2024-03-10'), size: '2.2 MB' },
  { id: '7', title: 'Sports Day 2024', url: '/placeholder.jpg', category: 'Sports', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-09'), size: '4.0 MB' },
  { id: '8', title: 'Cultural Night Celebration', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Emily Brown', uploadedAt: new Date('2024-03-08'), size: '3.5 MB' },
  { id: '9', title: 'Health Screening Program', url: '/placeholder.jpg', category: 'Community', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-07'), size: '1.9 MB' },
  { id: '10', title: 'Leadership Training', url: '/placeholder.jpg', category: 'Training', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-06'), size: '2.1 MB' },
  { id: '11', title: 'New Year Gathering', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-01-05'), size: '2.8 MB' },
  { id: '12', title: 'Annual Awards Ceremony', url: '/placeholder.jpg', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-02-20'), size: '3.3 MB' },
]

const categories = ['All', 'Events', 'Community', 'Meetings', 'Training', 'Sports']

export default function GalleryPage() {
  const [images, setImages] = useState(mockImages)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handlePreview = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsPreviewOpen(true)
  }

  const totalSize = images.reduce((acc, img) => {
    const size = parseFloat(img.size.replace(' MB', ''))
    return acc + size
  }, 0)

  return (
    <DashboardLayout title="Gallery Management" breadcrumbs={[{ label: 'Gallery' }]}>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Images className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{images.length}</p>
                  <p className="text-sm text-muted-foreground">Total Images</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Folder className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{categories.length - 1}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Download className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalSize.toFixed(1)} MB</p>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Calendar className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      images.filter((i) => {
                        const date = new Date(i.uploadedAt)
                        const now = new Date()
                        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                      }).length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-border bg-secondary pl-9"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] border-border bg-secondary">
                <Filter className="mr-2 size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="overflow-hidden rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                className={cn('size-9 rounded-none', viewMode === 'grid' && 'bg-secondary')}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn('size-9 rounded-none', viewMode === 'list' && 'bg-secondary')}
                onClick={() => setViewMode('list')}
              >
                <List className="size-4" />
              </Button>
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="mr-2 size-4" />
              Upload Images
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="group overflow-hidden border-border bg-card">
                <div className="relative aspect-square bg-secondary">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="size-9" onClick={() => handlePreview(image)}>
                      <Eye className="size-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="size-9">
                      <Download className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-9 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-background/80 text-xs text-foreground">
                    {image.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="truncate text-sm font-medium">{image.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(image.uploadedAt, 'MMM d, yyyy')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/30"
                  >
                    <div className="size-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{image.title}</p>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{image.category}</span>
                        <span>{image.size}</span>
                        <span>{format(image.uploadedAt, 'MMM d, yyyy')}</span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-border bg-popover">
                        <DropdownMenuItem onClick={() => handlePreview(image)}>
                          <Eye className="mr-2 size-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 size-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(image.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredImages.length === 0 && (
          <div className="py-12 text-center">
            <Images className="mx-auto mb-4 size-12 text-muted-foreground" />
            <p className="text-muted-foreground">No images found</p>
          </div>
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="border-border bg-card sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>
              Uploaded by {selectedImage?.uploadedBy} on{' '}
              {selectedImage && format(selectedImage.uploadedAt, 'MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>

          {selectedImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                {selectedImage?.category}
              </Badge>
              <span>{selectedImage?.size}</span>
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="mr-2 size-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}