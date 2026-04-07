'use client'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import { ExecutiveAboutCard } from './components/executive-about-card'
import { ExecutiveAchievementsCard } from './components/executive-achievements-card'
import { ExecutiveContactCard } from './components/executive-contact-card'
import { ExecutiveContactDialog } from './components/executive-contact-dialog'
import { ExecutiveDeleteDialog } from './components/executive-delete-dialog'
import { ExecutiveDetailsCard } from './components/executive-details-card'
import { ExecutiveFormDialog } from './components/executive-form-dialog'
import { ExecutiveNotFound } from './components/executive-not-found'
import { ExecutiveProfileHero } from './components/executive-profile-hero'
import { ExecutiveResponsibilitiesCard } from './components/executive-responsibilities-card'
import { mockExecutives } from './data/mock-executives'
import type { Executive } from './types/executive'

export default function ExecutiveDetailPage() {
  const params = useParams()
  const navigate = useNavigate()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)

  const executive = mockExecutives.find((e) => e.id === params.id)

  if (!executive) {
    return <ExecutiveNotFound />
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    navigate('/executives')
  }

  return (
    <DashboardLayout
      title={executive.name}
      breadcrumbs={[
        { label: 'Executives', href: '/executives' },
        { label: executive.name },
      ]}
    >
      <div className="space-y-6">
        <ExecutiveProfileHero
          executive={executive}
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={() => setIsDeleteDialogOpen(true)}
          onContact={() => setIsContactDialogOpen(true)}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ExecutiveAboutCard fullBio={executive.fullBio} />
            <ExecutiveResponsibilitiesCard responsibilities={executive.responsibilities} />
            <ExecutiveAchievementsCard achievements={executive.achievements} />
          </div>

          <div className="space-y-6">
            <ExecutiveContactCard executive={executive} />
            <ExecutiveDetailsCard executive={executive} />
          </div>
        </div>
      </div>

      <ExecutiveContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        executive={executive}
      />

      <ExecutiveFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingExecutive={executive as Executive}
        onSubmit={(e) => {
          e.preventDefault()
          setIsEditDialogOpen(false)
        }}
      />

      <ExecutiveDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        executive={executive}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  )
}