import { formatDistanceToNow } from 'date-fns'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

import {
  Calendar,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from 'lucide-react'

import type { Member } from '../types/members'

interface MemberQuickStatsProps {
  member: Member
}

export function MemberQuickStats({
  member,
}: MemberQuickStatsProps) {
  const tenure = member.member_since
    ? formatDistanceToNow(
        new Date(member.member_since),
        { addSuffix: false }
      )
    : 'N/A'

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="size-5 text-primary" />
          Quick Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* MEMBER SINCE */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            Member Since
          </span>

          <span className="font-semibold">
            {tenure}
          </span>
        </div>

        {/* ROLE */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserCheck className="size-4" />
            Role
          </span>

          <span className="font-semibold capitalize">
            {member.role}
          </span>
        </div>

        {/* PROFILE STATUS */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />
            Profile
          </span>

          <span className="font-semibold">
            {member.is_complete
              ? 'Complete'
              : 'Incomplete'}
          </span>
        </div>

        {/* VERIFIED */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">
            Verification
          </span>

          <span className="font-semibold">
            {member.is_verified
              ? 'Verified'
              : 'Unverified'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}