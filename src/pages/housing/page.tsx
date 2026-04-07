'use client'

import { DashboardLayout } from '../../components/dashboard-layout'
import { HousingCard } from './components/housing-card'
import { mockHousing } from './data/mock-housing'

export default function HousingPage() {
  return (
    <DashboardLayout
      title="Housing Listings"
      breadcrumbs={[{ label: 'Housing' }]}
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockHousing.map((housing) => (
          <HousingCard key={housing.id} housing={housing} />
        ))}
      </div>
    </DashboardLayout>
  )
}