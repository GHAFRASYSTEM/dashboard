import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { FileText } from 'lucide-react'

interface TrendContentCardProps {
  content: string
}

export function TrendContentCard({ content }: TrendContentCardProps) {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="size-4" />
          Trend Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-[15px] leading-8 text-foreground/85">
          {content}
        </div>
      </CardContent>
    </Card>
  )
}