import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  Bell, BellRing, Bot, CalendarClock, CheckCircle2, CreditCard, GraduationCap, Loader2, Mail,
  MapPin, Megaphone, Search, Send, Smartphone, Users, X,
} from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { Checkbox } from '../../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import {
  notificationsApi, NOTIFICATION_CATEGORIES, type Audience, type Campaign, type NotificationCategory,
} from '../../api/notificationsApi'
import { attendanceApi, apiErrorMessage, type Meeting } from '../../api/attendanceApi'
import { membersApi } from '../../api/members'
import type { Member } from '../members/types/members'
import { todayInParis } from '../attendance/paris-time'

type AudienceType = Audience['type']

const AUDIENCES: { value: AudienceType; label: string; hint: string }[] = [
  { value: 'all', label: 'All members', hint: 'Everyone with a completed profile' },
  { value: 'users', label: 'Specific members', hint: 'Pick one or more people' },
  { value: 'unpaid_dues', label: 'Unpaid dues', hint: 'Members who have not paid for a month' },
  { value: 'not_checked_in', label: 'Not signed in to a meeting', hint: 'Members missing from a meeting roster' },
  { value: 'not_practiced_today', label: "Haven't practised French today", hint: 'No tutor activity today' },
  { value: 'city', label: 'Members in a city', hint: 'Matches the city on their profile' },
]

const ROUTES = [
  { value: 'none', label: 'Open the app (no specific screen)' },
  { value: '/(standalone)/notifications', label: 'Notifications inbox' },
  { value: '/(tabs)/(community)/attendance', label: 'Attendance check-in' },
  { value: '/(tabs)/(community)/eventCalendar', label: 'Event calendar' },
  { value: '/(account)/paydues', label: 'Pay dues' },
  { value: '/(tabs)/(learn)', label: 'Learn French' },
  { value: '/(standalone)/frenchAI', label: 'Practise with AI' },
]

const TEMPLATES: { label: string; icon: typeof Bell; category: NotificationCategory; title: string; body: string; route: string; channels: ('push' | 'email')[] }[] = [
  { label: 'Meeting ongoing', icon: MapPin, category: 'attendance', title: 'GHAFRA meeting ongoing', body: 'GHAFRA meeting ongoing. Kindly sign your attendance in the app with the code announced in the room.', route: '/(tabs)/(community)/attendance', channels: ['push', 'email'] },
  { label: 'Dues reminder', icon: CreditCard, category: 'dues', title: 'Dues reminder', body: 'Friendly reminder to pay your GHAFRA dues for this month. You can also pay several months in advance in the app.', route: '/(account)/paydues', channels: ['push', 'email'] },
  { label: 'Practise French', icon: GraduationCap, category: 'french_practice', title: 'On pratique un peu ?', body: 'Take 5 minutes today to practise French with your AI tutor.', route: '/(standalone)/frenchAI', channels: ['push'] },
  { label: 'News', icon: Megaphone, category: 'announcements', title: '', body: '', route: '/(standalone)/notifications', channels: ['push'] },
]

const AUTOMATIONS = [
  { icon: CalendarClock, title: 'Meeting countdown', text: 'Daily for the 7 days before each meeting, at a random time between 09:00 and 20:00. On the day, a special “Today is GHAFRA Meeting” push + email at 08:00.' },
  { icon: MapPin, title: 'Attendance', text: '30 min before start (everyone) · the moment check-in opens: “GHAFRA meeting ongoing” push + email · mid-meeting and 10 min before close, to members who haven’t signed.' },
  { icon: CreditCard, title: 'Dues', text: 'To members who haven’t paid this month: push every Monday, Wednesday and Friday at 09:00, then daily (push + email) during the last 7 days of the month. Months paid in advance are skipped.' },
  { icon: Megaphone, title: 'News & updates', text: 'Every new announcement is pushed to all members right away.' },
  { icon: GraduationCap, title: 'French practice', text: 'Every day at 19:00, members who haven’t practised yet get a friendly nudge.' },
]

