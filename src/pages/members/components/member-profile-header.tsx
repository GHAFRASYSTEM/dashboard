import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  Briefcase,
  Building,
  Check,
  Copy,
  Edit2,
  MessageSquare,
  Trash2,
} from 'lucide-react'
import type { Member } from '../types/members'
import { getInitials, getStatusConfig } from '../utils/member-utils'

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
  copied,
  onCopyId,
  onMessage,
  onEdit,
  onDelete,
}: MemberProfileHeaderProps) {
  const statusConfig = getStatusConfig(member.status)

  return (
    <Card className="overflow-hidden border-border">
      <div className="relative h-40 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,119,198,0.1),transparent)]" />
      </div>

      <CardContent className="relative pt-0 pb-6">
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <Avatar className="size-32 border-4 border-card shadow-xl">
              <AvatarImage src={member.image} alt={member.name} className="object-cover" />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            <div
              className={`absolute bottom-2 right-2 size-5 rounded-full border-2 border-card ${
                member.status === 'active'
                  ? 'bg-emerald-500'
                  : member.status === 'pending'
                    ? 'bg-amber-500'
                    : 'bg-muted-foreground'
              }`}
            />
          </div>
        </div>

        <div className="mb-8 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onMessage}>
            <MessageSquare className="mr-2 size-4" />
            Message
          </Button>

          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit2 className="mr-2 size-4" />
            Edit
          </Button>

          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <Badge variant="outline" className={statusConfig.badge}>
              {statusConfig.label}
            </Badge>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <button
              onClick={onCopyId}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {copied ? (
                <Check className="size-3 text-emerald-500" />
              ) : (
                <Copy className="size-3" />
              )}
              <span>{member.membershipId}</span>
            </button>

            {member.position && (
              <span className="flex items-center gap-1">
                <Briefcase className="size-3" />
                {member.position}
              </span>
            )}

            {member.department && (
              <span className="flex items-center gap-1">
                <Building className="size-3" />
                {member.department}
              </span>
            )}
          </div>

          {member.bio && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {member.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}