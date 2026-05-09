import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

export function MemberContributionsTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">
          Payment History
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          No payment history available.
        </p>
      </CardContent>
    </Card>
  )
}