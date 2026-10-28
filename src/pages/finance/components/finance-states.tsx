import { Link, Outlet } from 'react-router-dom'
import { Lock, RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Toaster } from '../../../components/ui/toaster'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { useAuth } from '../../../../context/auth-context'
import { getFinanceError } from '../utils/finance-errors'
import { isFinanceAdmin } from '../utils/finance-access'

export function FinanceForbidden() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-16 text-center" role="alert">
        <Lock className="size-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Finance access is restricted</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Only administrators can view organization financial records.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Back to dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Route wrapper: non-admins get the forbidden state instead of the finance pages.
export function FinanceAdminRoute() {
  const { user } = useAuth()
  if (!isFinanceAdmin(user)) {
    return (
      <DashboardLayout title="Finance" breadcrumbs={[{ label: 'Finance' }]}>
        <FinanceForbidden />
      </DashboardLayout>
    )
  }
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

// Maps an API error to the matching state: 403 forbidden, otherwise message + retry.
export function FinanceError({
  error,
  onRetry,
  onReset,
}: {
  error: unknown
  onRetry: () => void
  onReset?: () => void
}) {
  const details = getFinanceError(error)
  if (details.status === 403) return <FinanceForbidden />
  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-3 p-6" role="alert">
        <p className="text-sm text-destructive">{details.message}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="size-4" />
            Retry
          </Button>
          {details.status === 400 && onReset && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              Reset filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
