'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { DataTable, StatusBadge } from '../../components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { format } from 'date-fns'
import { Users, UserCheck, UserX, Mail, Phone, Calendar, MapPin, Download } from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  phone: string
  location: string
  membershipId: string
  status: 'active' | 'inactive' | 'pending'
  joinedAt: Date
  lastPayment?: Date
  image?: string
}

const mockMembers: Member[] = [
  { id: '1', name: 'Kwame Asante', email: 'kwame.asante@email.com', phone: '+233 24 111 2222', location: 'Accra', membershipId: 'GAF-001', status: 'active', joinedAt: new Date('2022-01-15'), lastPayment: new Date('2024-03-01') },
  { id: '2', name: 'Ama Serwaa', email: 'ama.serwaa@email.com', phone: '+233 24 222 3333', location: 'Kumasi', membershipId: 'GAF-002', status: 'active', joinedAt: new Date('2022-02-20'), lastPayment: new Date('2024-03-05') },
  { id: '3', name: 'Kofi Mensah', email: 'kofi.mensah@email.com', phone: '+233 24 333 4444', location: 'Takoradi', membershipId: 'GAF-003', status: 'active', joinedAt: new Date('2022-03-10'), lastPayment: new Date('2024-02-28') },
  { id: '4', name: 'Efua Boateng', email: 'efua.boateng@email.com', phone: '+233 24 444 5555', location: 'Accra', membershipId: 'GAF-004', status: 'inactive', joinedAt: new Date('2021-06-01'), lastPayment: new Date('2023-12-15') },
  { id: '5', name: 'Yaw Adjei', email: 'yaw.adjei@email.com', phone: '+233 24 555 6666', location: 'Tema', membershipId: 'GAF-005', status: 'active', joinedAt: new Date('2023-01-20'), lastPayment: new Date('2024-03-10') },
  { id: '6', name: 'Akosua Darko', email: 'akosua.darko@email.com', phone: '+233 24 666 7777', location: 'Cape Coast', membershipId: 'GAF-006', status: 'pending', joinedAt: new Date('2024-03-01') },
  { id: '7', name: 'Kwabena Owusu', email: 'kwabena.owusu@email.com', phone: '+233 24 777 8888', location: 'Sunyani', membershipId: 'GAF-007', status: 'active', joinedAt: new Date('2022-08-15'), lastPayment: new Date('2024-03-08') },
  { id: '8', name: 'Adwoa Amponsah', email: 'adwoa.amponsah@email.com', phone: '+233 24 888 9999', location: 'Accra', membershipId: 'GAF-008', status: 'active', joinedAt: new Date('2023-04-01'), lastPayment: new Date('2024-03-12') },
]

export default function MembersPage() {
  const [members] = useState(mockMembers)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const activeCount = members.filter(m => m.status === 'active').length
  const inactiveCount = members.filter(m => m.status === 'inactive').length
  const pendingCount = members.filter(m => m.status === 'pending').length

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleView = (member: Member) => {
    setSelectedMember(member)
    setIsViewDialogOpen(true)
  }

  const columns = [
    {
      key: 'name',
      header: 'Member',
      render: (item: Member) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={item.image} alt={item.name} />
            <AvatarFallback className="bg-secondary text-xs">
              {getInitials(item.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.membershipId}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (item: Member) => (
        <div className="text-sm">
          <p>{item.email}</p>
          <p className="text-muted-foreground">{item.phone}</p>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item: Member) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-muted-foreground" />
          <span>{item.location}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Member) => <StatusBadge status={item.status} />,
    },
    {
      key: 'lastPayment',
      header: 'Last Payment',
      render: (item: Member) => (
        <span className="text-sm text-muted-foreground">
          {item.lastPayment ? format(item.lastPayment, 'MMM d, yyyy') : '-'}
        </span>
      ),
    },
    {
      key: 'joinedAt',
      header: 'Joined',
      render: (item: Member) => format(item.joinedAt, 'MMM d, yyyy'),
    },
  ]

  return (
    <DashboardLayout title="Members Management" breadcrumbs={[{ label: 'Members' }]}>
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{members.length}</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <UserCheck className="size-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <UserX className="size-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inactiveCount}</p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Users className="size-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Members</CardTitle>
          <Button variant="outline" size="sm" className="border-border">
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            data={members}
            columns={columns}
            searchKey="name"
            searchPlaceholder="Search members..."
            actions={(item) => [
              { label: 'View Profile', onClick: () => handleView(item) },
              { label: 'View Contributions', onClick: () => {} },
              { label: 'Send Message', onClick: () => {} },
              { label: 'Deactivate', onClick: () => {}, variant: 'destructive' },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
            <DialogDescription>
              View member details and information
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={selectedMember.image} alt={selectedMember.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(selectedMember.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.membershipId}</p>
                  <StatusBadge status={selectedMember.status} />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <span>{selectedMember.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{selectedMember.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{selectedMember.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>Joined {format(selectedMember.joinedAt, 'MMMM d, yyyy')}</span>
                </div>
              </div>

              {selectedMember.lastPayment && (
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-sm text-muted-foreground mb-1">Last Contribution</p>
                  <p className="font-medium">{format(selectedMember.lastPayment, 'MMMM d, yyyy')}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
