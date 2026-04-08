'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Button } from '../../components/ui/button'
import { Users, Plus } from 'lucide-react'
import { mockMembers } from './data/mock-members'
import type { Member } from './types/members'
import { MemberStats } from './components/member-stats'
import { MembersToolbar } from './components/members-toolbar'
import { MembersGrid } from './components/members-grid'
import { MembersList } from './components/members-list'
import { MemberFormDialog } from './components/member-form-dialog'
import { DeleteMemberDialog } from './components/delete-member-dialog'

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [deletingMember, setDeletingMember] = useState<Member | null>(null)
  const [memberImage, setMemberImage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    department: '',
    bio: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
  })

  const activeCount = members.filter((m) => m.status === 'active').length
  const inactiveCount = members.filter((m) => m.status === 'inactive').length
  const executiveCount = members.filter((m) => m.position).length

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase()
    const matchSearch =
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.membershipId.toLowerCase().includes(q)

    const matchStatus = statusFilter === 'all' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setMemberImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      position: '',
      department: '',
      bio: '',
      status: 'active',
    })
    setMemberImage('')
    setIsAddDialogOpen(true)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      location: member.location,
      position: member.position || '',
      department: member.department || '',
      bio: member.bio || '',
      status: member.status,
    })
    setMemberImage(member.image || '')
    setIsAddDialogOpen(true)
  }

  const handleSaveMember = () => {
    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id ? { ...m, ...formData, image: memberImage || m.image } : m
        )
      )
    } else {
      setMembers((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          membershipId: `GAF-${String(prev.length + 1).padStart(3, '0')}`,
          ...formData,
          joinedAt: new Date(),
          image: memberImage,
        },
      ])
    }

    setIsAddDialogOpen(false)
  }

  const handleDeleteMember = () => {
    if (!deletingMember) return
    setMembers((prev) => prev.filter((m) => m.id !== deletingMember.id))
    setDeletingMember(null)
  }

  return (
    <DashboardLayout title="Members Management" breadcrumbs={[{ label: 'Members' }]}>
      <MemberStats
        total={members.length}
        active={activeCount}
        inactive={inactiveCount}
        executives={executiveCount}
      />

      <MembersToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddMember={handleAddMember}
      />

      {viewMode === 'grid' ? (
        <MembersGrid
          members={filteredMembers}
          onEdit={handleEditMember}
          onDelete={setDeletingMember}
        />
      ) : (
        <MembersList
          members={filteredMembers}
          onEdit={handleEditMember}
          onDelete={setDeletingMember}
        />
      )}

      {filteredMembers.length === 0 && (
        <div className="py-16 text-center">
          <Users className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No members found</h3>
          <p className="mb-4 text-muted-foreground">Try adjusting your search or filters</p>
          <Button onClick={handleAddMember}>
            <Plus className="mr-2 size-4" />
            Add First Member
          </Button>
        </div>
      )}

      <MemberFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        editingMember={!!editingMember}
        formData={formData}
        setFormData={setFormData}
        memberImage={memberImage}
        setMemberImage={setMemberImage}
        onImageUpload={handleImageUpload}
        onSave={handleSaveMember}
      />

      <DeleteMemberDialog
        member={deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDeleteMember}
      />
    </DashboardLayout>
  )
}