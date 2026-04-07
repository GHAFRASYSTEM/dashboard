import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Edit, Phone, Send, Trash2 } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import type { Executive } from '../types/executive'
import { executiveStatusConfig } from '../utils/executive-config'
import { getExecutiveInitials } from '../utils/executive-helpers'

interface Props {
  executive: Executive
  onEdit: () => void
  onDelete: () => void
  onContact: () => void
}

export function ExecutiveProfileHero({
  executive,
  onEdit,
  onDelete,
  onContact,
}: Props) {
  return (
    <>
      <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
        <Link to="/executives">
          <ArrowLeft className="mr-2 size-4" />
          Back to Executives
        </Link>
      </Button>

      <Card className="overflow-hidden border-border">
        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="absolute right-4 top-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Edit className="mr-2 size-4" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="bg-background/80 text-destructive backdrop-blur-sm hover:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Remove
            </Button>
          </div>
        </div>

        <CardContent className="relative pt-0">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative -mt-16 z-10">
              <Avatar className="size-32 border-4 border-background shadow-xl">
                <AvatarImage src={executive.image} alt={executive.name} />
                <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                  {getExecutiveInitials(executive.name)}
                </AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  'absolute bottom-2 right-2 size-4 rounded-full border-2 border-background',
                  executiveStatusConfig[executive.status].dotClass
                )}
              />
            </div>

            <div className="flex-1 pt-4 md:pt-0">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{executive.name}</h1>

                    <Badge
                      variant="secondary"
                      className={cn(executiveStatusConfig[executive.status].badgeClass)}
                    >
                      {executive.status === 'active' ? (
                        <CheckCircle2 className="mr-1 size-3" />
                      ) : null}
                      {executiveStatusConfig[executive.status].label}
                    </Badge>
                  </div>

                  <p className="text-lg font-medium text-primary">{executive.position}</p>
                  {executive.department && (
                    <p className="text-muted-foreground">{executive.department}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={onContact}>
                    <Send className="mr-2 size-4" />
                    Send Message
                  </Button>

                  <Button variant="outline" asChild>
                    <a href={`tel:${executive.phone}`}>
                      <Phone className="mr-2 size-4" />
                      Call
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {executive.yearsOfService ?? 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Years of Service</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {executive.projectsLed ?? 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Projects Led</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {executive.teamMembers ?? 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}