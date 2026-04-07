import { Card, CardContent } from '../../../components/ui/card'
import { Clock, FileText, Megaphone } from 'lucide-react'

interface Props {
  stats: {
    published: number
    scheduled: number
    drafts: number
  }
}

export function AnnouncementsStats({ stats }: Props) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-100">Published</p>
              <p className="mt-1 text-4xl font-bold">{stats.published}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <Megaphone className="size-6" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Scheduled</p>
              <p className="mt-1 text-4xl font-bold">{stats.scheduled}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <Clock className="size-6" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-500 to-slate-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Drafts</p>
              <p className="mt-1 text-4xl font-bold">{stats.drafts}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <FileText className="size-6" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/10" />
        </CardContent>
      </Card>
    </div>
  )
}