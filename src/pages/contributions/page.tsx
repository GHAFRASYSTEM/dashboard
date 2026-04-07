'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { mockContributions, monthlyData } from './data/mock-contributions'
import { ContributionsChart } from './components/contributions-chart'
import { ContributionsQuickStats } from './components/contributions-quick-stats'
import { ContributionsRecords } from './components/contributions-records'
import { ContributionsStats } from './components/contributions-stats'
import { getContributionStats } from './utils/contribution-helpers'

export default function ContributionsPage() {
  const [contributions] = useState(mockContributions)
  const [selectedMonth, setSelectedMonth] = useState('March 2024')

  const {
    paidCount,
    pendingCount,
    overdueCount,
    totalCollected,
    outstanding,
    collectionRate,
  } = getContributionStats(contributions)

  return (
    <DashboardLayout
      title="Contributions"
      breadcrumbs={[{ label: 'Contributions' }]}
    >
      <ContributionsStats
        totalCollected={totalCollected}
        paidCount={paidCount}
        pendingCount={pendingCount}
        overdueCount={overdueCount}
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <ContributionsChart data={monthlyData} />
        <ContributionsQuickStats
          collectionRate={collectionRate}
          outstanding={outstanding}
        />
      </div>

      <ContributionsRecords
        contributions={contributions}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </DashboardLayout>
  )
}