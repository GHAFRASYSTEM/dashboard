import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Crosshair, Loader2, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Switch } from '../../../components/ui/switch'
import { attendanceApi, apiErrorMessage, type Meeting, type MeetingInput } from '../../../api/attendanceApi'
import { isoToParisTime, parisToIso, parseCoordinates, todayInParis } from '../paris-time'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  meeting?: Meeting | null          // edit mode when set
  onSaved: (meeting: Meeting) => void
}

const EMPTY = {
  title: 'GHAFRA Monthly Meeting', description: '', location_name: '',
  meeting_date: todayInParis(), start: '15:00', end: '18:00',
  coords: '', radius_m: 150, is_active: false,
}

export function MeetingFormDialog({ open, onOpenChange, meeting, onSaved }: Props) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm(meeting ? {
      title: meeting.title,
      description: meeting.description ?? '',
      location_name: meeting.location_name ?? '',
      meeting_date: meeting.meeting_date,
      start: isoToParisTime(meeting.starts_at),
      end: isoToParisTime(meeting.ends_at),
      coords: `${meeting.latitude}, ${meeting.longitude}`,
      radius_m: meeting.radius_m,
      is_active: meeting.is_active,
    } : { ...EMPTY, meeting_date: todayInParis() })
  }, [open, meeting])

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(f => ({ ...f, [k]: v }))
  const coords = parseCoordinates(form.coords)

  const useMyLocation = () => {
    if (!navigator.geolocation) return toast.error('Your browser cannot share location')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        set('coords', `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`)
        setLocating(false)
        toast.success(`Location set (±${Math.round(pos.coords.accuracy)} m)`)
      },
      () => { setLocating(false); toast.error('Could not get your location — paste coordinates instead') },
      { enableHighAccuracy: true, timeout: 15000 },
    )
  }

  const submit = async () => {
    if (form.title.trim().length < 3) return toast.error('Title must be at least 3 characters')
    if (!coords) return toast.error('Set the meeting location (coordinates or a Google Maps link)')
    if (form.start && form.end && form.end <= form.start) return toast.error('End time must be after start time')

    const input: MeetingInput = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      location_name: form.location_name.trim() || null,
      meeting_date: form.meeting_date,
      starts_at: parisToIso(form.meeting_date, form.start),
      ends_at: parisToIso(form.meeting_date, form.end),
      latitude: coords.lat,
      longitude: coords.lng,
      radius_m: Number(form.radius_m),
    }

    setSaving(true)
    try {
      const saved = meeting
        ? await attendanceApi.updateMeeting(meeting.id, input)
        : await attendanceApi.createMeeting({ ...input, is_active: form.is_active })
      toast.success(meeting ? 'Meeting updated' : form.is_active
        ? 'Meeting created — check-in is open and members are being notified'
        : 'Meeting created')
      onSaved(saved)
      onOpenChange(false)
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not save the meeting'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{meeting ? 'Edit meeting' : 'Schedule a meeting'}</DialogTitle>
          <DialogDescription>
            Members check in from the app with the room code, within the radius of this location. Times are Paris time.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="m-title">Title</Label>
            <Input id="m-title" value={form.title} onChange={e => set('title', e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="m-desc">Agenda / description (optional)</Label>
            <Textarea id="m-desc" rows={2} value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="m-date">Date</Label>
              <Input id="m-date" type="date" value={form.meeting_date} onChange={e => set('meeting_date', e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="m-start">Starts</Label>
              <Input id="m-start" type="time" value={form.start} onChange={e => set('start', e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="m-end">Check-in closes</Label>
              <Input id="m-end" type="time" value={form.end} onChange={e => set('end', e.target.value)} />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="m-loc">Venue name</Label>
            <Input id="m-loc" placeholder="Maison des associations, Lille" value={form.location_name} onChange={e => set('location_name', e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="m-coords">Venue coordinates</Label>
            <div className="flex gap-2">
              <Input id="m-coords" placeholder="48.8566, 2.3522 or a Google Maps link" value={form.coords} onChange={e => set('coords', e.target.value)} />
              <Button type="button" variant="outline" onClick={useMyLocation} disabled={locating} title="Use my current location">
                {locating ? <Loader2 className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
              </Button>
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {coords
                ? <>Location set: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)} · <a className="underline" target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}>check on map</a></>
                : 'In Google Maps, right-click the venue and copy the coordinates.'}
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="m-radius">Check-in radius: {form.radius_m} m</Label>
            <input id="m-radius" type="range" min={25} max={1000} step={25} value={form.radius_m}
              onChange={e => set('radius_m', Number(e.target.value))} className="accent-primary" />
            <p className="text-xs text-muted-foreground">Indoors GPS can drift 30–80 m; 100–200 m is a good default.</p>
          </div>

          {!meeting && (
            <label className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Open check-in now</p>
                <p className="text-xs text-muted-foreground">Sends “GHAFRA meeting ongoing” push + email to all members.</p>
              </div>
              <Switch checked={form.is_active} onCheckedChange={v => set('is_active', v)} />
            </label>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {meeting ? 'Save changes' : 'Create meeting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
