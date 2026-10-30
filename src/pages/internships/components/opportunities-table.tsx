import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { Archive, Edit2, Eye, MapPin, MoreVertical, Send, XCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import type { Opportunity, OpportunityAction } from '../types/opportunity'
import {
  availabilityConfig,
  canArchive,
  canClose,
  canEdit,
  canPublish,
  typeConfig,
} from '../utils/opportunity-config'

interface Props {
  opportunities: Opportunity[]
  onView: (item: Opportunity) => void
  onEdit: (item: Opportunity) => void
  onAction: (item: Opportunity, action: OpportunityAction) => void
}

export function OpportunityStatusBadge({ item }: { item: Opportunity }) {
  const config = availabilityConfig[item.availability]
  const Icon = config.icon
  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 size-3" />
      {config.label}
    </Badge>
  )
}

export function OpportunitiesTable({ opportunities, onView, onEdit, onAction }: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Opportunity</TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">Location</TableHead>
            <TableHead className="text-muted-foreground">Deadline</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Last updated</TableHead>
            <TableHead className="w-[50px] text-muted-foreground">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {opportunities.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer border-border transition-colors hover:bg-muted/50"
              onClick={() => onView(item)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {item.organization.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="max-w-[280px] truncate font-medium text-foreground">{item.title}</p>
                    <p className="max-w-[280px] truncate text-sm text-muted-foreground">{item.organization}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="outline" className={typeConfig[item.type].className}>
                  {typeConfig[item.type].label}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="max-w-[180px] truncate">{item.location}</span>
                </div>
              </TableCell>

              <TableCell>
                {item.application_deadline ? (
                  <div className={`text-sm ${item.is_expired ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {format(parseISO(item.application_deadline), 'MMM d, yyyy')}
                    {item.is_expired && <span className="block text-xs">Passed</span>}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">No deadline</span>
                )}
              </TableCell>

              <TableCell>
                <OpportunityStatusBadge item={item} />
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(parseISO(item.updated_at), { addSuffix: true })}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${item.title}`}>
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="border-border bg-popover" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={() => onView(item)}>
                      <Eye className="mr-2 size-4" />
                      View details
                    </DropdownMenuItem>
                    {canEdit(item) && (
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Edit2 className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {canPublish(item) && (
                      <DropdownMenuItem onClick={() => onAction(item, 'publish')}>
                        <Send className="mr-2 size-4" />
                        {item.status === 'closed' ? 'Re-publish' : 'Publish'}
                      </DropdownMenuItem>
                    )}
                    {canClose(item) && (
                      <DropdownMenuItem onClick={() => onAction(item, 'close')}>
                        <XCircle className="mr-2 size-4" />
                        Close applications
                      </DropdownMenuItem>
                    )}
                    {canArchive(item) && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onAction(item, 'archive')}
                        >
                          <Archive className="mr-2 size-4" />
                          Archive
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
