import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { Briefcase, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { Member } from '../types/members'
import { getInitials, getStatusConfig } from '../utils/member-utils'
import { MemberActions } from './member-actions'

interface MembersListProps {
  members: Member[]
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

export function MembersList({ members, onEdit, onDelete }: MembersListProps) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="w-10" />
          <span>Member</span>
          <span className="hidden md:block">Contact</span>
          <span className="hidden lg:block">Location & Joined</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-border">
          {members.map((member) => {
            const sc = getStatusConfig(member.status)

            return (
              <Link
                key={member.id}
                to={`/members/${member.id}`}
                className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/20"
              >
                <div className="relative w-10">
                  <Avatar className="size-10 border border-border">
                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      'absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card',
                      sc.dot
                    )}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold">{member.name}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{member.membershipId}</span>
                    {member.position && (
                      <span className="hidden items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs sm:flex">
                        <Briefcase className="size-2.5" />
                        {member.position}
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden min-w-0 space-y-0.5 md:block">
                  <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                    <Mail className="size-3 shrink-0" />
                    {member.email}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Phone className="size-3 shrink-0" />
                    {member.phone}
                  </p>
                </div>

                <div className="hidden min-w-0 space-y-0.5 lg:block">
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3 shrink-0" />
                    {member.location}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3 shrink-0" />
                    {member.lastPayment
                      ? `Paid ${format(member.lastPayment, 'MMM d, yyyy')}`
                      : `Joined ${format(member.joinedAt, 'MMM yyyy')}`}
                  </p>
                </div>

                <Badge variant="outline" className={cn('shrink-0', sc.badge)}>
                  {sc.label}
                </Badge>

                <div onClick={(e) => e.preventDefault()}>
                  <MemberActions member={member} onEdit={onEdit} onDelete={onDelete} />
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}