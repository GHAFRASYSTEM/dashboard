import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import type { Contribution } from '../types/contribution'
import { getInitials } from '../utils/contribution-helpers'

interface Props {
  item: Contribution
}

export function ContributionMemberCell({ item }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-9">
        <AvatarFallback className="bg-secondary text-xs">
          {getInitials(item.memberName)}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-medium">{item.memberName}</p>
        <p className="text-xs text-muted-foreground">{item.memberId}</p>
      </div>
    </div>
  )
}