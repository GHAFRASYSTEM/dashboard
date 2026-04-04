import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Check, X, ExternalLink } from 'lucide-react'

interface PendingItem {
  id: string
  title: string
  type: 'marketing' | 'housing' | 'internship'
  submittedBy: string
  submittedAt: string
}

const pendingItems: PendingItem[] = [
  {
    id: '1',
    title: 'Digital Marketing Course',
    type: 'marketing',
    submittedBy: 'Tech Academy',
    submittedAt: '2 hours ago',
  },
  {
    id: '2',
    title: '2BR Apartment in Downtown',
    type: 'housing',
    submittedBy: 'Property Plus',
    submittedAt: '4 hours ago',
  },
  {
    id: '3',
    title: 'Web Developer Intern',
    type: 'internship',
    submittedBy: 'StartUp Inc',
    submittedAt: '1 day ago',
  },
]

const typeLabels = {
  marketing: { label: 'Marketing', className: 'bg-chart-3/10 text-chart-3' },
  housing: { label: 'Housing', className: 'bg-chart-2/10 text-chart-2' },
  internship: { label: 'Internship', className: 'bg-chart-4/10 text-chart-4' },
}

export function PendingApprovals() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Pending Approvals</CardTitle>
        <Badge variant="secondary" className="bg-warning/10 text-warning">
          {pendingItems.length} pending
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingItems.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 rounded-lg border border-border bg-secondary/30 p-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{item.title}</span>
                <Badge variant="secondary" className={typeLabels[item.type].className}>
                  {typeLabels[item.type].label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                by {item.submittedBy} · {item.submittedAt}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-foreground">
                <ExternalLink className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" className="size-8 text-success hover:text-success hover:bg-success/10">
                <Check className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
