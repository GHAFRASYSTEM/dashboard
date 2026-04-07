import { Award, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  achievements?: string[]
}

export function ExecutiveAchievementsCard({ achievements = [] }: Props) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 text-primary" />
          Achievements & Milestones
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-3"
            >
              <div className="shrink-0 rounded-full bg-primary/10 p-1.5">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{achievement}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}