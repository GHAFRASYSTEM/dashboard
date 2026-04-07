import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  description: string
}

export function HousingDescriptionCard({ description }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About This Property</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          {description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}