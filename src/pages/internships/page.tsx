'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { InternshipFormDialog } from './components/internship-form-dialog'
import { InternshipPreviewDialog } from './components/internship-preview-dialog'
import { InternshipsEmptyState } from './components/internships-empty-state'
import { InternshipsFilters } from './components/internships-filters'
import { InternshipsStats } from './components/internships-stats'
import { InternshipsTable } from './components/internships-table'
import { mockInternships } from './data/mock-internships'
import type { Internship } from './types/internship'
import { filterInternships, getInternshipStats } from './utils/internship-helpers'

export default function InternshipsPage() {
  const [internships, setInternships] = useState(mockInternships)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null)
  const [viewingInternship, setViewingInternship] = useState<Internship | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [contractFilter, setContractFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const stats = getInternshipStats(internships)
  const filteredInternships = filterInternships(
    internships,
    searchQuery,
    statusFilter,
    contractFilter,
    typeFilter
  )

  const handleAdd = () => {
    setEditingInternship(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Internship) => {
    setEditingInternship(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setInternships((prev) => prev.filter((internship) => internship.id !== id))
    setViewingInternship(null)
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newInternship: Internship = {
      id: editingInternship?.id || Date.now().toString(),
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as Internship['type'],
      contractType: formData.get('contractType') as Internship['contractType'],
      duration: formData.get('duration') as string,
      stipend: (formData.get('stipend') as string) || undefined,
      description: formData.get('description') as string,
      requirements: (formData.get('requirements') as string)
        .split('\n')
        .filter((item) => item.trim()),
      responsibilities: (formData.get('responsibilities') as string)
        .split('\n')
        .filter((item) => item.trim()),
      benefits: (formData.get('benefits') as string)
        .split('\n')
        .filter((item) => item.trim()),
      skills: (formData.get('skills') as string)
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item),
      status: formData.get('status') as Internship['status'],
      applications: editingInternship?.applications || 0,
      postedAt: editingInternship?.postedAt || new Date(),
      deadline: new Date(formData.get('deadline') as string),
      contactEmail: (formData.get('contactEmail') as string) || undefined,
      contactPhone: (formData.get('contactPhone') as string) || undefined,
      website: (formData.get('website') as string) || undefined,
      department: (formData.get('department') as string) || undefined,
    }

    if (editingInternship) {
      setInternships((prev) =>
        prev.map((internship) =>
          internship.id === editingInternship.id ? newInternship : internship
        )
      )
    } else {
      setInternships((prev) => [newInternship, ...prev])
    }

    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout
      title="Internships Management"
      breadcrumbs={[{ label: 'Internships' }]}
    >
      <InternshipsStats
        total={stats.total}
        active={stats.active}
        pending={stats.pending}
        totalApplications={stats.totalApplications}
      />

      <InternshipsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        contractFilter={contractFilter}
        onContractChange={setContractFilter}
        onAdd={handleAdd}
      />

      {filteredInternships.length > 0 ? (
        <InternshipsTable
          internships={filteredInternships}
          onView={setViewingInternship}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <InternshipsEmptyState onAdd={handleAdd} />
      )}

      <InternshipPreviewDialog
        internship={viewingInternship}
        onOpenChange={(open) => {
          if (!open) setViewingInternship(null)
        }}
        onEdit={handleEdit}
      />

      <InternshipFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingInternship={editingInternship}
        onSubmit={handleSave}
      />
    </DashboardLayout>
  )
}