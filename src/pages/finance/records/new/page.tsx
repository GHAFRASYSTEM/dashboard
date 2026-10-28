import { useSearchParams } from 'react-router-dom'
import { DashboardLayout } from '../../../../components/dashboard-layout'
import { FinanceRecordForm } from '../../components/finance-record-form'

export default function NewFinanceRecordPage() {
  const [params] = useSearchParams()
  const category = params.get('category') === 'income' ? 'income' : 'expense'
  return (
    <DashboardLayout
      title="Add financial record"
      breadcrumbs={[
        { label: 'Finance', href: '/finance' },
        { label: 'Records', href: '/finance/records' },
        { label: 'New record' },
      ]}
    >
      <FinanceRecordForm defaultCategory={category} />
    </DashboardLayout>
  )
}
