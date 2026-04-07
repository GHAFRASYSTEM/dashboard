import { Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'
import type { Housing } from '../types/housing'

interface Props {
  housing: Housing
  onOpenContactDialog: () => void
}

export function HousingContactCard({ housing, onOpenContactDialog }: Props) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                housing.contactName
              )}`}
            />
            <AvatarFallback>
              {housing.contactName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-semibold">{housing.contactName}</h4>
            <p className="text-sm text-muted-foreground">Property Agent</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <a
            href={`tel:${housing.contactPhone}`}
            className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{housing.contactPhone}</p>
            </div>
          </a>

          <a
            href={`mailto:${housing.contactEmail}`}
            className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{housing.contactEmail}</p>
            </div>
          </a>
        </div>

        <div className="space-y-3">
          <Button className="w-full" size="lg" onClick={onOpenContactDialog}>
            <MessageCircle className="mr-2 size-4" />
            Send Message
          </Button>

          <Button variant="outline" className="w-full" size="lg" asChild>
            <a href={`tel:${housing.contactPhone}`}>
              <Phone className="mr-2 size-4" />
              Call Agent
            </a>
          </Button>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          <Check className="mx-auto mb-2 size-5 text-emerald-500" />
          Verified listing by Housing Manager
        </div>
      </CardContent>
    </Card>
  )
}