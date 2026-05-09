import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

export function MemberEmergencyContactCard() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">
          Emergency Contact
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          No emergency contact information available.
        </p>
      </CardContent>
    </Card>
  )
}