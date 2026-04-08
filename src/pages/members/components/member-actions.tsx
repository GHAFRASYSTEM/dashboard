import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Edit2, Eye, MoreVertical, Trash2 } from 'lucide-react'
import type { Member } from '../types/members'

interface MemberActionsProps {
  member: Member
  stopLink?: boolean
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

export function MemberActions({
  member,
  stopLink = false,
  onEdit,
  onDelete,
}: MemberActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={stopLink ? (e) => e.preventDefault() : undefined}
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-border bg-popover">
        <DropdownMenuItem asChild>
          <Link to={`/members/${member.id}`} onClick={(e) => e.stopPropagation()}>
            <Eye className="mr-2 size-4" />
            View Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={(e) => { e.preventDefault(); onEdit(member) }}>
          <Edit2 className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={(e) => { e.preventDefault(); onDelete(member) }}
        >
          <Trash2 className="mr-2 size-4" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}