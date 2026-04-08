import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { ExternalLink, Mail, Phone } from 'lucide-react'
import type { Member } from '../types/members'

interface MemberContactCardProps {
  member: Member
}

export function MemberContactCard({ member }: MemberContactCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
        >
          <div className="rounded-lg bg-primary/10 p-2">
            <Mail className="size-4 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="truncate font-medium">{member.email}</p>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </a>

        <a
          href={`tel:${member.phone}`}
          className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
        >
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <Phone className="size-4 text-emerald-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{member.phone}</p>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </a>

        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <div className="rounded-lg bg-amber-500/10 p-2">
            <span className="text-sm font-semibold text-amber-500">L</span>
          </div>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium">{member.location}</p>
            {member.address && (
              <p className="mt-1 text-sm text-muted-foreground">{member.address}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}