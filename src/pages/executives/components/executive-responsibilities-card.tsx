import { Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  responsibilities?: string[]
}

export function ExecutiveResponsibilitiesCard({
  responsibilities = [],
}: Props) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="size-5 text-primary" />
          Key Responsibilities
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{responsibility}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}