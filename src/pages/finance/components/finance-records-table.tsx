import { Link } from 'react-router-dom'
import { Eye, Paperclip } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { RecordTypeBadge } from './record-type-badge'
import { formatFinanceDate, signedAmount } from '../utils/finance-format'
import type { FinanceRecord } from '../types/finance'

export function FinanceRecordsTable({ records, currency, onClear }: { records: FinanceRecord[]; currency: string; onClear: () => void }) {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="font-semibold">No financial records found</p>
          <p className="text-sm text-muted-foreground">No records match these filters.</p>
          <Button variant="outline" onClick={onClear}>
            Clear filters
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {/* Horizontal scroll keeps the table usable on small screens. */}
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Paid To / Received From</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="whitespace-nowrap">{formatFinanceDate(record.transaction_date)}</TableCell>
                <TableCell>
                  <RecordTypeBadge category={record.category} />
                </TableCell>
                <TableCell className="max-w-[220px] truncate" title={record.purpose}>
                  {record.purpose}
                </TableCell>
                <TableCell className="max-w-[180px] truncate" title={record.counterparty}>
                  {record.counterparty}
                </TableCell>
                <TableCell className={`whitespace-nowrap text-right font-medium ${record.category === 'income' ? 'text-success' : 'text-destructive'}`}>
                  {signedAmount(record.category, record.amount, currency)}
                </TableCell>
                <TableCell>
                  {record.has_document && (
                    <>
                      <Paperclip className="size-4 text-muted-foreground" aria-hidden="true" />
                      <span className="sr-only">Receipt attached</span>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="icon-sm" aria-label={`View record: ${record.purpose}`}>
                    <Link to={`/finance/records/${record.id}`}>
                      <Eye className="size-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
