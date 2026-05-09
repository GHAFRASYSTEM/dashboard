import { format } from 'date-fns'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

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
        <CardTitle className="text-lg">
          Personal Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* GENDER */}
        {member.gender && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Gender
            </span>

            <span className="font-medium capitalize">
              {member.gender.replaceAll('_', ' ')}
            </span>
          </div>
        )}

        {/* OCCUPATION */}
        {member.occupation && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Occupation
            </span>

            <span className="font-medium">
              {member.occupation}
            </span>
          </div>
        )}

        {/* REGION */}
        {member.region && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Region
            </span>

            <span className="font-medium">
              {member.region}
            </span>
          </div>
        )}

        {/* MEMBER SINCE */}
        {member.member_since && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Member Since
            </span>

            <span className="font-medium">
              {format(
                new Date(member.member_since),
                'MMMM d, yyyy'
              )}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}