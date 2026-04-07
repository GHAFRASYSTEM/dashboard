import { AlertCircle, Briefcase, CheckCircle2, Users } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'

interface Props {
  total: number
  active: number
  pending: number
  totalApplications: number
}

export function InternshipsStats({
  total,
  active,
  pending,
  totalApplications,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute top-0 right-0 h-20 w-20 -mr-10 -mt-10 rounded-full bg-primary/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
              <Briefcase className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-sm text-muted-foreground">Total Listings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
        <div className="absolute top-0 right-0 h-20 w-20 -mr-10 -mt-10 rounded-full bg-emerald-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
              <CheckCircle2 className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{active}</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-amber-500/5 to-amber-500/10">
        <div className="absolute top-0 right-0 h-20 w-20 -mr-10 -mt-10 rounded-full bg-amber-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
              <AlertCircle className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{pending}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
        <div className="absolute top-0 right-0 h-20 w-20 -mr-10 -mt-10 rounded-full bg-blue-500/10" />
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
              <Users className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalApplications}</p>
              <p className="text-sm text-muted-foreground">Applications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}