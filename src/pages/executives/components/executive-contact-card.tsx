import { Briefcase, Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { Executive } from '../types/executive'

interface Props {
  executive: Executive
}

export function ExecutiveContactCard({ executive }: Props) {
  const socialLinks = executive.socialLinks || {}

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Contact Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Mail className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Email</p>
            <a
              href={`mailto:${executive.email}`}
              className="block truncate text-sm font-medium transition-colors hover:text-primary"
            >
              {executive.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Phone className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <a
              href={`tel:${executive.phone}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {executive.phone}
            </a>
          </div>
        </div>

        {executive.location && (
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <MapPin className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium">{executive.location}</p>
            </div>
          </div>
        )}

        {(socialLinks.twitter || socialLinks.linkedin || socialLinks.website) && (
          <div>
            <p className="mb-3 text-xs text-muted-foreground">Social Links</p>
            <div className="flex items-center gap-2">
              {socialLinks.twitter && (
                <Button variant="outline" size="icon" asChild className="size-9">
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Share2 className="size-4" />
                  </a>
                </Button>
              )}

              {socialLinks.linkedin && (
                <Button variant="outline" size="icon" asChild className="size-9">
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Briefcase className="size-4" />
                  </a>
                </Button>
              )}

              {socialLinks.website && (
                <Button variant="outline" size="icon" asChild className="size-9">
                  <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}