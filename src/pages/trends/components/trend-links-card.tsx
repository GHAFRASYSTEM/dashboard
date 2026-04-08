import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { ExternalLink, Link2 } from 'lucide-react'
import type { TrendLink } from '../types/trends'

interface TrendLinksCardProps {
  links: TrendLink[]
}

export function TrendLinksCard({ links }: TrendLinksCardProps) {
  if (!links.length) return null

  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Link2 className="size-4" />
          Sources & References
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 transition hover:border-primary/30 hover:bg-secondary"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {link.label || 'External Source'}
                </p>
                <p className="truncate text-xs text-muted-foreground">{link.url}</p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}