import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { formatFinanceAmount, formatFinanceMonth } from '../utils/finance-format'
import type { MonthlyTrend } from '../types/finance'

interface FinanceTrendChartProps {
  trend: MonthlyTrend[]
  currency: string
  months: number
  onMonthsChange: (months: number) => void
}

export function FinanceTrendChart({ trend, currency, months, onMonthsChange }: FinanceTrendChartProps) {
  const data = trend.map((row) => ({
    month: formatFinanceMonth(row.month),
    Income: Number(row.income) || 0,
    Expenses: Number(row.expenses) || 0,
  }))

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Monthly trend</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Independent of the selected period</p>
        </div>
        <select aria-label="Months shown" value={months} onChange={(e) => onMonthsChange(Number(e.target.value))} className="h-9 rounded-md border bg-background px-3 text-sm">
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
          <option value={24}>Last 24 months</option>
        </select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No monthly data yet.</p>
        ) : (
          <>
            <div className="h-64" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip formatter={(value) => formatFinanceAmount(Number(value), currency)} />
                  <Legend />
                  <Bar dataKey="Income" fill="var(--success)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Expenses" fill="var(--destructive)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Text alternative for assistive tech. */}
            <table className="sr-only">
              <caption>Monthly income and expenses</caption>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Income</th>
                  <th>Expenses</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{formatFinanceAmount(row.Income, currency)}</td>
                    <td>{formatFinanceAmount(row.Expenses, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </CardContent>
    </Card>
  )
}
