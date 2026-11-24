
import { useState } from 'react'
import {
  CalendarDays,
  Plus,
  Clock,
  Pencil,
  Power,
  X,
} from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import type { Meeting, MeetingStatus } from '../types/attendance'

export function MeetingsManagement() {
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
  })

  // Meetings will be loaded from the backend when its API is available.
  const meetings: Meeting[] = []

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const statusStyles: Record<MeetingStatus, string> = {
    upcoming: 'bg-blue-500/10 text-blue-500',
    active: 'bg-emerald-500/10 text-emerald-500',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-red-500/10 text-red-500',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Meeting Management</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage GHAFRA attendance meetings.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? 'Close Form' : 'Create Meeting'}
        </button>
      </div>

      {showForm && (
        <Card className="border-border">
          <CardContent className="space-y-5 p-6">
            <h3 className="font-semibold">New Meeting Details</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Meeting Title</label>
                <input
                  value={form.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="e.g. Monthly Community Meeting"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => updateField('date', e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={e => updateField('startTime', e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={e => updateField('endTime', e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-sm font-medium">Attendance availability</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Attendance activation and deactivation will be connected
                to the backend meeting configuration.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted/30"
              >
                Cancel
              </button>
              <button
                disabled
                title="Meeting creation will be enabled when the backend API is available."
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50"
              >
                Save Meeting
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Meetings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            View upcoming and previous meetings.
          </p>
        </div>

        {meetings.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center p-6 text-center">
            <CalendarDays className="mb-3 size-9 text-muted-foreground" />
            <h3 className="font-medium">No meetings available</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Meeting information will appear here when retrieved
              from the attendance backend.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {meetings.map(meeting => (
              <div key={meeting.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {meeting.date}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {meeting.startTime} – {meeting.endTime}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[meeting.status]}`}>
                    {meeting.status}
                  </span>
                  <button disabled title="Available after backend integration" className="rounded-lg p-2 opacity-40">
                    <Pencil className="size-4" />
                  </button>
                  <button disabled title="Available after backend integration" className="rounded-lg p-2 opacity-40">
                    <Power className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
