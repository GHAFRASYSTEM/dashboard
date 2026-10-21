import { useParams } from 'react-router-dom'
import { DashboardLayout } from '../../../../../components/dashboard-layout'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { FinanceRecordForm } from '../../../components/finance-record-form'
import { FinanceError } from '../../../components/finance-states'
import { useFinanceRecord } from '../../../../../hooks/useFinance'

export default function EditFinanceRecordPage() {
  const { id = '' } = useParams()
  const { data, loading, error, refetch } = useFinanceRecord(id)

  return (
    <DashboardLayout
      title="Edit financial record"
      breadcrumbs={[
        { label: 'Finance', href: '/finance' },
        { label: 'Records', href: '/finance/records' },
        { label: 'Edit record' },
      ]}
    >
      {loading && !data && <Skeleton className="h-96 max-w-2xl" aria-label="Loading record" />}
      {error ? <FinanceError error={error} onRetry={() => void refetch()} /> : null}
      {data && <FinanceRecordForm key={data.id} record={data} />}
    </DashboardLayout>
  )
}
