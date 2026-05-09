import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

export function MemberActivityTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          No recent activity available.
        </p>
      </CardContent>
    </Card>
  )
}