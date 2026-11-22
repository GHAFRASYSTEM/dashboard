import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Copy, Loader2, Maximize2, RefreshCw } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { attendanceApi, apiErrorMessage, type Meeting } from '../../../api/attendanceApi'

export function CodeDialog({ meeting, onOpenChange }: { meeting: Meeting | null; onOpenChange: (o: boolean) => void }) {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!meeting) return
    setCode(meeting.check_in_code ?? null)
    if (meeting.check_in_code) return
    setLoading(true)
    attendanceApi.getCode(meeting.id)
      .then(r => setCode(r.check_in_code))
      .catch(err => toast.error(apiErrorMessage(err, 'Could not load the code')))
      .finally(() => setLoading(false))
  }, [meeting])

  const regenerate = async () => {
    if (!meeting || !confirm('Issue a new code? The old one stops working immediately.')) return
    setLoading(true)
    try {
      setCode((await attendanceApi.regenerateCode(meeting.id)).check_in_code)
      toast.success('New code issued')
    } catch (err) {
      toast.error(apiErrorMessage(err))
    } finally { setLoading(false) }
  }

  const present = () => {
    const el = document.getElementById('checkin-code-box')
    el?.requestFullscreen?.().catch(() => {})
  }

  return (
    <Dialog open={!!meeting} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check-in code</DialogTitle>
          <DialogDescription>Announce or project this code in the room. It is never sent to members' phones.</DialogDescription>
        </DialogHeader>

        <div id="checkin-code-box" className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl bg-primary/5 p-6">
          <p className="text-sm text-muted-foreground">{meeting?.title}</p>
          {loading
            ? <Loader2 className="size-8 animate-spin text-primary" />
            : <p className="font-mono text-6xl font-bold tracking-[0.25em] text-primary">{code ?? '——'}</p>}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" onClick={() => { if (code) { navigator.clipboard.writeText(code); toast.success('Copied') } }}>
            <Copy className="mr-2 size-4" /> Copy
          </Button>
          <Button variant="outline" onClick={present}><Maximize2 className="mr-2 size-4" /> Full screen</Button>
          <Button variant="outline" onClick={regenerate} disabled={loading}><RefreshCw className="mr-2 size-4" /> New code</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
