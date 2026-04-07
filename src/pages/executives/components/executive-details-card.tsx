import { format } from 'date-fns'
import { Building, Calendar, Clock, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Executive } from '../types/executive'

interface Props {
  executive: Executive
}

export function ExecutiveDetailsCard({ executive }: Props) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {executive.department && (
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-secondary p-2">
              <Building className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="text-sm font-medium">{executive.department}</p>
            </div>
          </div>
        )}

        {executive.education && (
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-secondary p-2">
              <GraduationCap className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Education</p>
              <p className="text-sm font-medium">{executive.education}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-secondary p-2">
            <Calendar className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Joined</p>
            <p className="text-sm font-medium">
              {format(executive.joinedAt, 'MMMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-secondary p-2">
            <Clock className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tenure</p>
            <p className="text-sm font-medium">{executive.yearsOfService ?? 0} years</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}