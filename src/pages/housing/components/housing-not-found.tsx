import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { Button } from '../../../components/ui/button'

export function HousingNotFound() {
  return (
    <DashboardLayout
      title="Property Not Found"
      breadcrumbs={[
        { label: 'Housing', href: '/housing' },
        { label: 'Not Found' },
      ]}
    >
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="mb-2 text-2xl font-bold">Property Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The property you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link to="/housing">
            <ArrowLeft className="mr-2 size-4" />
            Back to Listings
          </Link>
        </Button>
      </div>
    </DashboardLayout>
  )
}