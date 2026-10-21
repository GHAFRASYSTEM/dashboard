import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import type { FinanceCategory } from '../types/finance'

export function RecordTypeBadge({ category }: { category: FinanceCategory }) {
  const income = category === 'income'
  const Icon = income ? ArrowUpRight : ArrowDownLeft
  return <Badge variant="secondary" className={income ? 'gap-1 bg-success/10 text-success' : 'gap-1 bg-destructive/10 text-destructive'}><Icon className="size-3" />{income ? 'Income' : 'Expense'}</Badge>
}