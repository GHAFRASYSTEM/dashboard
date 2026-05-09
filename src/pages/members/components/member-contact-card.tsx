import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

import {
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react'

import type { Member } from '../types/members'

interface MemberContactCardProps {
  member: Member
}

export function MemberContactCard({
  member,
}: MemberContactCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">
          Contact Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* EMAIL */}
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
        >
          <div className="rounded-lg bg-primary/10 p-2">
            <Mail className="size-4 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="truncate font-medium">
              {member.email}
            </p>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </a>

        {/* GHANA PHONE */}
        {member.ghana_phone && (
          <a
            href={`tel:${member.ghana_phone}`}
            className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
          >
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <Phone className="size-4 text-emerald-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">
                Ghana Phone
              </p>

              <p className="font-medium">
                {member.ghana_phone}
              </p>
            </div>

            <ExternalLink className="size-4 text-muted-foreground" />
          </a>
        )}

        {/* FRENCH PHONE */}
        {member.french_phone && (
          <a
            href={`tel:${member.french_phone}`}
            className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
          >
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Phone className="size-4 text-blue-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">
                French Phone
              </p>

              <p className="font-medium">
                {member.french_phone}
              </p>
            </div>

            <ExternalLink className="size-4 text-muted-foreground" />
          </a>
        )}

        {/* LOCATION */}
        {(member.city || member.region) && (
          <div className="rounded-lg border border-border p-3">
            <p className="text-sm text-muted-foreground">
              Location
            </p>

            <p className="font-medium">
              {[member.city, member.region]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}