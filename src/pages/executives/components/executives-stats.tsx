import { Card, CardContent } from '../../../components/ui/card'
import { CheckCircle2, UserCog, Users } from 'lucide-react'

interface Props {
  total: number
  active: number
  inactive: number
}

export function ExecutivesStats({ total, active, inactive }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="absolute top-0 right-0 size-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10" />
        <CardContent className="relative pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-3">
              <Users className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-sm text-muted-foreground">Total Executives</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent">
        <div className="absolute top-0 right-0 size-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10" />
        <CardContent className="relative pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3">
              <CheckCircle2 className="size-6 text-green-500" />
            </div>
            <div>
              <p className="text-3xl font-bold">{active}</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border bg-gradient-to-br from-muted via-muted/50 to-transparent">
        <div className="absolute top-0 right-0 size-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-muted" />
        <CardContent className="relative pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-border bg-muted p-3">
              <UserCog className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{inactive}</p>
              <p className="text-sm text-muted-foreground">Inactive Members</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}