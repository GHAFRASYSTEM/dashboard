import { useState } from 'react'
import { FileText, Paperclip, X } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { formatFileSize } from '../utils/finance-format'

const accepted = ['application/pdf', 'image/jpeg', 'image/png']
const maxBytes = 5 * 1024 * 1024

interface ReceiptUploadProps {
  file: File | null
  onChange: (file: File | null) => void
  // Server-side error (422 / 413 / 415) for the document field.
  error?: string
}

export function ReceiptUpload({ file, onChange, error }: ReceiptUploadProps) {
  const [localError, setLocalError] = useState('')

  function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0]
    event.target.value = ''
    if (!next) return
    if (!accepted.includes(next.type)) {
      setLocalError('Receipt must be a PDF, JPG or PNG file.')
      return
    }
    if (next.size > maxBytes) {
      setLocalError('Receipt must be 5 MB or smaller.')
      return
    }
    setLocalError('')
    onChange(next)
  }

  const message = localError || error

  return (
    <div className="space-y-2">
      <label htmlFor="document" className="text-sm font-medium">
        Receipt <span className="font-normal text-muted-foreground">(optional, PDF/JPG/PNG up to 5 MB)</span>
      </label>
      {file ? (
        <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{file.name}</span>
            <span className="shrink-0 text-muted-foreground">{formatFileSize(file.size)}</span>
          </span>
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => { setLocalError(''); onChange(null) }} aria-label="Remove receipt">
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-3 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-ring hover:bg-secondary/40">
          <Paperclip className="size-4" />
          Attach receipt
          <input id="document" name="document" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={selectFile} />
        </label>
      )}
      <p className="text-xs text-destructive" aria-live="polite">
        {message}
      </p>
    </div>
  )
}
