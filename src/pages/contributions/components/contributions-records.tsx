import { format } from 'date-fns'
import { Calendar, Download } from 'lucide-react'
import { DataTable } from '../../../components/data-table'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs'
import type { Contribution } from '../types/contribution'
import { statusMap } from '../utils/contribution-config'
import { ContributionMemberCell } from './contribution-member-cell'

interface Props {
  contributions: Contribution[]
  selectedMonth: string
  onMonthChange: (value: string) => void
}

export function ContributionsRecords({
  contributions,
  selectedMonth,
  onMonthChange,
}: Props) {
  const paidCount = contributions.filter((c) => c.status === 'paid').length
  const pendingCount = contributions.filter((c) => c.status === 'pending').length
  const overdueCount = contributions.filter((c) => c.status === 'overdue').length

  const columns = [
    {
      key: 'memberName',
      header: 'Member',
      render: (item: Contribution) => <ContributionMemberCell item={item} />,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (item: Contribution) => <span className="font-medium">${item.amount}</span>,
    },
    {
      key: 'month',
      header: 'Period',
      render: (item: Contribution) => `${item.month} ${item.year}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Contribution) => (
        <Badge variant="secondary" className={statusMap[item.status].className}>
          {statusMap[item.status].label}
        </Badge>
      ),
    },
    {
      key: 'paidAt',
      header: 'Paid On',
      render: (item: Contribution) => (
        <span className="text-sm text-muted-foreground">
          {item.paidAt ? format(item.paidAt, 'MMM d, yyyy') : '-'}
        </span>
      ),
    },
    {
      key: 'reference',
      header: 'Reference',
      render: (item: Contribution) => (
        <span className="font-mono text-sm text-muted-foreground">
          {item.reference || '-'}
        </span>
      ),
    },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contribution Records</CardTitle>

        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-[150px] border-border bg-secondary">
              <Calendar className="mr-2 size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="March 2024">March 2024</SelectItem>
              <SelectItem value="February 2024">February 2024</SelectItem>
              <SelectItem value="January 2024">January 2024</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="border-border">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4 bg-secondary">
            <TabsTrigger value="all">All ({contributions.length})</TabsTrigger>
            <TabsTrigger value="paid">Paid ({paidCount})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({overdueCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable
              data={contributions}
              columns={columns}
              searchKey="memberName"
              searchPlaceholder="Search by member name..."
              actions={() => [
                { label: 'View Details', onClick: () => {} },
                { label: 'Send Reminder', onClick: () => {} },
                { label: 'Mark as Paid', onClick: () => {} },
              ]}
            />
          </TabsContent>

          <TabsContent value="paid">
            <DataTable
              data={contributions.filter((c) => c.status === 'paid')}
              columns={columns}
              searchKey="memberName"
              searchPlaceholder="Search by member name..."
            />
          </TabsContent>

          <TabsContent value="pending">
            <DataTable
              data={contributions.filter((c) => c.status === 'pending')}
              columns={columns}
              searchKey="memberName"
              searchPlaceholder="Search by member name..."
              actions={() => [
                { label: 'Send Reminder', onClick: () => {} },
                { label: 'Mark as Paid', onClick: () => {} },
              ]}
            />
          </TabsContent>

          <TabsContent value="overdue">
            <DataTable
              data={contributions.filter((c) => c.status === 'overdue')}
              columns={columns}
              searchKey="memberName"
              searchPlaceholder="Search by member name..."
              actions={() => [
                { label: 'Send Reminder', onClick: () => {} },
                { label: 'Mark as Paid', onClick: () => {} },
              ]}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}