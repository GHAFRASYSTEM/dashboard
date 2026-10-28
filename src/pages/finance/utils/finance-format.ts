import { format, parseISO } from 'date-fns'

const currencyCache = new Map<string, Intl.NumberFormat>()
let cachedCurrency: string | null = null

// The organization currency comes from /summary; remember it for the records pages.
export function setFinanceCurrency(currency: string) {
  cachedCurrency = currency
}

export function getFinanceCurrency() {
  return cachedCurrency
}

export function formatFinanceAmount(amount: string | number, currency = cachedCurrency ?? 'EUR') {
  let formatter = currencyCache.get(currency)
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency })
    currencyCache.set(currency, formatter)
  }
  return formatter.format(Number(amount) || 0)
}

export function signedAmount(category: 'income' | 'expense', amount: string, currency?: string) {
  return `${category === 'income' ? '+' : '-'}${formatFinanceAmount(amount, currency)}`
}

export function formatFinanceDate(value: string) {
  try {
    return format(parseISO(value), 'MMM d, yyyy')
  } catch {
    return value
  }
}

export function formatFinanceMonth(value: string) {
  try {
    return format(parseISO(`${value}-01`), 'MMM yyyy')
  } catch {
    return value
  }
}

export function todayIso() {
  return format(new Date(), 'yyyy-MM-dd')
}

export function currentFinanceMonth() {
  return format(new Date(), 'yyyy-MM')
}

export function formatFileSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
