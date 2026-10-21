import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Textarea } from '../../../components/ui/textarea'
import { Input } from '../../../components/ui/input'
import { toast } from '../../../hooks/use-toast'
import { financeApi } from '../../../api/financeApi'
import { ReceiptUpload } from './receipt-upload'
import { todayIso } from '../utils/finance-format'
import { getFinanceError, issuesToFieldErrors } from '../utils/finance-errors'
import type { FinanceCategory, FinanceRecord, FinanceRecordPayload } from '../types/finance'

const amountPattern = /^\d+(\.\d{1,2})?$/

function validate(values: { amount: string; purpose: string; counterparty: string; transactionDate: string }) {
  const errors: Record<string, string> = {}
  if (!amountPattern.test(values.amount) || Number(values.amount) <= 0) errors.amount = 'Enter an amount greater than 0 with at most 2 decimals.'
  if (!values.purpose.trim()) errors.purpose = 'Purpose is required.'
  if (!values.counterparty.trim()) errors.counterparty = 'This field is required.'
  if (!values.transactionDate) errors.transaction_date = 'Transaction date is required.'
  else if (values.transactionDate > todayIso()) errors.transaction_date = 'Transaction date cannot be in the future.'
  return errors
}

interface FinanceRecordFormProps {
  record?: FinanceRecord
  defaultCategory?: FinanceCategory
}

export function FinanceRecordForm({ record, defaultCategory = 'expense' }: FinanceRecordFormProps) {
  const navigate = useNavigate()
  const [category, setCategory] = useState<FinanceCategory>(record?.category ?? defaultCategory)
  const [amount, setAmount] = useState(record?.amount ?? '')
  const [purpose, setPurpose] = useState(record?.purpose ?? '')
  const [counterparty, setCounterparty] = useState(record?.counterparty ?? '')
  const [transactionDate, setTransactionDate] = useState(record?.transaction_date ?? todayIso())
  const [file, setFile] = useState<File | null>(null)
  const [removeDocument, setRemoveDocument] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [pending, setPending] = useState(false)
  const saved = useRef(false)

  const dirty = record
    ? category !== record.category ||
      amount !== record.amount ||
      purpose !== record.purpose ||
      counterparty !== record.counterparty ||
      transactionDate !== record.transaction_date ||
      Boolean(file) ||
      removeDocument
    : Boolean(amount || purpose || counterparty || file) || category !== defaultCategory

  // Warn before the tab is closed or reloaded with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (saved.current) return
      event.preventDefault()
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  function cancel() {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    navigate(record ? `/finance/records/${record.id}` : '/finance/records')
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors = validate({ amount, purpose, counterparty, transactionDate })
    setFieldErrors(errors)
    setError('')
    if (Object.keys(errors).length > 0) return

    setPending(true)
    try {
      if (record) {
        // Send only changed fields. A new file replaces the receipt; remove_document drops it, never both.
        const changes: Partial<FinanceRecordPayload> & { remove_document?: boolean } = {}
        if (category !== record.category) changes.category = category
        if (amount !== record.amount) changes.amount = amount
        if (purpose !== record.purpose) changes.purpose = purpose.trim()
        if (counterparty !== record.counterparty) changes.counterparty = counterparty.trim()
        if (transactionDate !== record.transaction_date) changes.transaction_date = transactionDate
        if (file) changes.document = file
        else if (removeDocument) changes.remove_document = true
        await financeApi.update(record.id, changes)
      } else {
        await financeApi.create({
          category,
          amount,
          purpose: purpose.trim(),
          counterparty: counterparty.trim(),
          transaction_date: transactionDate,
          ...(file ? { document: file } : {}),
        })
      }
      saved.current = true
      toast({ title: record ? 'Record updated' : 'Record added' })
      navigate(record ? `/finance/records/${record.id}` : '/finance/records')
    } catch (nextError) {
      const details = getFinanceError(nextError)
      const issues = issuesToFieldErrors(details.issues)
      // 413 / 415 belong to the receipt field.
      if (details.status === 413 || details.status === 415) issues.document = details.message
      setFieldErrors(issues)
      setError(Object.keys(issues).length > 0 ? 'Please fix the highlighted fields.' : details.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6" noValidate>
      <Card>
        <CardHeader>
          <CardTitle>{record ? 'Edit financial record' : 'Add financial record'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Type</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['income', 'expense'] as FinanceCategory[]).map((value) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium capitalize focus-within:ring-2 focus-within:ring-ring ${category === value ? 'border-primary bg-primary/10 text-primary' : ''}`}
                >
                  <input type="radio" name="category" value={value} checked={category === value} onChange={() => setCategory(value)} className="sr-only" />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          <Field id="amount" label="Amount" error={fieldErrors.amount}>
            <Input id="amount" required type="number" inputMode="decimal" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} aria-invalid={Boolean(fieldErrors.amount)} />
          </Field>
          <Field id="purpose" label="Purpose" error={fieldErrors.purpose}>
            <Textarea id="purpose" required maxLength={500} value={purpose} onChange={(e) => setPurpose(e.target.value)} aria-invalid={Boolean(fieldErrors.purpose)} />
          </Field>
          <Field id="counterparty" label={category === 'income' ? 'Received From' : 'Paid To'} error={fieldErrors.counterparty}>
            <Input id="counterparty" required maxLength={255} value={counterparty} onChange={(e) => setCounterparty(e.target.value)} aria-invalid={Boolean(fieldErrors.counterparty)} />
          </Field>
          <Field id="transaction_date" label="Transaction date" error={fieldErrors.transaction_date}>
            <Input id="transaction_date" required type="date" max={todayIso()} value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} aria-invalid={Boolean(fieldErrors.transaction_date)} />
          </Field>

          <ReceiptUpload
            file={file}
            error={fieldErrors.document}
            onChange={(next) => {
              setFile(next)
              if (next) setRemoveDocument(false)
            }}
          />
          {record?.has_document && !file && (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={removeDocument} onChange={(e) => setRemoveDocument(e.target.checked)} />
              Remove existing receipt
            </label>
          )}
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {error}
          </p>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={cancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending || (Boolean(record) && !dirty)}>
          {pending ? 'Saving...' : record ? 'Save changes' : 'Save record'}
        </Button>
      </div>
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <p className="text-xs text-destructive" aria-live="polite">
        {error}
      </p>
    </div>
  )
}
