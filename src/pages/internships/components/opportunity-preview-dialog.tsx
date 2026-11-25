import { format, parseISO } from 'date-fns'
import {
  Archive,
  CalendarClock,
  ChevronRight,
  Edit2,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  XCircle,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
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
import type { Opportunity, OpportunityAction, OpportunityProfile } from '../types/opportunity'
import {
  applicationMethodLabels,
  canArchive,
  canClose,
  canEdit,
  canPublish,
  typeConfig,
} from '../utils/opportunity-config'
import { OpportunityStatusBadge } from './opportunities-table'

interface Props {
  opportunity: Opportunity | null
  onOpenChange: (open: boolean) => void
  onEdit: (item: Opportunity) => void
  onAction: (item: Opportunity, action: OpportunityAction) => void
}

const formatDateTime = (value: string) => format(parseISO(value), 'MMM d, yyyy · HH:mm')

function personName(person?: OpportunityProfile | null) {
  return person?.name || person?.email || null
}

function ActivityRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <>
      <Separator className="bg-border" />
      <div className="flex items-start justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-right font-medium">{value}</span>
      </div>
    </>
  )
}

export function OpportunityPreviewDialog({ opportunity: item, onOpenChange, onEdit, onAction }: Props) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-border bg-card p-0 sm:max-w-225">
        <DialogHeader className="sr-only">
          <DialogTitle>{item?.title}</DialogTitle>
          <DialogDescription>Full details for this listing</DialogDescription>
        </DialogHeader>

        {item && (
          <>
            <div className="border-b border-border bg-linear-to-r from-primary/5 via-transparent to-transparent p-6 pr-12">
              <div className="flex items-start gap-4">
                <Avatar className="hidden size-14 rounded-xl ring-2 ring-border sm:flex">
                  <AvatarFallback className="rounded-xl bg-primary/10 text-lg text-primary">
                    {item.organization.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={typeConfig[item.type].className}>
                      {typeConfig[item.type].label}
                    </Badge>
                    <OpportunityStatusBadge item={item} />
                  </div>
                  <h2 className="mt-2 text-2xl font-bold break-words text-foreground">{item.title}</h2>
                  <p className="text-lg text-muted-foreground">{item.organization}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {item.location}
                    </span>
                    <span className={`flex items-center gap-1.5 ${item.is_expired ? 'text-destructive' : ''}`}>
                      <CalendarClock className="size-4" />
                      {item.application_deadline
                        ? `Apply by ${format(parseISO(item.application_deadline), 'MMM d, yyyy')}${item.is_expired ? ' (passed)' : ''}`
                        : 'No deadline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-6 md:col-span-2">
                  <section>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <FileText className="size-5 text-primary" />
                      Description
                    </h3>
                    <p className="leading-relaxed whitespace-pre-line text-muted-foreground">{item.description}</p>
                  </section>

                  {item.qualifications.length > 0 && (
                    <section>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <GraduationCap className="size-5 text-primary" />
                        Qualifications
                      </h3>
                      <ul className="space-y-2">
                        {item.qualifications.map((qualification, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{qualification}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {item.skills.length > 0 && (
                    <section>
                      <h3 className="mb-3 text-lg font-semibold">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="space-y-4">
                  <Card className="border-border">
                    <CardContent className="space-y-3 p-4">
                      <h4 className="font-semibold">How to apply</h4>
                      <p className="text-sm text-muted-foreground">{applicationMethodLabels[item.application_method]}</p>
                      {item.application_method === 'url' && item.application_url && (
                        <a
                          href={item.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm break-all text-primary hover:underline"
                        >
                          <ExternalLink className="size-4 shrink-0" />
                          {item.application_url}
                        </a>
                      )}
                      {item.application_method === 'email' && item.application_email && (
                        <a
                          href={`mailto:${item.application_email}`}
                          className="flex items-center gap-2 text-sm break-all text-primary hover:underline"
                        >
                          <Mail className="size-4 shrink-0" />
                          {item.application_email}
                        </a>
                      )}
                      {item.application_method === 'other' && item.application_instructions && (
                        <p className="text-sm whitespace-pre-line">{item.application_instructions}</p>
                      )}
                    </CardContent>
                  </Card>

                  {(item.contact_name || item.contact_email || item.contact_phone) && (
                    <Card className="border-border">
                      <CardContent className="space-y-3 p-4">
                        <h4 className="font-semibold">Contact</h4>
                        {item.contact_name && (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="size-4" />
                            {item.contact_name}
                          </p>
                        )}
                        {item.contact_email && (
                          <a
                            href={`mailto:${item.contact_email}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Mail className="size-4" />
                            <span className="truncate">{item.contact_email}</span>
                          </a>
                        )}
                        {item.contact_phone && (
                          <a
                            href={`tel:${item.contact_phone}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Phone className="size-4" />
                            {item.contact_phone}
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <Card className="border-border">
                    <CardContent className="space-y-3 p-4">
                      <h4 className="font-semibold">Activity</h4>
                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span className="text-right font-medium">{formatDateTime(item.created_at)}</span>
                      </div>
                      <ActivityRow label="Created by" value={personName(item.creator)} />
                      <ActivityRow label="First published" value={item.published_at && formatDateTime(item.published_at)} />
                      <ActivityRow label="Closed" value={item.closed_at && formatDateTime(item.closed_at)} />
                      <ActivityRow label="Archived" value={item.archived_at ? formatDateTime(item.archived_at) : null} />
                      <ActivityRow label="Last updated" value={formatDateTime(item.updated_at)} />
                      <ActivityRow label="Updated by" value={personName(item.updater)} />
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    {canPublish(item) && (
                      <Button className="w-full" onClick={() => onAction(item, 'publish')}>
                        <Send className="mr-2 size-4" />
                        {item.status === 'closed' ? 'Re-publish' : 'Publish'}
                      </Button>
                    )}
                    {canEdit(item) && (
                      <Button variant="outline" className="w-full" onClick={() => onEdit(item)}>
                        <Edit2 className="mr-2 size-4" />
                        Edit listing
                      </Button>
                    )}
                    {canClose(item) && (
                      <Button variant="outline" className="w-full" onClick={() => onAction(item, 'close')}>
                        <XCircle className="mr-2 size-4" />
                        Close applications
                      </Button>
                    )}
                    {canArchive(item) && (
                      <Button
                        variant="ghost"
                        className="w-full text-destructive hover:text-destructive"
                        onClick={() => onAction(item, 'archive')}
                      >
                        <Archive className="mr-2 size-4" />
                        Archive
                      </Button>
                    )}
                    {item.status === 'archived' && (
                      <p className="text-center text-sm text-muted-foreground">
                        Archived listings can't be edited or published again.
                      </p>
                    )}
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
