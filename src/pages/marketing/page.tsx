'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
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
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { format } from 'date-fns'
import {
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Eye,
  Check,
  X,
  Upload,
  ImageIcon,
  Phone,
  Mail,
  MapPin,
  Tag,
  Calendar,
  User,
  Heart,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Store,
  TrendingUp,
  Package,
  Sparkles,
} from 'lucide-react'

interface MarketplaceAd {
  id: string
  title: string
  description: string
  summary: string
  images: string[]
  price: number
  priceType: 'fixed' | 'negotiable' | 'free' | 'contact'
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  location: string
  submittedBy: string
  email: string
  phone: string
  avatar?: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
  views: number
  likes: number
  featured: boolean
}

const categories = [
  'All Categories',
  'Electronics',
  'Vehicles',
  'Property',
  'Fashion',
  'Home & Garden',
  'Services',
  'Jobs',
  'Education',
  'Health & Beauty',
  'Sports',
  'Pets',
  'Food & Beverage',
  'Other',
]

const mockAds: MarketplaceAd[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB',
    description: 'Brand new iPhone 15 Pro Max in Natural Titanium. Comes with original box, charger, and 1-year warranty. Never used, still sealed.',
    summary: 'Brand new sealed iPhone 15 Pro Max with warranty',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
    ],
    price: 1299,
    priceType: 'fixed',
    category: 'Electronics',
    condition: 'new',
    location: 'Downtown, City Center',
    submittedBy: 'John Electronics',
    email: 'john@electronics.com',
    phone: '+1 234 567 8901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'approved',
    submittedAt: new Date('2024-03-15'),
    views: 234,
    likes: 45,
    featured: true,
  },
  {
    id: '2',
    title: 'Professional Photography Services',
    description: 'Offering professional photography services for weddings, events, portraits, and commercial shoots. 10+ years of experience with high-end equipment.',
    summary: 'Professional photography for all occasions',
    images: [
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
    ],
    price: 500,
    priceType: 'negotiable',
    category: 'Services',
    condition: 'new',
    location: 'Citywide Service',
    submittedBy: 'Sarah Studios',
    email: 'sarah@studios.com',
    phone: '+1 234 567 8902',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'approved',
    submittedAt: new Date('2024-03-14'),
    views: 189,
    likes: 32,
    featured: true,
  },
  {
    id: '3',
    title: '2022 Toyota Camry SE',
    description: 'Well-maintained Toyota Camry with only 25,000 miles. Single owner, all service records available. Clean title, no accidents.',
    summary: 'Low mileage Camry in excellent condition',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    ],
    price: 24500,
    priceType: 'negotiable',
    category: 'Vehicles',
    condition: 'like-new',
    location: 'North District',
    submittedBy: 'Mike Auto',
    email: 'mike@auto.com',
    phone: '+1 234 567 8903',
    status: 'pending',
    submittedAt: new Date('2024-03-13'),
    views: 156,
    likes: 28,
    featured: false,
  },
  {
    id: '4',
    title: 'Modern 2BR Apartment for Rent',
    description: 'Beautiful modern apartment with 2 bedrooms, 2 bathrooms, fully furnished with city views. Includes parking and gym access.',
    summary: 'Furnished 2BR apartment with amenities',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    price: 2500,
    priceType: 'fixed',
    category: 'Property',
    condition: 'new',
    location: 'Central Business District',
    submittedBy: 'Premier Realty',
    email: 'info@premierrealty.com',
    phone: '+1 234 567 8904',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    status: 'approved',
    submittedAt: new Date('2024-03-12'),
    views: 412,
    likes: 87,
    featured: true,
  },
  {
    id: '5',
    title: 'Home Catering Services',
    description: 'Delicious homemade meals for events, parties, and daily orders. Specializing in local and international cuisine.',
    summary: 'Home catering for events and daily meals',
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
    ],
    price: 0,
    priceType: 'contact',
    category: 'Food & Beverage',
    condition: 'new',
    location: 'Delivery Available',
    submittedBy: 'Mama Kitchen',
    email: 'orders@mamakitchen.com',
    phone: '+1 234 567 8905',
    status: 'pending',
    submittedAt: new Date('2024-03-11'),
    views: 98,
    likes: 15,
    featured: false,
  },
  {
    id: '6',
    title: 'Gaming PC Setup',
    description: 'High-end gaming PC with RTX 4080, i9 processor, 32GB RAM, 2TB SSD. Includes monitor, keyboard, and mouse.',
    summary: 'Complete gaming setup with RTX 4080',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop',
    ],
    price: 2800,
    priceType: 'negotiable',
    category: 'Electronics',
    condition: 'good',
    location: 'Tech District',
    submittedBy: 'Gaming Zone',
    email: 'sales@gamingzone.com',
    phone: '+1 234 567 8906',
    status: 'rejected',
    submittedAt: new Date('2024-03-10'),
    views: 78,
    likes: 12,
    featured: false,
  },
  {
    id: '7',
    title: 'Digital Marketing Course',
    description: 'Comprehensive 12-week digital marketing program covering SEO, social media, PPC, and analytics. Certificate included.',
    summary: '12-week digital marketing certification',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    ],
    price: 299,
    priceType: 'fixed',
    category: 'Education',
    condition: 'new',
    location: 'Online',
    submittedBy: 'Tech Academy',
    email: 'enroll@techacademy.com',
    phone: '+1 234 567 8907',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'approved',
    submittedAt: new Date('2024-03-09'),
    views: 567,
    likes: 123,
    featured: false,
  },
  {
    id: '8',
    title: 'Vintage Leather Sofa Set',
    description: 'Beautiful vintage leather sofa set including 3-seater, 2-seater, and armchair. Genuine leather in excellent condition.',
    summary: 'Classic leather sofa set - 3 pieces',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    ],
    price: 1200,
    priceType: 'negotiable',
    category: 'Home & Garden',
    condition: 'good',
    location: 'West Side',
    submittedBy: 'Classic Furniture',
    email: 'info@classicfurn.com',
    phone: '+1 234 567 8908',
    status: 'approved',
    submittedAt: new Date('2024-03-08'),
    views: 145,
    likes: 34,
    featured: false,
  },
]

