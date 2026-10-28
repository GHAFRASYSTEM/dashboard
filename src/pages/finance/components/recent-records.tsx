import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { RecordTypeBadge } from './record-type-badge'
import { formatFinanceDate, signedAmount } from '../utils/finance-format'
import type { FinanceRecord } from '../types/finance'

export function RecentRecords({ records, currency }: { records: FinanceRecord[]; currency: string }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent records</CardTitle>
        <Button asChild variant="link">
          <Link to="/finance/records">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-sm text-muted-foreground">No records yet.</p>
        ) : (
          <ul className="divide-y">
            {records.map((record) => (
              <li key={record.id}>
                <Link to={`/finance/records/${record.id}`} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <RecordTypeBadge category={record.category} />
                      <span className="truncate text-sm font-medium">{record.purpose}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {formatFinanceDate(record.transaction_date)} · {record.counterparty}
                    </p>
                  </div>
                  <span className={`shrink-0 text-sm font-semibold ${record.category === 'income' ? 'text-success' : 'text-destructive'}`}>
                    {signedAmount(record.category, record.amount, currency)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
