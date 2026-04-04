'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { DataTable, StatusBadge } from '../../components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { format } from 'date-fns'
import { ShoppingBag, Clock, CheckCircle, XCircle, Eye, Check, X } from 'lucide-react'

interface MarketingService {
  id: string
  title: string
  description: string
  submittedBy: string
  email: string
  phone: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
}

const mockServices: MarketingService[] = [
  { id: '1', title: 'Digital Marketing Course', description: 'Comprehensive digital marketing training for beginners and professionals...', submittedBy: 'Tech Academy', email: 'info../..techacademy.com', phone: '+1234567890', category: 'Education', status: 'pending', submittedAt: new Date('2024-03-15') },
  { id: '2', title: 'Home Cleaning Services', description: 'Professional home cleaning services available in all areas...', submittedBy: 'CleanPro Inc', email: 'contact../..cleanpro.com', phone: '+1234567891', category: 'Home Services', status: 'approved', submittedAt: new Date('2024-03-14') },
  { id: '3', title: 'Photography Services', description: 'Wedding and event photography services with professional equipment...', submittedBy: 'PhotoStudio', email: 'hello@photostudio.com', phone: '+1234567892', category: 'Photography', status: 'approved', submittedAt: new Date('2024-03-13') },
  { id: '4', title: 'Car Rental Services', description: 'Affordable car rental with driver option available...', submittedBy: 'AutoRent', email: 'book@autorent.com', phone: '+1234567893', category: 'Transportation', status: 'pending', submittedAt: new Date('2024-03-12') },
  { id: '5', title: 'Catering Services', description: 'Full catering services for events of all sizes...', submittedBy: 'Delicious Bites', email: 'orders@deliciousbites.com', phone: '+1234567894', category: 'Food & Beverage', status: 'rejected', submittedAt: new Date('2024-03-11') },
  { id: '6', title: 'IT Consulting', description: 'Professional IT consulting and support services...', submittedBy: 'TechSolutions', email: 'support@techsolutions.com', phone: '+1234567895', category: 'Technology', status: 'pending', submittedAt: new Date('2024-03-10') },
]

export default function MarketingPage() {
  const [services, setServices] = useState(mockServices)
  const [selectedService, setSelectedService] = useState<MarketingService | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const pendingCount = services.filter(s => s.status === 'pending').length
  const approvedCount = services.filter(s => s.status === 'approved').length
  const rejectedCount = services.filter(s => s.status === 'rejected').length

  const handleApprove = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, status: 'approved' as const } : s))
    setIsViewDialogOpen(false)
  }

  const handleReject = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s))
    setIsViewDialogOpen(false)
  }

  const handleView = (service: MarketingService) => {
    setSelectedService(service)
    setIsViewDialogOpen(true)
  }

  const columns = [
    {
      key: 'title',
      header: 'Service',
      render: (item: MarketingService) => (
        <div className="space-y-1">
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[250px]">{item.description}</p>
        </div>
      ),
    },
    {
      key: 'submittedBy',
      header: 'Submitted By',
      render: (item: MarketingService) => (
        <div>
          <p className="font-medium">{item.submittedBy}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: MarketingService) => (
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: MarketingService) => <StatusBadge status={item.status} />,
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      render: (item: MarketingService) => format(item.submittedAt, 'MMM d, yyyy'),
    },
  ]

  return (
    <DashboardLayout title="Marketing Services" breadcrumbs={[{ label: 'Marketing Services' }]}>
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="size-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="size-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <XCircle className="size-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rejectedCount}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Marketing Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={services}
            columns={columns}
            searchKey="title"
            searchPlaceholder="Search services..."
            actions={(item) => [
              { label: 'View Details', onClick: () => handleView(item) },
              ...(item.status === 'pending' ? [
                { label: 'Approve', onClick: () => handleApprove(item.id) },
                { label: 'Reject', onClick: () => handleReject(item.id), variant: 'destructive' as const },
              ] : []),
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5" />
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription>
              Marketing service request details
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedService.status} />
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {selectedService.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-sm">{selectedService.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Submitted By</h4>
                  <p className="text-sm">{selectedService.submittedBy}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Submitted On</h4>
                  <p className="text-sm">{format(selectedService.submittedAt, 'MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p className="text-sm">{selectedService.email}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                  <p className="text-sm">{selectedService.phone}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedService?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedService.id)}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <X className="size-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedService.id)}
                  className="bg-success text-success-foreground hover:bg-success/90"
                >
                  <Check className="size-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {selectedService?.status !== 'pending' && (
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)} className="border-border">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
