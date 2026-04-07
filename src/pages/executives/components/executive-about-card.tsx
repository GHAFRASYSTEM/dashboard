import { Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  fullBio?: string
}

export function ExecutiveAboutCard({ fullBio }: Props) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="size-5 text-primary" />
          About
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="prose prose-sm max-w-none text-foreground">
          {(fullBio || '')
            .split('\n\n')
            .filter(Boolean)
            .map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 leading-relaxed text-muted-foreground last:mb-0"
              >
                {paragraph}
              </p>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}