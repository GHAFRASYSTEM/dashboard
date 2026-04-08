import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { EmergencyContact } from '../types/members'

interface MemberEmergencyContactCardProps {
  contact?: EmergencyContact
}

export function MemberEmergencyContactCard({
  contact,
}: MemberEmergencyContactCardProps) {
  if (!contact) return null

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Emergency Contact</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="font-medium">{contact.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Relationship</span>
            <span className="font-medium">{contact.relationship}</span>
          </div>

          <a
            href={`tel:${contact.phone}`}
            className="mx-[-0.5rem] flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/30"
          >
            <span className="text-sm text-muted-foreground">Phone</span>
            <span className="font-medium text-primary">{contact.phone}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}