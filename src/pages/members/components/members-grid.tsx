import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { Briefcase, ChevronRight, Clock, MapPin } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { Member } from '../types/members'
import { getInitials, getStatusConfig } from '../utils/member-utils'
import { MemberActions } from './member-actions'

interface MembersGridProps {
  members: Member[]
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

export function MembersGrid({ members, onEdit, onDelete }: MembersGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => {
        const sc = getStatusConfig(member.status)

        return (
          <Link key={member.id} to={`/members/${member.id}`}>
            <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

                  <div className="absolute top-2 right-2">
                    <MemberActions
                      member={member}
                      stopLink
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>

                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <Avatar className="size-24 border-4 border-card shadow-xl">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          'absolute bottom-1 right-1 size-4 rounded-full border-2 border-card',
                          sc.dot
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-14 text-center">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">{member.membershipId}</p>

                  {member.position && (
                    <Badge variant="secondary" className="mb-3">
                      <Briefcase className="mr-1 size-3" />
                      {member.position}
                    </Badge>
                  )}

                  <div className="mb-3 flex justify-center">
                    <Badge variant="outline" className={sc.badge}>
                      {sc.label}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1.5">
                      <MapPin className="size-3 shrink-0" />
                      {member.location}
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                      <Clock className="size-3 shrink-0" />
                      Joined {format(member.joinedAt, 'MMM yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {member.lastPayment ? `Paid ${format(member.lastPayment, 'MMM d')}` : 'No payment'}
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}