import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Member } from '../types/members'

interface MemberPersonalDetailsCardProps {
  member: Member
}

export function MemberPersonalDetailsCard({
  member,
}: MemberPersonalDetailsCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Personal Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {member.dateOfBirth && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Date of Birth</span>
            <span className="font-medium">
              {format(member.dateOfBirth, 'MMM d, yyyy')}
            </span>
          </div>
        )}

        {member.occupation && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Occupation</span>
            <span className="font-medium">{member.occupation}</span>
          </div>
        )}

        {member.employer && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Employer</span>
            <span className="font-medium">{member.employer}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Joined</span>
          <span className="font-medium">{format(member.joinedAt, 'MMMM d, yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  )
}