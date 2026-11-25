import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, MapPin, Search, ShieldCheck, Trash2, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { attendanceApi, apiErrorMessage, type Meeting, type Roster } from '../../../api/attendanceApi'
import { membersApi } from '../../../api/members'
import { notificationsApi } from '../../../api/notificationsApi'
import type { Member } from '../../members/types/members'
import { todayInParis } from '../paris-time'

export function RosterDialog({ meeting, onOpenChange }: { meeting: Meeting | null; onOpenChange: (o: boolean) => void }) {
  const [roster, setRoster] = useState<Roster | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!meeting) return
    setLoading(true)
    try {
      const [r, m] = await Promise.all([
        attendanceApi.roster(meeting.id),
        membersApi.list({ limit: 100, is_complete: true }).catch(() => null),
      ])
      setRoster(r)
      if (m) setMembers(m.members)
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load the roster'))
    } finally { setLoading(false) }
  }, [meeting])

  useEffect(() => { setRoster(null); setSearch(''); load() }, [load])

  const attendedIds = useMemo(() => new Set(roster?.members.filter(m => m.status === 'Attended').map(m => m.user_id)), [roster])
  const q = search.trim().toLowerCase()
  const matches = (name?: string | null, email?: string | null) => !q || (name ?? '').toLowerCase().includes(q) || (email ?? '').toLowerCase().includes(q)

  const attended = roster?.members.filter(m => m.status === 'Attended' && matches(m.member?.name, m.member?.email)) ?? []
  const notSigned = members.filter(m => !attendedIds.has(m.id) && matches(m.name, m.email))
  const canMark = meeting && meeting.status !== 'cancelled' && meeting.meeting_date <= todayInParis()

  const mark = async (userId: string) => {
    if (!meeting) return
    setBusy(userId)
    try { await attendanceApi.markManually(meeting.id, userId); toast.success('Marked present'); await load() }
    catch (err) { toast.error(apiErrorMessage(err)) }
    finally { setBusy(null) }
  }

  const unmark = async (recordId: string) => {
    if (!confirm('Remove this attendance record?')) return
    setBusy(recordId)
    try { await attendanceApi.deleteRecord(recordId); toast.success('Record removed'); await load() }
    catch (err) { toast.error(apiErrorMessage(err)) }
    finally { setBusy(null) }
  }

  const remindUnsigned = async () => {
    if (!meeting) return
    try {
      const r = await notificationsApi.send({
        category: 'attendance',
        title: 'Please sign your attendance',
        body: `${meeting.title} is ongoing. Open the GHAFRA app and sign in with the room code.`,
        audience: { type: 'not_checked_in', meetingId: meeting.id },
        channels: ['push'],
        route: '/(tabs)/(community)/attendance',
      })
      toast.success(`Reminder sent to ${r.recipients} member(s)`)
    } catch (err) { toast.error(apiErrorMessage(err)) }
  }

  const rate = roster && roster.totals.expected ? Math.round((roster.totals.attended / roster.totals.expected) * 100) : 0

  return (
    <Dialog open={!!meeting} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{meeting?.title}</DialogTitle>
          <DialogDescription>Who has signed in, and who hasn't yet.</DialogDescription>
        </DialogHeader>

        {loading && !roster ? (
          <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
        ) : roster && (
          <>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-emerald-500/10 p-3"><p className="text-2xl font-bold text-emerald-600">{roster.totals.attended}</p><p className="text-xs text-muted-foreground">Signed in</p></div>
              <div className="rounded-xl bg-muted p-3"><p className="text-2xl font-bold">{roster.totals.expected}</p><p className="text-xs text-muted-foreground">Expected</p></div>
              <div className="rounded-xl bg-primary/10 p-3"><p className="text-2xl font-bold text-primary">{rate}%</p><p className="text-xs text-muted-foreground">Turnout</p></div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search members…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              {meeting?.is_active && <Button variant="outline" onClick={remindUnsigned}>Remind unsigned</Button>}
            </div>

            <section>
              <h3 className="mb-2 text-sm font-semibold">Signed in ({attended.length})</h3>
              <ul className="divide-y divide-border rounded-xl border border-border">
                {attended.length === 0 && <li className="p-4 text-center text-sm text-muted-foreground">Nobody yet.</li>}
                {attended.map(r => (
                  <li key={r.record_id} className="flex items-center gap-3 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.member?.name ?? 'Member'}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.recorded_at && new Date(r.recorded_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' })}
                        {r.distance_m != null && <> · <MapPin className="inline size-3" /> {Math.round(r.distance_m)} m</>}
                      </p>
                    </div>
                    {r.validation_status === 'admin_override'
                      ? <Badge variant="secondary"><ShieldCheck className="mr-1 size-3" />Admin</Badge>
                      : <Badge className="bg-emerald-600">GPS verified</Badge>}
                    {r.record_id && (
                      <Button size="icon" variant="ghost" disabled={busy === r.record_id} onClick={() => unmark(r.record_id!)} title="Remove record">
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-sm font-semibold">Not signed in ({notSigned.length})</h3>
              <ul className="max-h-72 divide-y divide-border overflow-y-auto rounded-xl border border-border">
                {notSigned.length === 0 && <li className="p-4 text-center text-sm text-muted-foreground">Everyone is signed in </li>}
                {notSigned.map(m => (
                  <li key={m.id} className="flex items-center gap-3 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{m.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                    </div>
                    {canMark && (
                      <Button size="sm" variant="outline" disabled={busy === m.id} onClick={() => mark(m.id)}>
                        {busy === m.id ? <Loader2 className="size-4 animate-spin" /> : <><UserPlus className="mr-1 size-4" />Mark present</>}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
              {!canMark && <p className="mt-2 text-xs text-muted-foreground">Members can be marked present manually from the meeting day.</p>}
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
