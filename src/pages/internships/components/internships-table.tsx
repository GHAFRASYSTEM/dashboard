import { format } from 'date-fns'
import {
  Clock,
  DollarSign,
  Edit2,
  Eye,
  MapPin,
  MoreVertical,
  Trash2,
  Users,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import type { Internship } from '../types/internship'
import { contractTypeConfig, statusConfig, typeConfig } from '../utils/internship-config'

interface Props {
  internships: Internship[]
  onView: (internship: Internship) => void
  onEdit: (internship: Internship) => void
  onDelete: (id: string) => void
}

export function InternshipsTable({
  internships,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Internship</TableHead>
            <TableHead className="text-muted-foreground">Contract</TableHead>
            <TableHead className="text-muted-foreground">Location</TableHead>
            <TableHead className="text-muted-foreground">Duration</TableHead>
            <TableHead className="text-muted-foreground">Stipend</TableHead>
            <TableHead className="text-muted-foreground">Applications</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Deadline</TableHead>
            <TableHead className="w-[50px] text-muted-foreground" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {internships.map((internship) => {
            const StatusIcon = statusConfig[internship.status].icon
            const isExpired = new Date(internship.deadline) < new Date()

            return (
              <TableRow
                key={internship.id}
                className="cursor-pointer border-border transition-colors hover:bg-muted/50"
                onClick={() => onView(internship)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-lg">
                      <AvatarImage src={internship.companyLogo} alt={internship.company} />
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                        {internship.company.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{internship.title}</p>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={contractTypeConfig[internship.contractType].className}
                  >
                    {contractTypeConfig[internship.contractType].label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      <span>{internship.location}</span>
                    </div>
                    <Badge variant="outline" className={typeConfig[internship.type].className}>
                      {typeConfig[internship.type].label}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="size-3.5 text-muted-foreground" />
                    <span>{internship.duration}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {internship.stipend ? (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <DollarSign className="size-3.5" />
                      <span>{internship.stipend}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unpaid</span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-muted-foreground" />
                    <span className="font-medium">{internship.applications}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusConfig[internship.status].className}
                  >
                    <StatusIcon className="mr-1 size-3" />
                    {statusConfig[internship.status].label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div
                    className={`text-sm ${isExpired ? 'text-destructive' : 'text-muted-foreground'}`}
                  >
                    {format(internship.deadline, 'MMM d, yyyy')}
                    {isExpired && <span className="block text-xs">Expired</span>}
                  </div>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="border-border bg-popover">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onView(internship)
                        }}
                      >
                        <Eye className="mr-2 size-4" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(internship)
                        }}
                      >
                        <Edit2 className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(internship.id)
                        }}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}