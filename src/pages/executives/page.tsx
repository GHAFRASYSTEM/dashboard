'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { mockExecutives } from './data/mock-executives'
import { ExecutiveCard } from './components/executive-card'
import { ExecutiveFormDialog } from './components/executive-form-dialog'
import { ExecutivesEmptyState } from './components/executives-empty-state'
import { ExecutivesSearchBar } from './components/executives-search-bar'
import { ExecutivesStats } from './components/executives-stats'
import type { Executive } from './types/executive'
import { filterExecutives, getExecutiveStats } from './utils/executive-helpers'

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState(mockExecutives)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<Executive | null>(null)

  const filteredExecutives = filterExecutives(executives, search)
  const stats = getExecutiveStats(executives)

  const handleAdd = () => {
    setEditingExecutive(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (executive: Executive) => {
    setEditingExecutive(executive)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setExecutives((prev) => prev.filter((e) => e.id !== id))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newExecutive: Executive = {
      id: editingExecutive?.id || Date.now().toString(),
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      bio: formData.get('bio') as string,
      status: formData.get('status') as Executive['status'],
      image: editingExecutive?.image,
      joinedAt: editingExecutive?.joinedAt || new Date(),
      department: editingExecutive?.department,
      fullBio: editingExecutive?.fullBio || (formData.get('bio') as string),
      location: editingExecutive?.location,
      education: editingExecutive?.education,
      achievements: editingExecutive?.achievements || [],
      responsibilities: editingExecutive?.responsibilities || [],
      socialLinks: editingExecutive?.socialLinks || {},
      yearsOfService: editingExecutive?.yearsOfService || 0,
      projectsLed: editingExecutive?.projectsLed || 0,
      teamMembers: editingExecutive?.teamMembers || 0,
    }

    if (editingExecutive) {
      setExecutives((prev) =>
        prev.map((e) => (e.id === editingExecutive.id ? newExecutive : e))
      )
    } else {
      setExecutives((prev) => [newExecutive, ...prev])
    }

    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Executives Management" breadcrumbs={[{ label: 'Executives' }]}>
      <div className="space-y-6">
        <ExecutivesStats
          total={stats.total}
          active={stats.active}
          inactive={stats.inactive}
        />

        <ExecutivesSearchBar
          search={search}
          onSearchChange={setSearch}
          onAdd={handleAdd}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExecutives.map((executive) => (
            <ExecutiveCard
              key={executive.id}
              executive={executive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredExecutives.length === 0 && (
          <ExecutivesEmptyState search={search} onAdd={handleAdd} />
        )}
      </div>

      <ExecutiveFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingExecutive={editingExecutive}
        onSubmit={handleSave}
      />
    </DashboardLayout>
  )
}