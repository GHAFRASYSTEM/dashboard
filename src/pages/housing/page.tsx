import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Bed,
  Bath,
  Square,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface Housing {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  status: 'available' | 'rented' | 'pending'
  createdAt: Date
}

const mockHousing: Housing[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment',
    description: 'Beautiful apartment with city views...',
    price: 1500,
    location: 'Downtown, City Center',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    images: ['/placeholder.jpg'],
    status: 'available',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Cozy Studio Near Campus',
    description: 'Perfect for students, fully furnished...',
    price: 800,
    location: 'University District',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    images: ['/placeholder.jpg'],
    status: 'available',
    createdAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    title: 'Spacious 3BR Family Home',
    description: 'Large family home with backyard...',
    price: 2200,
    location: 'Suburban Heights',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    images: ['/placeholder.jpg'],
    status: 'rented',
    createdAt: new Date('2024-03-13'),
  },
  {
    id: '4',
    title: 'Luxury Penthouse Suite',
    description: 'Top floor penthouse with panoramic views...',
    price: 4500,
    location: 'Financial District',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    images: ['/placeholder.jpg'],
    status: 'pending',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: '5',
    title: '1BR Apartment Near Metro',
    description: 'Convenient location, easy commute...',
    price: 1100,
    location: 'Transit Hub Area',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    images: ['/placeholder.jpg'],
    status: 'available',
    createdAt: new Date('2024-03-11'),
  },
  {
    id: '6',
    title: 'Charming Townhouse',
    description: 'Historic townhouse with modern amenities...',
    price: 1800,
    location: 'Old Town District',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    images: ['/placeholder.jpg'],
    status: 'available',
    createdAt: new Date('2024-03-10'),
  },
]

const statusColors = {
  available: 'bg-primary/10 text-primary',
  rented: 'bg-muted text-muted-foreground',
  pending: 'bg-destructive/10 text-destructive',
}

export default function HousingPage() {
  const [housing, setHousing] = useState(mockHousing)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingHousing, setEditingHousing] = useState<Housing | null>(null)

  const filteredHousing = housing.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setEditingHousing(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Housing) => {
    setEditingHousing(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setHousing(housing.filter((h) => h.id !== id))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newHousing: Housing = {
      id: editingHousing?.id || Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      location: formData.get('location') as string,
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      sqft: Number(formData.get('sqft')),
      images: editingHousing?.images || ['/placeholder.jpg'],
      status: (formData.get('status') as Housing['status']) || 'available',
      createdAt: editingHousing?.createdAt || new Date(),
    }

    if (editingHousing) {
      setHousing(housing.map((h) => (h.id === editingHousing.id ? newHousing : h)))
    } else {
      setHousing([newHousing, ...housing])
    }

    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Housing Management" breadcrumbs={[{ label: 'Housing' }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search housing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-secondary pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border">
              <Filter className="mr-2 size-4" />
              Filter
            </Button>
            <Button
              onClick={handleAdd}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 size-4" />
              Add Listing
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHousing.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-border bg-card">
              <div className="relative aspect-video bg-secondary">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-3 left-3">
                  <Badge className={cn('capitalize', statusColors[item.status])}>
                    {item.status}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="size-8 bg-background/80 backdrop-blur"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-border bg-popover">
                      <DropdownMenuItem onClick={() => {}}>
                        <Eye className="mr-2 size-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Edit className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 font-semibold">{item.title}</h3>
                  <span className="text-lg font-bold text-primary">
                    ${item.price.toLocaleString()}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3" />
                  <span className="truncate">{item.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="size-4" />
                    <span>{item.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="size-4" />
                    <span>{item.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="size-4" />
                    <span>{item.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-border bg-card sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingHousing ? 'Edit Listing' : 'Add New Listing'}</DialogTitle>
            <DialogDescription>
              {editingHousing
                ? 'Update the housing listing details.'
                : 'Fill in the details to create a new housing listing.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave}>
            <div className="grid max-h-[60vh] gap-4 overflow-y-auto py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingHousing?.title}
                  placeholder="Enter listing title..."
                  className="border-border bg-secondary"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingHousing?.description}
                  placeholder="Describe the property..."
                  className="min-h-[100px] border-border bg-secondary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($/month)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={editingHousing?.price}
                    placeholder="1500"
                    className="border-border bg-secondary"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingHousing?.location}
                    placeholder="Downtown, City"
                    className="border-border bg-secondary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    defaultValue={editingHousing?.bedrooms}
                    placeholder="2"
                    className="border-border bg-secondary"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    defaultValue={editingHousing?.bathrooms}
                    placeholder="1"
                    className="border-border bg-secondary"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sqft">Sq. Ft.</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    defaultValue={editingHousing?.sqft}
                    placeholder="850"
                    className="border-border bg-secondary"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingHousing?.status || 'available'}>
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  name="status"
                  value={editingHousing?.status || 'available'}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingHousing ? 'Save Changes' : 'Add Listing'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}