const statusConfig = {
  pending: { label: 'Pending Review', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', icon: Clock },
  approved: { label: 'Published', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: XCircle },
}

const conditionConfig = {
  new: { label: 'New', color: 'bg-emerald-500/10 text-emerald-600' },
  'like-new': { label: 'Like New', color: 'bg-blue-500/10 text-blue-600' },
  good: { label: 'Good', color: 'bg-amber-500/10 text-amber-600' },
  fair: { label: 'Fair', color: 'bg-orange-500/10 text-orange-600' },
}

export default function MarketplacePage() {
  const navigate = useNavigate()

  const [ads, setAds] = useState(mockAds)
  const [selectedAd, setSelectedAd] = useState<MarketplaceAd | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    summary: '',
    images: [] as string[],
    price: '',
    priceType: 'fixed' as const,
    category: '',
    condition: 'new' as const,
    location: '',
    submittedBy: '',
    email: '',
    phone: '',
  })

  const pendingCount = ads.filter((s) => s.status === 'pending').length
  const approvedCount = ads.filter((s) => s.status === 'approved').length
  const rejectedCount = ads.filter((s) => s.status === 'rejected').length
  const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0)

  const filteredAds = ads.filter((ad) => {
    const matchesCategory = selectedCategory === 'All Categories' || ad.category === selectedCategory
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter
    const matchesSearch =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const featuredAds = filteredAds.filter((ad) => ad.featured && ad.status === 'approved')

  const handleApprove = (id: string) => {
    setAds(ads.map((s) => (s.id === id ? { ...s, status: 'approved' as const } : s)))
    setIsViewDialogOpen(false)
  }

  const handleReject = (id: string) => {
    setAds(ads.map((s) => (s.id === id ? { ...s, status: 'rejected' as const } : s)))
    setIsViewDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setAds(ads.filter((s) => s.id !== id))
    setIsViewDialogOpen(false)
  }

  const handleView = (ad: MarketplaceAd) => {
    setSelectedAd(ad)
    setCurrentImageIndex(0)
    setIsViewDialogOpen(true)

    navigate(`/marketing/${ad.id}`, {
      state: { ad },
    })
  }

  const handleImageUpload = () => {
    const newImages = [
      ...newAd.images,
      `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`,
    ]
    setNewAd({ ...newAd, images: newImages })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = newAd.images.filter((_, i) => i !== index)
    setNewAd({ ...newAd, images: newImages })
  }

  const handleAddAd = () => {
    const ad: MarketplaceAd = {
      id: String(ads.length + 1),
      ...newAd,
      price: parseFloat(newAd.price) || 0,
      status: 'approved',
      submittedAt: new Date(),
      views: 0,
      likes: 0,
      featured: false,
    }
    setAds([ad, ...ads])
    setNewAd({
      title: '',
      description: '',
      summary: '',
      images: [],
      price: '',
      priceType: 'fixed',
      category: '',
      condition: 'new',
      location: '',
      submittedBy: '',
      email: '',
      phone: '',
    })
    setIsAddDialogOpen(false)
  }

  const formatPrice = (ad: MarketplaceAd) => {
    if (ad.priceType === 'free') return 'Free'
    if (ad.priceType === 'contact') return 'Contact for Price'
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ad.price)
    return ad.priceType === 'negotiable' ? `${formatted} (Negotiable)` : formatted
  }

  return (
    <DashboardLayout title="Marketplace" breadcrumbs={[{ label: 'Marketplace' }]}>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-amber-500/10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Clock className="size-6 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
          <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-emerald-500/10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle className="size-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Published Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-red-500/5 to-red-500/10">
          <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-red-500/10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <XCircle className="size-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{rejectedCount}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <div className="absolute top-0 right-0 size-32 -mr-8 -mt-8 rounded-full bg-blue-500/10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <TrendingUp className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {featuredAds.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-amber-500" />
            <h2 className="text-lg font-semibold">Featured Listings</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredAds.slice(0, 3).map((ad) => (
              <Card
                key={ad.id}
                className="group overflow-hidden border-border hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleView(ad)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {ad.images[0] ? (
                    <img
                      src={ad.images[0]}
                      alt={ad.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center">
                      <ImageIcon className="size-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-500 text-white border-0">
                      <Star className="size-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-lg truncate">{ad.title}</p>
                    <p className="text-white/80 text-sm">{formatPrice(ad)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card className="mb-6 border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search ads, products, or sellers..."
                className="pl-10 bg-background border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-background border-border">
                <Tag className="size-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
                <TabsTrigger value="approved" className="text-xs">Published</TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="size-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="size-4" />
              </Button>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary text-primary-foreground">
                <Plus className="size-4 mr-2" />
                Add Listing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredAds.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <Store className="size-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'All Categories' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first listing'}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="size-4 mr-2" />
              Add Listing
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAds.map((ad) => {
            const StatusIcon = statusConfig[ad.status].icon
            return (
              <Card
                key={ad.id}
                className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => handleView(ad)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {ad.images[0] ? (
                    <img
                      src={ad.images[0]}
                      alt={ad.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center">
                      <ImageIcon className="size-12 text-muted-foreground/50" />
                    </div>
                  )}
                  {ad.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs flex items-center gap-1">
                      <ImageIcon className="size-3" />
                      {ad.images.length}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <Badge className={`${statusConfig[ad.status].color} border`}>
                      <StatusIcon className="size-3 mr-1" />
                      {statusConfig[ad.status].label}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="size-8 bg-white/90 hover:bg-white shadow-sm"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(ad) }}>
                          <Eye className="size-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {ad.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleApprove(ad.id) }}>
                              <Check className="size-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReject(ad.id) }}>
                              <X className="size-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDelete(ad.id) }}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {ad.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{ad.summary}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-primary">{formatPrice(ad)}</span>
                    <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                      {conditionConfig[ad.condition].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <MapPin className="size-3" />
                    <span className="truncate">{ad.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={ad.avatar} />
                        <AvatarFallback className="text-xs">{ad.submittedBy[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate max-w-[80px]">{ad.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="size-3" />
                        {ad.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="size-3" />
                        {ad.likes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAds.map((ad) => {
            const StatusIcon = statusConfig[ad.status].icon
            return (
              <Card
                key={ad.id}
                className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => handleView(ad)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <div className="relative w-48 aspect-[4/3] flex-shrink-0 overflow-hidden bg-muted">
                      {ad.images[0] ? (
                        <img
                          src={ad.images[0]}
                          alt={ad.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center">
                          <ImageIcon className="size-8 text-muted-foreground/50" />
                        </div>
                      )}
                      {ad.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs">
                          +{ad.images.length - 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 py-4 pr-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${statusConfig[ad.status].color} border`}>
                              <StatusIcon className="size-3 mr-1" />
                              {statusConfig[ad.status].label}
                            </Badge>
                            <Badge variant="secondary">{ad.category}</Badge>
                            <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                              {conditionConfig[ad.condition].label}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                            {ad.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{ad.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {ad.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              {format(ad.submittedAt, 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-primary mb-2">{formatPrice(ad)}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Eye className="size-4" />
                              {ad.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="size-4" />
                              {ad.likes}
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="outline" size="sm">
                                Actions
                                <MoreVertical className="size-4 ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(ad) }}>
                                <Eye className="size-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {ad.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleApprove(ad.id) }}>
                                    <Check className="size-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReject(ad.id) }}>
                                    <X className="size-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={(e) => { e.stopPropagation(); handleDelete(ad.id) }}
                              >
                                <Trash2 className="size-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        <Avatar className="size-8">
                          <AvatarImage src={ad.avatar} />
                          <AvatarFallback>{ad.submittedBy[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{ad.submittedBy}</p>
                          <p className="text-xs text-muted-foreground">{ad.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-card border-border max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="size-5" />
              Listing Details
            </DialogTitle>
            <DialogDescription>Review and manage this marketplace listing</DialogDescription>
          </DialogHeader>
          {selectedAd && (
            <div className="space-y-6">
              {selectedAd.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedAd.images[currentImageIndex]}
                      alt={selectedAd.title}
                      className="size-full object-cover"
                    />
                    {selectedAd.images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 hover:bg-white"
                          onClick={() =>
                            setCurrentImageIndex(
                              (currentImageIndex - 1 + selectedAd.images.length) % selectedAd.images.length
                            )
                          }
                        >
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 hover:bg-white"
                          onClick={() => setCurrentImageIndex((currentImageIndex + 1) % selectedAd.images.length)}
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                          {selectedAd.images.map((_, i) => (
                            <button
                              key={i}
                              className={`size-2 rounded-full transition-colors ${
                                i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                              onClick={() => setCurrentImageIndex(i)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {selectedAd.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedAd.images.map((img, i) => (
                        <button
                          key={i}
                          className={`relative flex-shrink-0 size-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            i === currentImageIndex ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(i)}
                        >
                          <img src={img} alt="" className="size-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${statusConfig[selectedAd.status].color} border`}>
                    {statusConfig[selectedAd.status].label}
                  </Badge>
                  <Badge variant="secondary">{selectedAd.category}</Badge>
                  <Badge variant="secondary" className={conditionConfig[selectedAd.condition].color}>
                    {conditionConfig[selectedAd.condition].label}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-foreground">{selectedAd.title}</h2>
                <p className="text-2xl font-bold text-primary mt-2">{formatPrice(selectedAd)}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-foreground">{selectedAd.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Summary</h4>
                <p className="text-foreground">{selectedAd.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="size-4" />
                    Location
                  </h4>
                  <p className="text-foreground">{selectedAd.location}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="size-4" />
                    Submitted
                  </h4>
                  <p className="text-foreground">{format(selectedAd.submittedAt, 'MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 py-3 border-y border-border">
                <div className="flex items-center gap-2">
                  <Eye className="size-5 text-muted-foreground" />
                  <span className="font-medium">{selectedAd.views}</span>
                  <span className="text-muted-foreground">views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-muted-foreground" />
                  <span className="font-medium">{selectedAd.likes}</span>
                  <span className="text-muted-foreground">likes</span>
                </div>
              </div>

              <Card className="border-border bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h4>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarImage src={selectedAd.avatar} />
                      <AvatarFallback>{selectedAd.submittedBy[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{selectedAd.submittedBy}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="size-4" />
                          {selectedAd.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="size-4" />
                          {selectedAd.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedAd?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedAd.id)}
                  className="border-red-500/50 text-red-600 hover:bg-red-500/10"
                >
                  <X className="size-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedAd.id)}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Check className="size-4 mr-2" />
                  Approve & Publish
                </Button>
              </>
            )}
            {selectedAd?.status !== 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedAd!.id)}
                  className="border-red-500/50 text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="size-5" />
              Add New Listing
            </DialogTitle>
            <DialogDescription>Create a new marketplace listing directly</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label>Images</Label>
              <div className="grid grid-cols-4 gap-3">
                {newAd.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                    <img src={img} alt="" className="size-full object-cover" />
                    <button
                      type="button"
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      onClick={() => handleRemoveImage(i)}
                    >
                      <X className="size-6 text-white" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                  onClick={handleImageUpload}
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
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Short Summary *</Label>
              <Input
                id="summary"
                placeholder="Brief summary (shown in cards)"
                value={newAd.summary}
                onChange={(e) => setNewAd({ ...newAd, summary: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the product or service"
                value={newAd.description}
                onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                className="bg-background border-border min-h-[100px]"
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
                  onChange={(e) => setNewAd({ ...newAd, price: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceType">Price Type</Label>
                <Select
                  value={newAd.priceType}
                  onValueChange={(v) => setNewAd({ ...newAd, priceType: v as typeof newAd.priceType })}
                >
                  <SelectTrigger className="bg-background border-border">
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
                <Select value={newAd.category} onValueChange={(v) => setNewAd({ ...newAd, category: v })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={newAd.condition}
                  onValueChange={(v) => setNewAd({ ...newAd, condition: v as typeof newAd.condition })}
                >
                  <SelectTrigger className="bg-background border-border">
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
                onChange={(e) => setNewAd({ ...newAd, location: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <h4 className="font-medium flex items-center gap-2">
                <User className="size-4" />
                Contact Information
              </h4>
              <div className="space-y-2">
                <Label htmlFor="submittedBy">Name / Business Name *</Label>
                <Input
                  id="submittedBy"
                  placeholder="Enter name or business name"
                  value={newAd.submittedBy}
                  onChange={(e) => setNewAd({ ...newAd, submittedBy: e.target.value })}
                  className="bg-background border-border"
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
                    onChange={(e) => setNewAd({ ...newAd, email: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={newAd.phone}
                    onChange={(e) => setNewAd({ ...newAd, phone: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddAd}
              disabled={!newAd.title || !newAd.description || !newAd.category || !newAd.submittedBy || !newAd.email}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="size-4 mr-2" />
              Add Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}