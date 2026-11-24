
import { useState } from 'react'
import { MapPin, MapPinned, ShieldCheck, Save } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'

export function GeofenceSettings() {
  const [enabled, setEnabled] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [radius, setRadius] = useState('100')

  const [message, setMessage] = useState('')

  const handleSave = () => {
    setMessage(
      'Settings are ready, but saving will be enabled after backend integration.'
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Attendance Geofence</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure the physical location and permitted attendance radius.
        </p>
      </div>

      <Card className="border-border">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <ShieldCheck className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Geofence Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Restrict attendance marking to a configured location.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setEnabled(!enabled)
                setMessage('')
              }}
              aria-pressed={enabled}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                enabled
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              <h3 className="font-medium">Location Configuration</h3>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Location Name</label>
                <input
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  placeholder="Enter meeting location"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)}
                  placeholder="e.g. 5.6037"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={e => setLongitude(e.target.value)}
                  placeholder="e.g. -0.1870"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">
                  Allowed Radius (metres)
                </label>
                <input
                  type="number"
                  min="1"
                  value={radius}
                  onChange={e => setRadius(e.target.value)}
                  placeholder="100"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Members must be within this distance to mark attendance.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <MapPinned className="size-5 text-muted-foreground" />
              <p className="text-sm font-medium">Location Preview</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              A map preview can be connected once the location and geofence
              service is available.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              These settings are intended to apply to future meetings.
            </p>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Save className="size-4" />
              Save Settings
            </button>
          </div>

          {message && (
            <p role="status" className="text-sm text-amber-500">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
