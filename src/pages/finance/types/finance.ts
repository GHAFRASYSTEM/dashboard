export type FinanceCategory = 'income' | 'expense'

export interface FinanceUser {
  id: string
  name: string
}

export interface FinanceDocument {
  url: string
  name?: string
  file_name?: string
  size?: number
  url_expires_at?: string
  mime_type?: string
}

export interface FinanceRecord {
  id: string
  category: FinanceCategory
  amount: string
  purpose: string
  counterparty: string
  transaction_date: string
  created_at: string
  has_document: boolean
  created_by?: FinanceUser | null
  document?: FinanceDocument | null
}

export interface PeriodTotals {
  income: string
  expenses: string
  net: string
}

export interface FinanceMeta {
  page: number
  limit: number
  total: number
  pages: number
}

export interface FinanceListResponse {
  data: FinanceRecord[]
  meta: FinanceMeta
  period_totals: PeriodTotals
}

export interface FinanceFilters {
  category?: FinanceCategory
  month?: string
  date_from?: string
  date_to?: string
  search?: string
  min_amount?: string
  max_amount?: string
  has_document?: boolean
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface SelectedPeriod extends PeriodTotals {
  income_count: number
  expense_count: number
  month?: string
}

export interface MonthlyTrend {
  month: string
  income: string
  expenses: string
  net: string
}

export interface FinanceSummary {
  currency: string
  total_income: string
  total_expenses: string
  net_balance: string
  selected_period: SelectedPeriod | null
  breakdown_by_category: {
    income: string
    expense: string
  }
  monthly_trend: MonthlyTrend[]
  recent_records: FinanceRecord[]
}

export interface FinanceIssue {
  field: string
  message: string
}

export interface FinanceRecordPayload {
  category: FinanceCategory
  amount: string
  purpose: string
  counterparty: string
  transaction_date: string
  document?: File
}