function audienceLabel(a: Audience): string {
  switch (a.type) {
    case 'all': return 'All members'
    case 'users': return `${a.userIds.length} selected member(s)`
    case 'unpaid_dues': return `Unpaid dues ${a.month}/${a.year}`
    case 'not_checked_in': return 'Not signed in to meeting'
    case 'not_practiced_today': return `No French practice (${a.day})`
    case 'city': return `City: ${a.city}`
  }
}

export default function NotificationsPage() {
  const [y, m] = todayInParis().split('-').map(Number)

  const [category, setCategory] = useState<NotificationCategory>('general')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [route, setRoute] = useState('none')
  const [push, setPush] = useState(true)
  const [email, setEmail] = useState(false)

  const [audienceType, setAudienceType] = useState<AudienceType>('all')
  const [duesMonth, setDuesMonth] = useState(`${y}-${String(m).padStart(2, '0')}`)
  const [meetingId, setMeetingId] = useState('')
  const [city, setCity] = useState('')
  const [selected, setSelected] = useState<Member[]>([])
  const [memberSearch, setMemberSearch] = useState('')
  const [memberResults, setMemberResults] = useState<Member[]>([])

  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [recipients, setRecipients] = useState<number | null>(null)
  const [sending, setSending] = useState(false)

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  const audience: Audience | null = useMemo(() => {
    switch (audienceType) {
      case 'all': return { type: 'all' }
      case 'users': return selected.length ? { type: 'users', userIds: selected.map(s => s.id) } : null
      case 'unpaid_dues': { const [yy, mm] = duesMonth.split('-').map(Number); return yy && mm ? { type: 'unpaid_dues', year: yy, month: mm } : null }
      case 'not_checked_in': return meetingId ? { type: 'not_checked_in', meetingId } : null
      case 'not_practiced_today': return { type: 'not_practiced_today', day: todayInParis() }
      case 'city': return city.trim().length >= 2 ? { type: 'city', city: city.trim() } : null
    }
  }, [audienceType, selected, duesMonth, meetingId, city])

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true)
    try { setCampaigns((await notificationsApi.campaigns(1, 30)).data) }
    catch (err) { toast.error(apiErrorMessage(err, 'Could not load history — has migration 011 been applied?')) }
    finally { setLoadingHistory(false) }
  }, [])

  useEffect(() => { loadHistory() }, [loadHistory])

  useEffect(() => {
    attendanceApi.listMeetings(undefined, 1, 20).then(r => setMeetings(r.data)).catch(() => {})
  }, [])

  // Live recipient count
  useEffect(() => {
    if (!audience) { setRecipients(null); return }
    let alive = true
    const t = setTimeout(() => {
      notificationsApi.preview(audience).then(r => alive && setRecipients(r.recipients)).catch(() => alive && setRecipients(null))
    }, 400)
    return () => { alive = false; clearTimeout(t) }
  }, [audience])

  // Member search for "specific members"
  useEffect(() => {
    if (audienceType !== 'users' || memberSearch.trim().length < 2) { setMemberResults([]); return }
    const t = setTimeout(() => {
      membersApi.list({ search: memberSearch.trim(), limit: 10 }).then(r => setMemberResults(r.members)).catch(() => {})
    }, 300)
    return () => clearTimeout(t)
  }, [memberSearch, audienceType])

  const applyTemplate = (tpl: typeof TEMPLATES[number]) => {
    setCategory(tpl.category); setTitle(tpl.title); setBody(tpl.body); setRoute(tpl.route)
    setPush(tpl.channels.includes('push')); setEmail(tpl.channels.includes('email'))
    if (tpl.category === 'dues') setAudienceType('unpaid_dues')
    if (tpl.category === 'attendance') {
      const live = meetings.find(mt => mt.is_active)
      if (live) { setAudienceType('not_checked_in'); setMeetingId(live.id) }
    }
  }

  const send = async () => {
    if (!audience) return toast.error('Choose who should receive it')
    if (title.trim().length < 2 || body.trim().length < 2) return toast.error('Add a title and a message')
    const channels = [push && 'push', email && 'email'].filter(Boolean) as ('push' | 'email')[]
    if (!channels.length) return toast.error('Pick push, email, or both')
    if (!confirm(`Send to ${recipients ?? 'the selected'} member(s) by ${channels.join(' + ')}?`)) return

    setSending(true)
    try {
      const r = await notificationsApi.send({
        category, title: title.trim(), body: body.trim(), audience, channels,
        route: route === 'none' ? undefined : route,
      })
      toast.success(`Sent to ${r.recipients} member(s) · ${r.pushSent} push delivered${r.emailsSent ? ` · ${r.emailsSent} emails` : ''}`)
      setTitle(''); setBody('')
      loadHistory()
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Sending failed'))
    } finally { setSending(false) }
  }

  return (
    <DashboardLayout title="Notifications" subtitle="Send push notifications and emails to members, and see what went out." breadcrumbs={[{ label: 'Notifications' }]}>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* ── Composer ── */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BellRing className="size-5 text-primary" />New notification</CardTitle>
            <CardDescription>Start from a template or write your own.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map(tpl => (
                <Button key={tpl.label} size="sm" variant="outline" onClick={() => applyTemplate(tpl)}>
                  <tpl.icon className="mr-1.5 size-4" />{tpl.label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={v => setCategory(v as NotificationCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{NOTIFICATION_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Members can mute categories in the app.</p>
              </div>
              <div className="grid gap-1.5">
                <Label>When tapped, open</Label>
                <Select value={route} onValueChange={setRoute}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ROUTES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <div className="flex justify-between"><Label htmlFor="n-title">Title</Label><span className="text-xs text-muted-foreground">{title.length}/120</span></div>
              <Input id="n-title" maxLength={120} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. GHAFRA meeting ongoing" />
            </div>
            <div className="grid gap-1.5">
              <div className="flex justify-between"><Label htmlFor="n-body">Message</Label><span className="text-xs text-muted-foreground">{body.length}/1000</span></div>
              <Textarea id="n-body" rows={4} maxLength={1000} value={body} onChange={e => setBody(e.target.value)} placeholder="Keep push messages short — about 120 characters show on the lock screen." />
            </div>

            <div className="grid gap-3 rounded-xl border border-border p-4">
              <Label>Audience</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {AUDIENCES.map(a => (
                  <button key={a.value} type="button" onClick={() => setAudienceType(a.value)}
                    className={`rounded-lg border p-3 text-left transition-colors ${audienceType === a.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.hint}</p>
                  </button>
                ))}
              </div>

              {audienceType === 'users' && (
                <div className="grid gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search by name or email…" value={memberSearch} onChange={e => setMemberSearch(e.target.value)} />
                  </div>
                  {memberResults.length > 0 && (
                    <ul className="max-h-48 divide-y divide-border overflow-y-auto rounded-lg border border-border">
                      {memberResults.filter(r => !selected.some(s => s.id === r.id)).map(r => (
                        <li key={r.id}><button type="button" className="w-full p-2 text-left text-sm hover:bg-muted" onClick={() => { setSelected(s => [...s, r]); setMemberSearch('') }}>
                          {r.name} <span className="text-muted-foreground">· {r.email}</span>
                        </button></li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {selected.map(s => (
                      <Badge key={s.id} variant="secondary" className="gap-1">{s.name}
                        <button type="button" onClick={() => setSelected(list => list.filter(x => x.id !== s.id))}><X className="size-3" /></button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {audienceType === 'unpaid_dues' && (
                <div className="grid gap-1.5 sm:max-w-xs"><Label>Month</Label><Input type="month" value={duesMonth} onChange={e => setDuesMonth(e.target.value)} /></div>
              )}
              {audienceType === 'not_checked_in' && (
                <div className="grid gap-1.5">
                  <Label>Meeting</Label>
                  <Select value={meetingId} onValueChange={setMeetingId}>
                    <SelectTrigger><SelectValue placeholder="Choose a meeting" /></SelectTrigger>
                    <SelectContent>{meetings.map(mt => <SelectItem key={mt.id} value={mt.id}>{mt.meeting_date} · {mt.title}{mt.is_active ? ' (live)' : ''}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              {audienceType === 'city' && (
                <div className="grid gap-1.5 sm:max-w-xs"><Label>City</Label><Input value={city} onChange={e => setCity(e.target.value)} placeholder="Paris" /></div>
              )}

              <p className="flex items-center gap-2 text-sm">
                <Users className="size-4 text-primary" />
                {audience ? (recipients === null ? 'Counting…' : <><strong>{recipients}</strong> member(s) will receive this</>) : 'Finish choosing the audience'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-sm"><Checkbox checked={push} onCheckedChange={v => setPush(!!v)} /><Smartphone className="size-4" />Push notification</label>
              <label className="flex items-center gap-2 text-sm"><Checkbox checked={email} onCheckedChange={v => setEmail(!!v)} /><Mail className="size-4" />Email</label>
              <span className="text-xs text-muted-foreground">Every send is also saved in members' in-app inbox.</span>
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={send} disabled={sending || !audience}>
                {sending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
                Send{recipients ? ` to ${recipients}` : ''}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Preview + automations ── */}
        <div className="grid content-start gap-6">
          <Card className="overflow-hidden border-border">
            <CardHeader className="pb-3"><CardTitle className="text-base">Lock-screen preview</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-[28px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-700 p-4">
                <p className="mb-6 text-center text-4xl font-light text-white/90">{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="rounded-2xl bg-white/85 p-3 shadow-lg backdrop-blur">
                  <div className="mb-1 flex items-center gap-2 text-[11px] text-neutral-500">
                    <div className="flex size-5 items-center justify-center rounded-md bg-emerald-700 text-[10px] font-bold text-white">G</div>
                    GHAFRA · now
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{title || 'Notification title'}</p>
                  <p className="line-clamp-3 text-sm text-neutral-700">{body || 'Your message appears here.'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Bot className="size-4 text-primary" />Automatic notifications</CardTitle>
              <CardDescription>These run on their own (Paris time).</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {AUTOMATIONS.map(a => (
                <div key={a.title} className="flex gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2"><a.icon className="size-4 text-primary" /></div>
                  <div><p className="text-sm font-medium">{a.title}</p><p className="text-xs leading-relaxed text-muted-foreground">{a.text}</p></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── History ── */}
      <Card className="mt-6 border-border">
        <CardHeader><CardTitle className="text-base">Sent notifications</CardTitle><CardDescription>Manual and automatic sends, newest first.</CardDescription></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 font-medium">Notification</th>
                <th className="p-3 font-medium">Audience</th>
                <th className="p-3 font-medium">Recipients</th>
                <th className="p-3 font-medium">Push</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Sent</th>
              </tr>
            </thead>
            <tbody>
              {loadingHistory && <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="mx-auto size-5 animate-spin text-primary" /></td></tr>}
              {!loadingHistory && campaigns.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Nothing sent yet.</td></tr>}
              {campaigns.map(c => (
                <tr key={c.id} className="border-t border-border align-top">
                  <td className="max-w-md p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{NOTIFICATION_CATEGORIES.find(x => x.value === c.category)?.label ?? c.category}</Badge>
                      {c.source === 'automatic' ? <Badge variant="secondary" className="text-[10px]"><Bot className="mr-1 size-3" />Auto</Badge> : <span className="text-xs text-muted-foreground">{c.sender?.name ?? 'Admin'}</span>}
                    </div>
                    <p className="font-medium">{c.title}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{c.body}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{audienceLabel(c.audience)}</td>
                  <td className="p-3 font-medium">{c.recipients}</td>
                  <td className="p-3">{c.channels.includes('push') ? <span className="flex items-center gap-1"><CheckCircle2 className="size-4 text-emerald-600" />{c.push_sent}{c.push_failed ? <span className="text-xs text-red-600"> ({c.push_failed} failed)</span> : null}</span> : '—'}</td>
                  <td className="p-3">{c.channels.includes('email') ? c.emails_sent : '—'}</td>
                  <td className="whitespace-nowrap p-3 text-muted-foreground">{new Date(c.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}
