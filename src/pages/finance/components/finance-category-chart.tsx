import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { formatFinanceAmount } from '../utils/finance-format'

interface FinanceCategoryChartProps {
  income: string
  expense: string
  currency: string
  periodLabel: string
}

export function FinanceCategoryChart({ income, expense, currency, periodLabel }: FinanceCategoryChartProps) {
  const rows = [
    { name: 'Income', value: Number(income) || 0, color: 'var(--success)', swatch: 'bg-success' },
    { name: 'Expense', value: Number(expense) || 0, color: 'var(--destructive)', swatch: 'bg-destructive' },
  ]
  const total = rows.reduce((sum, row) => sum + row.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">Income vs expense · {periodLabel}</p>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No income or expenses recorded for this period.</p>
        ) : (
          <div className="h-56" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rows} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
                  {rows.map((row) => (
                    <Cell key={row.name} fill={row.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatFinanceAmount(Number(value), currency)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* Text alternative to the chart: amounts and percentages. */}
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Income and expense totals for {periodLabel}</caption>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row" className="py-1 text-left font-normal">
                  <span className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${row.swatch}`} aria-hidden="true" />
                    {row.name}
                  </span>
                </th>
                <td className="py-1 text-right font-medium">{formatFinanceAmount(row.value, currency)}</td>
                <td className="w-16 py-1 text-right text-muted-foreground">{total > 0 ? `${((row.value / total) * 100).toFixed(1)}%` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
