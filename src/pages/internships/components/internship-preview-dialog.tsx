import { format, formatDistanceToNow } from 'date-fns'
import {
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Edit2,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Separator } from '../../../components/ui/separator'
import type { Internship } from '../types/internship'
import { contractTypeConfig, statusConfig, typeConfig } from '../utils/internship-config'

interface Props {
  internship: Internship | null
  onOpenChange: (open: boolean) => void
  onEdit: (internship: Internship) => void
}

export function InternshipPreviewDialog({
  internship,
  onOpenChange,
  onEdit,
}: Props) {
  return (
    <Dialog open={!!internship} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-border bg-card p-0 sm:max-w-225">
        <DialogHeader className="sr-only">
          <DialogTitle>{internship?.title}</DialogTitle>
          <DialogDescription>
            Full details for this internship listing
          </DialogDescription>
        </DialogHeader>

        {internship && (
          <>
            <div className="border-b border-border bg-linear-to-r from-primary/5 via-transparent to-transparent p-6">
              <div className="flex items-start gap-4">
                <Avatar className="size-16 rounded-xl ring-2 ring-border">
                  <AvatarImage src={internship.companyLogo} alt={internship.company} />
                  <AvatarFallback className="rounded-xl bg-primary/10 text-xl text-primary">
                    {internship.company.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {internship.title}
                      </h2>
                      <p className="text-lg text-muted-foreground">{internship.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={contractTypeConfig[internship.contractType].className}
                      >
                        {contractTypeConfig[internship.contractType].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={statusConfig[internship.status].className}
                      >
                        {statusConfig[internship.status].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={typeConfig[internship.type].className}
                      >
                        {typeConfig[internship.type].label}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      <span>{internship.duration}</span>
                    </div>
                    {internship.stipend && (
                      <div className="flex items-center gap-1.5 font-medium text-emerald-600">
                        <DollarSign className="size-4" />
                        <span>{internship.stipend}</span>
                      </div>
                    )}
                    {internship.department && (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="size-4" />
                        <span>{internship.department}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-6 md:col-span-2">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <FileText className="size-5 text-primary" />
                      About This Internship
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {internship.description}
                    </p>
                  </div>

                  {internship.responsibilities.length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <CheckCircle2 className="size-5 text-primary" />
                        Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {internship.responsibilities.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {internship.requirements.length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <GraduationCap className="size-5 text-primary" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {internship.requirements.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {internship.benefits.length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <Bookmark className="size-5 text-primary" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {internship.benefits.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {internship.skills.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-secondary text-secondary-foreground"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Card className="border-border">
                    <CardContent className="space-y-4 p-4">
                      <h4 className="font-semibold">Quick Stats</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Applications</span>
                          <span className="font-medium">{internship.applications}</span>
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Posted</span>
                          <span className="font-medium">
                            {formatDistanceToNow(internship.postedAt, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Deadline</span>
                          <span
                            className={`font-medium ${
                              new Date(internship.deadline) < new Date()
                                ? 'text-destructive'
                                : ''
                            }`}
                          >
                            {format(internship.deadline, 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="space-y-4 p-4">
                      <h4 className="font-semibold">Contact Information</h4>
                      <div className="space-y-3">
                        {internship.contactEmail && (
                          <a
                            href={`mailto:${internship.contactEmail}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Mail className="size-4" />
                            <span className="truncate">{internship.contactEmail}</span>
                          </a>
                        )}
                        {internship.contactPhone && (
                          <a
                            href={`tel:${internship.contactPhone}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Phone className="size-4" />
                            <span>{internship.contactPhone}</span>
                          </a>
                        )}
                        {internship.website && (
                          <a
                            href={internship.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Globe className="size-4" />
                            <span>Visit Website</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Send className="mr-2 size-4" />
                      View Applications
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border"
                      onClick={() => {
                        onOpenChange(false)
                        onEdit(internship)
                      }}
                    >
                      <Edit2 className="mr-2 size-4" />
                      Edit Listing
                    </Button>
                    <Button variant="outline" className="w-full border-border">
                      <Share2 className="mr-2 size-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}