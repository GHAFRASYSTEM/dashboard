'use client'

import { useState, type SetStateAction } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Textarea } from '../../components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { format } from 'date-fns'
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  Eye,
  Heart,
  ImageIcon,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Tag,
  Trash2,
  X,
  XCircle,
  Copy,

  Send,
  Package,
  ShieldCheck,
  AlertTriangle,
  Flag,
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

const mockAds: MarketplaceAd[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB',
    description: 'Brand new iPhone 15 Pro Max in Natural Titanium. Comes with original box, charger, and 1-year warranty. Never used, still sealed.\n\nFeatures:\n- A17 Pro chip with 6-core GPU\n- 6.7-inch Super Retina XDR display\n- Pro camera system with 48MP main\n- Action button\n- USB-C connector\n\nThis is a genuine Apple product with full warranty support. Can meet in person for verification.',
    summary: 'Brand new sealed iPhone 15 Pro Max with warranty',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop',
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
    description: 'Offering professional photography services for weddings, events, portraits, and commercial shoots. 10+ years of experience with high-end equipment.\n\nServices include:\n- Wedding photography (full day coverage)\n- Event photography\n- Portrait sessions\n- Product photography\n- Commercial shoots\n\nAll packages include edited photos delivered within 2 weeks. Premium packages include same-day previews.',
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
    description: 'Well-maintained Toyota Camry with only 25,000 miles. Single owner, all service records available. Clean title, no accidents.\n\nVehicle Details:\n- Year: 2022\n- Mileage: 25,000 miles\n- Engine: 2.5L 4-cylinder\n- Transmission: Automatic\n- Color: Silver exterior, Black interior\n- Features: Apple CarPlay, Android Auto, Lane Departure Warning, Adaptive Cruise Control\n\nRegular oil changes and maintenance performed at authorized dealership. All records available for inspection.',
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
    description: 'Beautiful modern apartment with 2 bedrooms, 2 bathrooms, fully furnished with city views. Includes parking and gym access.\n\nApartment Features:\n- 2 spacious bedrooms\n- 2 full bathrooms\n- Open concept living/dining\n- Fully equipped kitchen\n- In-unit washer/dryer\n- Private balcony with city views\n\nBuilding Amenities:\n- 24/7 concierge\n- Fitness center\n- Rooftop lounge\n- Underground parking (1 spot included)\n- Pet-friendly\n\nUtilities included: Water, trash. Tenant pays electric and internet.',
    summary: 'Furnished 2BR apartment with amenities',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop',
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

export default function MarketplaceDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [message, setMessage] = useState('')

  const adFromState = location.state?.ad as MarketplaceAd | undefined
  const ad = adFromState || mockAds.find((a) => a.id === params.id)

  if (!ad) {
    return (
      <DashboardLayout title="Not Found" breadcrumbs={[{ label: 'Marketplace', href: '/marketing' }, { label: 'Not Found' }]}>
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <Package className="size-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Listing Not Found</h3>
            <p className="text-muted-foreground mb-4">This listing may have been removed or is no longer available.</p>
            <Button onClick={() => navigate('/marketing')}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    )
  }

  const StatusIcon = statusConfig[ad.status].icon

  const formatPrice = (ad: MarketplaceAd) => {
    if (ad.priceType === 'free') return 'Free'
    if (ad.priceType === 'contact') return 'Contact for Price'
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ad.price)
    return ad.priceType === 'negotiable' ? `${formatted}` : formatted
  }

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 text-foreground">
            {line.slice(2)}
          </li>
        )
      }
      if (line.endsWith(':')) {
        return (
          <p key={i} className="font-semibold mt-4 mb-2 text-foreground">
            {line}
          </p>
        )
      }
      if (line === '') {
        return <br key={i} />
      }
      return (
        <p key={i} className="text-foreground">
          {line}
        </p>
      )
    })
  }

  const relatedAds = mockAds.filter((a) => a.id !== ad.id && a.category === ad.category && a.status === 'approved').slice(0, 3)

  const handleApprove = () => {
    navigate('/marketing')
  }

  const handleReject = () => {
    navigate('/marketing')
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    navigate('/marketing')
  }

  return (
    <DashboardLayout
      title={ad.title}
      breadcrumbs={[{ label: 'Marketplace', href: '/marketing' }, { label: ad.title }]}
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/marketing')} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4 mr-2" />
          Back to Marketplace
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border overflow-hidden">
            <div className="relative aspect-[16/10] bg-muted">
              {ad.images.length > 0 ? (
                <>
                  <img
                    src={ad.images[currentImageIndex]}
                    alt={ad.title}
                    className="size-full object-cover cursor-pointer"
                    onClick={() => setIsFullscreenOpen(true)}
                  />
                  {ad.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                        <Star className="size-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  {ad.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 hover:bg-white shadow-lg"
                        onClick={() =>
                          setCurrentImageIndex((currentImageIndex - 1 + ad.images.length) % ad.images.length)
                        }
                      >
                        <ChevronLeft className="size-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 hover:bg-white shadow-lg"
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % ad.images.length)}
                      >
                        <ChevronRight className="size-5" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm">
                        {currentImageIndex + 1} / {ad.images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="size-full flex items-center justify-center">
                  <ImageIcon className="size-16 text-muted-foreground/50" />
                </div>
              )}
            </div>
            {ad.images.length > 1 && (
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {ad.images.map((img, i) => (
                    <button
                      key={i}
                      className={`relative flex-shrink-0 size-20 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentImageIndex ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setCurrentImageIndex(i)}
                    >
                      <img src={img} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card className="border-border lg:hidden">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${statusConfig[ad.status].color} border`}>
                  <StatusIcon className="size-3 mr-1" />
                  {statusConfig[ad.status].label}
                </Badge>
                <Badge variant="secondary">{ad.category}</Badge>
                <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                  {conditionConfig[ad.condition].label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{ad.title}</h1>
              <p className="text-3xl font-bold text-primary mb-1">{formatPrice(ad)}</p>
              {ad.priceType === 'negotiable' && (
                <p className="text-sm text-emerald-600 font-medium">Price is negotiable</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground">{renderDescription(ad.description)}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Tag className="size-4 text-primary" />
                    {ad.category}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Condition</p>
                  <p className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    {conditionConfig[ad.condition].label}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    {ad.location}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Posted</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="size-4 text-primary" />
                    {format(ad.submittedAt, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Eye className="size-5 text-muted-foreground" />
                    <span className="font-semibold text-lg">{ad.views}</span>
                    <span className="text-muted-foreground">views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className={`size-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                    <span className="font-semibold text-lg">{ad.likes + (isLiked ? 1 : 0)}</span>
                    <span className="text-muted-foreground">likes</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`size-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsShareDialogOpen(true)}>
                    <Share2 className="size-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {relatedAds.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Related Listings</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedAds.map((related) => (
                  <Card
                    key={related.id}
                    className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/marketing/${related.id}`, { state: { ad: related } })}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {related.images[0] ? (
                        <img
                          src={related.images[0]}
                          alt={related.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center">
                          <ImageIcon className="size-8 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors mb-1">
                        {related.title}
                      </h3>
                      <p className="font-bold text-primary">{formatPrice(related)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-border hidden lg:block">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${statusConfig[ad.status].color} border`}>
                  <StatusIcon className="size-3 mr-1" />
                  {statusConfig[ad.status].label}
                </Badge>
                {ad.featured && (
                  <Badge className="bg-amber-500 text-white border-0">
                    <Star className="size-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{ad.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{ad.category}</Badge>
                <Badge variant="secondary" className={conditionConfig[ad.condition].color}>
                  {conditionConfig[ad.condition].label}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-primary mb-1">{formatPrice(ad)}</p>
              {ad.priceType === 'negotiable' && (
                <p className="text-sm text-emerald-600 font-medium">Price is negotiable</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="size-16 border-2 border-primary/20">
                  <AvatarImage src={ad.avatar} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {ad.submittedBy[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{ad.submittedBy}</p>
                  <p className="text-sm text-muted-foreground">Member since 2023</p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${ad.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <Mail className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm truncate">{ad.email}</span>
                </a>
                <a
                  href={`tel:${ad.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <Phone className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm">{ad.phone}</span>
                </a>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full" onClick={() => setIsContactDialogOpen(true)}>
                  <MessageCircle className="size-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${ad.phone}`}>
                    <Phone className="size-4 mr-2" />
                    Call Seller
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ad.status === 'pending' && (
                <>
                  <Button
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={handleApprove}
                  >
                    <Check className="size-4 mr-2" />
                    Approve & Publish
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 text-red-600 hover:bg-red-500/10"
                    onClick={handleReject}
                  >
                    <X className="size-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              <Button variant="outline" className="w-full">
                <Edit2 className="size-4 mr-2" />
                Edit Listing
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-600 hover:bg-red-500/10"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete Listing
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-600" />
                Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  Meet in a safe, public location
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  Check the item before payment
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  Only pay after collecting item
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  Verify seller contact information
                </li>
              </ul>
            </CardContent>
          </Card>

          <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive">
            <Flag className="size-4 mr-2" />
            Report this listing
          </Button>
        </div>
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Listing</DialogTitle>
            <DialogDescription>Share this listing with others</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <LinkIcon className="size-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm truncate flex-1">https://marketplace.com/listing/{ad.id}</span>
              <Button size="sm" variant="secondary">
                <Copy className="size-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" className="size-12 rounded-full">
                <FaFacebook className="size-5" />
              </Button>
              <Button variant="outline" size="icon" className="size-12 rounded-full">
                <FaTwitter className="size-5" />
              </Button>
              <Button variant="outline" size="icon" className="size-12 rounded-full">
                <Mail className="size-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
            <DialogDescription>Send a message to {ad.submittedBy}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="size-10">
                <AvatarImage src={ad.avatar} />
                <AvatarFallback>{ad.submittedBy[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{ad.submittedBy}</p>
                <p className="text-sm text-muted-foreground">Usually responds within 1 hour</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium mb-1">Regarding:</p>
              <p className="text-sm text-muted-foreground">{ad.title}</p>
            </div>
            <Textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setMessage(e.target.value)}
              className="min-h-[120px] bg-background border-border"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsContactDialogOpen(false)}>
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="size-5" />
              Delete Listing
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="font-medium">{ad.title}</p>
            <p className="text-sm text-muted-foreground">{ad.category}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="size-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="bg-black/95 border-0 max-w-[95vw] max-h-[95vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{ad.title} - Image Gallery</DialogTitle>
            <DialogDescription>Full screen image view</DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setIsFullscreenOpen(false)}
            >
              <X className="size-6" />
            </Button>
            <img
              src={ad.images[currentImageIndex]}
              alt={ad.title}
              className="max-w-full max-h-full object-contain"
            />
            {ad.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-12 text-white hover:bg-white/20"
                  onClick={() =>
                    setCurrentImageIndex((currentImageIndex - 1 + ad.images.length) % ad.images.length)
                  }
                >
                  <ChevronLeft className="size-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 size-12 text-white hover:bg-white/20"
                  onClick={() => setCurrentImageIndex((currentImageIndex + 1) % ad.images.length)}
                >
                  <ChevronRight className="size-8" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {ad.images.map((_, i) => (
                    <button
                      key={i}
                      className={`size-3 rounded-full transition-colors ${
                        i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}