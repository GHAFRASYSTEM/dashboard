import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  CalendarDays, CalendarPlus, Clock, KeyRound, Loader2, MapPin, MoreVertical, Pencil,
  Radio, RotateCcw, Trash2, TrendingUp, UserCheck, Users, XCircle,
} from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Switch } from '../../components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { attendanceApi, apiErrorMessage, type Meeting, type MeetingStatus, type MonthlySummary } from '../../api/attendanceApi'
import { MeetingFormDialog } from './components/meeting-form-dialog'
import { CodeDialog } from './components/code-dialog'
import { RosterDialog } from './components/roster-dialog'
import { formatMeetingDate, isoToParisTime, todayInParis } from './paris-time'

const STATUS_STYLE: Record<MeetingStatus, string> = {
  upcoming: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  completed: 'bg-muted text-muted-foreground',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
}

export default function AttendancePage() {
  const [tab, setTab] = useState<MeetingStatus>('upcoming')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<MonthlySummary | null>(null)
  const [busy, setBusy] = useState<string | null>(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Meeting | null>(null)
  const [codeFor, setCodeFor] = useState<Meeting | null>(null)
  const [rosterFor, setRosterFor] = useState<Meeting | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [y, m] = todayInParis().split('-').map(Number)
      const [list, sum] = await Promise.all([
        attendanceApi.listMeetings(tab),
        attendanceApi.summary(y, m).catch(() => null),
      ])
      setMeetings(list.data)
      setSummary(sum)
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load meetings'))
    } finally { setLoading(false) }
  }, [tab])

  useEffect(() => { load() }, [load])

  // Keep live numbers fresh while check-in is open
  useEffect(() => {
    if (!meetings.some(m => m.is_active)) return
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [meetings, load])

  const toggleActive = async (m: Meeting, active: boolean) => {
    if (active && m.meeting_date !== todayInParis() &&
      !confirm('This meeting is not today. Check-in will open automatically on the meeting day (from its start time). Continue?')) return
    setBusy(m.id)
    try {
      await attendanceApi.setActive(m.id, active)
      toast.success(active ? 'Check-in opened — members are being notified by push and email' : 'Check-in closed')
      await load()
      if (active) setCodeFor(m)
    } catch (err) { toast.error(apiErrorMessage(err)) }
    finally { setBusy(null) }
  }

  const cancel = async (m: Meeting, cancelled: boolean) => {
    if (cancelled && !confirm(`Cancel "${m.title}"? Members will be notified.`)) return
    try {
      await attendanceApi.updateMeeting(m.id, { cancelled })
      toast.success(cancelled ? 'Meeting cancelled' : 'Meeting restored')
      load()
    } catch (err) { toast.error(apiErrorMessage(err)) }
  }

  const remove = async (m: Meeting) => {
    if (!confirm(`Delete "${m.title}" and all its attendance records? This cannot be undone.`)) return
    try { await attendanceApi.deleteMeeting(m.id); toast.success('Meeting deleted'); load() }
    catch (err) { toast.error(apiErrorMessage(err)) }
  }

  const t = summary?.totals
  const expected = summary?.meetings.reduce((s, m) => s + m.expected, 0) ?? 0
  const rate = expected ? Math.round(((t?.attended ?? 0) / expected) * 100) : 0
  const live = meetings.find(m => m.is_active && m.meeting_date === todayInParis())

  const stats = [
    { label: 'Meetings this month', value: t?.meetings ?? 0, icon: CalendarDays, tone: 'text-primary bg-primary/10' },
    { label: 'Check-ins this month', value: t?.attended ?? 0, icon: UserCheck, tone: 'text-emerald-600 bg-emerald-500/10' },
    { label: 'Missed', value: t?.unavailable ?? 0, icon: Users, tone: 'text-red-600 bg-red-500/10' },
    { label: 'Turnout', value: `${rate}%`, icon: TrendingUp, tone: 'text-blue-600 bg-blue-500/10' },
  ]

  return (
    <DashboardLayout title="Attendance" subtitle="Schedule meetings, open check-in, and see who signed in." breadcrumbs={[{ label: 'Attendance' }]}>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label} className="border-border">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-xl p-3 ${s.tone}`}><s.icon className="size-5" /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {live && (
        <Card className="mb-6 border-emerald-500/40 bg-emerald-500/5">
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
            <div className="flex-1">
              <p className="font-semibold">Check-in is live: {live.title}</p>
              <p className="text-sm text-muted-foreground">Members who haven't signed get automatic reminders mid-meeting and 10 minutes before check-in closes.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCodeFor(live)}><KeyRound className="mr-2 size-4" />Show code</Button>
              <Button onClick={() => setRosterFor(live)}><Users className="mr-2 size-4" />Live roster</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={v => setTab(v as MeetingStatus)}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => { setEditing(null); setFormOpen(true) }}>
          <CalendarPlus className="mr-2 size-4" />Schedule meeting
        </Button>
      </div>

      {loading && !meetings.length ? (
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-primary" /></div>
      ) : meetings.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <CalendarDays className="size-10 text-muted-foreground" />
            <p className="font-medium">No {tab} meetings</p>
            {tab === 'upcoming' && <p className="max-w-sm text-sm text-muted-foreground">Schedule the next meeting at least a week ahead — members get a daily countdown for the 7 days before it.</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map(m => {
            const time = [isoToParisTime(m.starts_at), isoToParisTime(m.ends_at)].filter(Boolean).join(' – ')
            return (
              <Card key={m.id} className={`border-border transition-shadow hover:shadow-md ${m.is_active ? 'ring-2 ring-emerald-500/40' : ''}`}>
                <CardContent className="flex h-full flex-col gap-3 pt-6">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={STATUS_STYLE[m.status]}>{m.status}</Badge>
                        {m.is_active && <Badge className="bg-emerald-600"><Radio className="mr-1 size-3" />Check-in open</Badge>}
                      </div>
                      <h3 className="truncate font-semibold">{m.title}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreVertical className="size-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditing(m); setFormOpen(true) }}><Pencil className="mr-2 size-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setCodeFor(m)}><KeyRound className="mr-2 size-4" />Check-in code</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {m.status === 'cancelled'
                          ? <DropdownMenuItem onClick={() => cancel(m, false)}><RotateCcw className="mr-2 size-4" />Restore</DropdownMenuItem>
                          : <DropdownMenuItem onClick={() => cancel(m, true)}><XCircle className="mr-2 size-4" />Cancel meeting</DropdownMenuItem>}
                        <DropdownMenuItem className="text-red-600" onClick={() => remove(m)}><Trash2 className="mr-2 size-4" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><CalendarDays className="size-4" />{formatMeetingDate(m.meeting_date)}</p>
                    {time && <p className="flex items-center gap-2"><Clock className="size-4" />{time}</p>}
                    <p className="flex items-center gap-2"><MapPin className="size-4" />{m.location_name ?? `${m.latitude.toFixed(4)}, ${m.longitude.toFixed(4)}`} · {m.radius_m} m</p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
                    {m.status === 'upcoming' ? (
                      <label className="flex flex-1 items-center gap-2 text-sm">
                        <Switch checked={m.is_active} disabled={busy === m.id} onCheckedChange={v => toggleActive(m, v)} />
                        {m.is_active ? 'Check-in open' : 'Open check-in'}
                      </label>
                    ) : <span className="flex-1" />}
                    <Button size="sm" variant="outline" onClick={() => setRosterFor(m)}><Users className="mr-1 size-4" />Roster</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <MeetingFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        meeting={editing}
        onSaved={saved => { load(); if (!editing && saved.check_in_code) setCodeFor(saved) }}
      />
      <CodeDialog meeting={codeFor} onOpenChange={o => !o && setCodeFor(null)} />
      <RosterDialog meeting={rosterFor} onOpenChange={o => !o && setRosterFor(null)} />
    </DashboardLayout>
  )
}
