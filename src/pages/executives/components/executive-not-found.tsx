import { Link } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { Button } from '../../../components/ui/button'

export function ExecutiveNotFound() {
  return (
    <DashboardLayout
      title="Executive Not Found"
      breadcrumbs={[
        { label: 'Executives', href: '/executives' },
        { label: 'Not Found' },
      ]}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
          <Users className="size-10 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Executive Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The executive you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link to="/executives">
            <ArrowLeft className="mr-2 size-4" />
            Back to Executives
          </Link>
        </Button>
      </div>
    </DashboardLayout>
  )
}