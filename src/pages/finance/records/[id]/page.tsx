import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../components/ui/dialog'
import { Skeleton } from '../../../../components/ui/skeleton'
import { DashboardLayout } from '../../../../components/dashboard-layout'
import { toast } from '../../../../hooks/use-toast'
import { financeApi } from '../../../../api/financeApi'
import { useFinanceCurrency, useFinanceRecord } from '../../../../hooks/useFinance'
import { getFinanceError } from '../../utils/finance-errors'
import { formatFinanceDate, signedAmount } from '../../utils/finance-format'
import { FinanceError } from '../../components/finance-states'
import { FinanceReceipt } from '../../components/finance-receipt'
import { RecordTypeBadge } from '../../components/record-type-badge'

export default function FinanceRecordDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const currency = useFinanceCurrency()
  const { data, loading, error, refetch } = useFinanceRecord(id)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  async function remove() {
    setDeleting(true)
    setDeleteError('')
    try {
      await financeApi.remove(id)
      toast({ title: 'Record deleted' })
      navigate('/finance/records')
    } catch (nextError) {
      setDeleteError(getFinanceError(nextError).message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <DashboardLayout
      title="Financial record"
      breadcrumbs={[
        { label: 'Finance', href: '/finance' },
        { label: 'Records', href: '/finance/records' },
        { label: 'Details' },
      ]}
    >
      {loading && !data && <Skeleton className="h-72 max-w-3xl" aria-label="Loading record" />}
      {error && !data ? <FinanceError error={error} onRetry={() => void refetch()} /> : null}
      {data && (
        <div className="max-w-3xl space-y-6">
          <Card>
            <CardHeader className="flex-row items-start justify-between gap-3">
              <div>
                <RecordTypeBadge category={data.category} />
                <CardTitle className={`mt-3 text-2xl ${data.category === 'income' ? 'text-success' : 'text-destructive'}`}>
                  {signedAmount(data.category, data.amount, currency)}
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link to={`/finance/records/${data.id}/edit`}>
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setConfirmOpen(true)}>
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Detail label="Purpose" value={data.purpose} />
              <Detail label={data.category === 'income' ? 'Received From' : 'Paid To'} value={data.counterparty} />
              <Detail label="Transaction date" value={formatFinanceDate(data.transaction_date)} />
              <Detail label="Recorded date" value={formatFinanceDate(data.created_at)} />
              <Detail label="Recorded by" value={data.created_by?.name ?? 'Unknown'} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting document</CardTitle>
            </CardHeader>
            <CardContent>
              <FinanceReceipt document={data.document} onRefresh={refetch} />
            </CardContent>
          </Card>

          <Button variant="ghost" asChild>
            <Link to="/finance/records">Back to records</Link>
          </Button>
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this record?</DialogTitle>
            <DialogDescription>This permanently removes the record and its receipt. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-destructive" role="alert">
            {deleteError}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => void remove()} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{value}</p>
    </div>
  )
}
