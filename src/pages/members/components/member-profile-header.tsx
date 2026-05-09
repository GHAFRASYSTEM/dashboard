import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar'

import { Badge } from '../../../components/ui/badge'

import { Button } from '../../../components/ui/button'

import {
  Card,
  CardContent,
} from '../../../components/ui/card'

import {
  Briefcase,
  Check,
  Edit2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Trash2,
} from 'lucide-react'

import type { Member } from '../types/members'

import {
  getCompleteConfig,
  getInitials,
  getRoleConfig,
  getVerifiedConfig,
} from '../utils/member-utils'

interface MemberProfileHeaderProps {
  member: Member
  copied: boolean
  onCopyId: () => void
  onMessage: () => void
  onEdit: () => void
  onDelete: () => void
}

export function MemberProfileHeader({
  member,
  onMessage,
  onEdit,
  onDelete,
}: MemberProfileHeaderProps) {
  const verifiedConfig = getVerifiedConfig(
    member.is_verified
  )

  const completeConfig = getCompleteConfig(
    member.is_complete
  )

  const roleConfig = getRoleConfig(
    member.role
  )

  return (
    <Card className="overflow-hidden border-border">
      {/* COVER */}
      <div className="relative h-40 bg-linear-to-br from-primary/30 via-primary/20 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,119,198,0.1),transparent)]" />
      </div>

      <CardContent className="relative pt-0 pb-6">
        {/* AVATAR */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <Avatar className="size-32 border-4 border-card shadow-xl">
              <AvatarImage
                src={member.photo_url ?? ''}
                alt={member.name}
                className="object-cover"
              />

              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            <div
              className={`absolute bottom-2 right-2 size-5 rounded-full border-2 border-card ${verifiedConfig.dot}`}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mb-8 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMessage}
          >
            <MessageSquare className="mr-2 size-4" />
            Message
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            <Edit2 className="mr-2 size-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>
        </div>

        {/* PROFILE INFO */}
        <div className="mt-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">
              {member.name}
            </h1>

            <Badge
              variant="outline"
              className={verifiedConfig.badge}
            >
              <ShieldCheck className="mr-1 size-3" />
              {verifiedConfig.label}
            </Badge>

            <Badge
              variant="outline"
              className={completeConfig.badge}
            >
              {completeConfig.label}
            </Badge>

            <Badge
              variant="outline"
              className={roleConfig.badge}
            >
              {roleConfig.label}
            </Badge>
          </div>

          {/* META */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {member.occupation && (
              <span className="flex items-center gap-1">
                <Briefcase className="size-3" />
                {member.occupation}
              </span>
            )}

            {(member.city || member.region) && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {[member.city, member.region]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            )}

            {member.member_since && (
              <span className="flex items-center gap-1">
                <Check className="size-3" />
                Member since{' '}
                {new Date(
                  member.member_since
                ).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}