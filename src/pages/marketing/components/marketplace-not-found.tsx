import { ArrowLeft, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'

export function MarketplaceNotFound() {
  return (
    <DashboardLayout
      title="Not Found"
      breadcrumbs={[
        { label: 'Marketplace', href: '/marketing' },
        { label: 'Not Found' },
      ]}
    >
      <Card className="border-border">
        <CardContent className="py-16 text-center">
          <Package className="mx-auto mb-4 size-16 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold">Listing Not Found</h3>
          <p className="mb-4 text-muted-foreground">
            This listing may have been removed or is no longer available.
          </p>
          <Button asChild>
            <Link to="/marketing">
              <ArrowLeft className="mr-2 size-4" />
              Back to Marketplace
            </Link>
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}