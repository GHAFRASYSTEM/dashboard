import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  data: { month: string; amount: number; members: number }[]
}

export function ContributionsChart({ data }: Props) {
  return (
    <Card className="border-border bg-card lg:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Collection Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.28 0.01 260)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0.01 260)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0.01 260)', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.16 0.01 260)',
                  border: '1px solid oklch(0.28 0.01 260)',
                  borderRadius: '8px',
                  color: 'oklch(0.98 0 0)',
                }}
                formatter={(value) => {
                  const amount = typeof value === 'number' ? value : Number(value ?? 0)
                  return [`$${amount.toLocaleString()}`, 'Amount']
                }}
              />
              <Bar
                dataKey="amount"
                fill="oklch(0.72 0.19 145)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}