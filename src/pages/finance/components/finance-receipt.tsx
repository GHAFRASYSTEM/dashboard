import { useEffect, useRef, useState } from 'react'
import { ExternalLink, FileText, RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { formatFileSize } from '../utils/finance-format'
import type { FinanceDocument } from '../types/finance'

function isImage(document: FinanceDocument) {
  const name = document.file_name ?? document.name ?? ''
  return document.mime_type?.startsWith('image/') ?? /\.(jpe?g|png)$/i.test(name)
}

// The document URL is signed and expires (~1 hour). On expiry or load failure, refetch the record
// for a fresh URL and retry once; after that show an error with a retry button.
export function FinanceReceipt({ document, onRefresh }: { document?: FinanceDocument | null; onRefresh: () => Promise<void> }) {
  // Track which URL failed so a freshly fetched URL clears the error without an effect.
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const retried = useRef(false)
  const failed = Boolean(document?.url) && failedUrl === document?.url

  useEffect(() => {
    // Refresh proactively when the signed URL has already expired.
    if (!document?.url_expires_at || retried.current) return
    if (new Date(document.url_expires_at).getTime() <= Date.now()) {
      retried.current = true
      void onRefresh()
    }
  }, [document?.url_expires_at, onRefresh])

  if (!document?.url) return <p className="text-sm text-muted-foreground">No document attached.</p>

  async function handleError() {
    if (!retried.current) {
      retried.current = true
      await onRefresh()
      return
    }
    setFailedUrl(document?.url ?? null)
  }

  async function retry() {
    setFailedUrl(null)
    await onRefresh()
  }

  const name = document.file_name ?? document.name ?? 'Receipt'
  const size = formatFileSize(document.size)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
        <span className="flex min-w-0 items-center gap-2">
          <FileText className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{name}</span>
          {size && <span className="shrink-0 text-muted-foreground">{size}</span>}
        </span>
        <Button asChild variant="outline" size="sm">
          <a href={document.url} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" />
            Open
          </a>
        </Button>
      </div>
      {isImage(document) && !failed && <img src={document.url} alt={`Receipt: ${name}`} onError={() => void handleError()} className="max-h-96 rounded-md border object-contain" />}
      {failed && (
        <div className="flex items-center gap-3 text-sm text-destructive" role="alert">
          <span>The receipt could not be loaded.</span>
          <Button variant="outline" size="sm" onClick={() => void retry()}>
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
