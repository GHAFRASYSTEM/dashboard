'use client'

import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react'

import { DashboardLayout } from '../../components/dashboard-layout'
import { Button } from '../../components/ui/button'

import type { Trend } from './types/trends'
import { TrendHero } from './components/trend-hero'
import { TrendContentCard } from './components/trend-content-card'
import { TrendLinksCard } from './components/trend-links-card'
import { TrendOverviewCard } from './components/trend-overview-card'
import { TrendStatusCard } from './components/trend-status-card'

export default function TrendDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const trend = location.state?.trend as Trend | undefined
  const [activeImg, setActiveImg] = useState(0)

  if (!trend) {
    return (
      <DashboardLayout
        title="Trend Not Found"
        breadcrumbs={[
          { label: 'Trends', href: '/trends' },
          { label: 'Not Found' },
        ]}
      >
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card text-center">
          <p className="text-base font-medium text-foreground">Trend could not be loaded</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This can happen if the page was refreshed or opened directly. Trend ID: {id}
          </p>
          <Button onClick={() => navigate('/trends')} variant="outline" className="mt-5 gap-2">
            <ArrowLeft className="size-4" />
            Back to Trends
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Trend Details"
      breadcrumbs={[
        { label: 'Trends', href: '/trends' },
        { label: trend.title },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {trend.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Full trend overview, metadata, media, and source references
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                navigate('/trends', {
                  state: { editTrend: trend },
                })
              }
            >
              <Edit2 className="size-4" />
              Edit Trend
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>

        <TrendHero trend={trend} activeImg={activeImg} setActiveImg={setActiveImg} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <TrendContentCard content={trend.content} />
            <TrendLinksCard links={trend.links} />
          </div>

          <div className="space-y-6">
            <TrendOverviewCard trend={trend} />
            <TrendStatusCard status={trend.status} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}