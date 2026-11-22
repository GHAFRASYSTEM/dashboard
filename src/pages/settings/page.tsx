import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CreditCard, Loader2, Smartphone } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { settingsApi, type AppSettings } from '../../api/notificationsApi'
import { apiErrorMessage } from '../../api/attendanceApi'

const FEATURES: { key: keyof AppSettings; icon: typeof CreditCard; title: string; description: string; offNote: string }[] = [
  {
    key: 'card_section_enabled',
    icon: CreditCard,
    title: 'Membership card & account section',
    description: 'The “My Card” tab, the “My Account” shortcut on the home screen, and the account screens (profile, pay dues, transactions).',
    offNote: 'Hidden in the app. Dues reminders still go out, but without a link to the payment screen.',
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(err => toast.error(apiErrorMessage(err, 'Could not load settings')))
  }, [])

  const toggle = async (key: keyof AppSettings, value: boolean) => {
    setSaving(key)
    const prev = settings
    setSettings(s => (s ? { ...s, [key]: value } : s))
    try {
      setSettings(await settingsApi.update({ [key]: value }))
      toast.success(`${value ? 'Enabled' : 'Disabled'} — the app picks this up the next time members open it`)
    } catch (err) {
      setSettings(prev)
      toast.error(apiErrorMessage(err, 'Could not save'))
    } finally { setSaving(null) }
  }

  return (
    <DashboardLayout title="App settings" subtitle="Switch mobile app sections on or off for all members." breadcrumbs={[{ label: 'Settings' }]}>
      <Card className="max-w-3xl border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Smartphone className="size-5 text-primary" />Mobile app modules</CardTitle>
          <CardDescription>Changes apply instantly — no app update needed.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {!settings && <Loader2 className="mx-auto size-6 animate-spin text-primary" />}
          {settings && FEATURES.map(f => {
            const on = settings[f.key]
            return (
              <div key={f.key} className="flex items-start gap-4 rounded-xl border border-border p-4">
                <div className={`rounded-xl p-3 ${on ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}><f.icon className="size-5" /></div>
                <div className="flex-1">
                  <p className="font-medium">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                  {!on && <p className="mt-2 text-xs font-medium text-amber-600">{f.offNote}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {saving === f.key && <Loader2 className="size-4 animate-spin" />}
                  <Switch checked={on} disabled={saving === f.key} onCheckedChange={v => toggle(f.key, v)} />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
