import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
  CheckCircle2,
  ChevronRight,
  Edit,
  Eye,
  Mail,
  MoreVertical,
  Phone,
  Trash2,
} from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { Executive } from '../types/executive'
import { executiveStatusConfig } from '../utils/executive-config'
import { getExecutiveInitials } from '../utils/executive-helpers'

interface Props {
  executive: Executive
  onEdit: (executive: Executive) => void
  onDelete: (id: string) => void
}

export function ExecutiveCard({ executive, onEdit, onDelete }: Props) {
  return (
    <Link to={`/executives/${executive.id}`}>
      <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-14 border-2 border-background shadow-md transition-shadow group-hover:shadow-lg">
                  <AvatarImage src={executive.image} alt={executive.name} />
                  <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                    {getExecutiveInitials(executive.name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-background',
                    executiveStatusConfig[executive.status].dotClass
                  )}
                />
              </div>

              <div>
                <h3 className="font-semibold transition-colors group-hover:text-primary">
                  {executive.name}
                </h3>
                <p className="text-sm font-medium text-primary">{executive.position}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="border-border bg-popover">
                <DropdownMenuItem asChild>
                  <Link to={`/executives/${executive.id}`}>
                    <Eye className="mr-2 size-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    onEdit(executive)
                  }}
                >
                  <Edit className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    onDelete(executive.id)
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-4" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mb-4 min-h-[40px] line-clamp-2 text-sm text-muted-foreground">
            {executive.bio}
          </p>

          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="rounded bg-secondary p-1">
                <Mail className="size-3.5" />
              </div>
              <span className="truncate">{executive.email}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="rounded bg-secondary p-1">
                <Phone className="size-3.5" />
              </div>
              <span>{executive.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn('text-xs', executiveStatusConfig[executive.status].badgeClass)}
              >
                {executive.status === 'active' && <CheckCircle2 className="mr-1 size-3" />}
                {executiveStatusConfig[executive.status].label}
              </Badge>

              <span className="text-xs text-muted-foreground">
                Since {format(executive.joinedAt, 'MMM yyyy')}
              </span>
            </div>

            <ChevronRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}