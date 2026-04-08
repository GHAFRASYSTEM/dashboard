'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard-layout'
import type { Trend } from './types/trends'
import { mockTrends } from './data/mock-trends'
import { TrendDialog } from './components/trend-dialog'
import { TrendCard } from './components/trend-card'
import { TrendsToolbar } from './components/trends-toolbar'
import { TrendsEmptyState } from './components/trends-empty-state'

export default function TrendsPage() {
  const navigate = useNavigate()

  const [trends, setTrends] = useState<Trend[]>(mockTrends)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)

  const filtered = trends.filter((trend) => {
    const matchSearch =
      trend.title.toLowerCase().includes(search.toLowerCase()) ||
      trend.summary.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || trend.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleAdd = () => {
    setEditingTrend(null)
    setDialogOpen(true)
  }

  const handleEdit = (trend: Trend) => {
    setEditingTrend(trend)
    setDialogOpen(true)
  }

  const handleSave = (saved: Trend) => {
    setTrends((prev) =>
      editingTrend
        ? prev.map((trend) => (trend.id === saved.id ? saved : trend))
        : [saved, ...prev]
    )
  }

  const handleDelete = (id: string) => {
    setTrends((prev) => prev.filter((trend) => trend.id !== id))
  }

  const counts = {
    all: trends.length,
    published: trends.filter((trend) => trend.status === 'published').length,
    draft: trends.filter((trend) => trend.status === 'draft').length,
    pending: trends.filter((trend) => trend.status === 'pending').length,
  }

  return (
    <DashboardLayout title="Trends" breadcrumbs={[{ label: 'Trends' }]}>
      <div className="space-y-5">
        <TrendsToolbar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          counts={counts}
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                onView={() => navigate(`/trends/${trend.id}`, { state: { trend } })}
                onEdit={() => handleEdit(trend)}
                onDelete={() => handleDelete(trend.id)}
              />
            ))}
          </div>
        ) : (
          <TrendsEmptyState hasSearch={!!search} onAdd={handleAdd} />
        )}
      </div>

      <TrendDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingTrend}
        onSave={handleSave}
      />
    </DashboardLayout>
  )
}