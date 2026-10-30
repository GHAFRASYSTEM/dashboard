import { lazy, Suspense, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Separator } from '../../../components/ui/separator'
import { Textarea } from '../../../components/ui/textarea'
import { opportunitiesApi } from '../../../api/opportunitiesApi'
import type { ApplicationMethod, Opportunity, OpportunityType } from '../types/opportunity'
import { applicationMethodLabels, typeConfig } from '../utils/opportunity-config'
import { getOpportunityError, issuesToFieldErrors } from '../utils/opportunity-errors'
import {
  diffPayload,
  emptyFormValues,
  latestDeadline,
  toFormValues,
  todayInParis,
  toPayload,
  validateOpportunity,
} from '../utils/opportunity-form'
import type { OpportunityFormValues } from '../utils/opportunity-form'
import { suggestEmailFix } from '../utils/email'
import { LocationField } from './location-field'

// The phone field carries every country's flag and number rules, so it loads only when the form opens.
const PhoneField = lazy(() => import('./phone-field').then((module) => ({ default: module.PhoneField })))

interface Props {
  open: boolean
  opportunity: Opportunity | null
  onOpenChange: (open: boolean) => void
  // Called once the listing is saved (and published, if asked); the page closes the dialog.
  onSaved: (item: Opportunity, message: string) => void
  // Called when a write succeeded but the dialog stays open, so the list can refresh.
  onChanged: () => void
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`grid content-start gap-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export function OpportunityFormDialog({ open, opportunity, onOpenChange, onSaved, onChanged }: Props) {
  // `current` becomes the saved draft if "Save & publish" saved but could not publish.
  const [current, setCurrent] = useState<Opportunity | null>(opportunity)
  const [baseline, setBaseline] = useState<OpportunityFormValues>(
    opportunity ? toFormValues(opportunity) : emptyFormValues,
  )
  const [values, setValues] = useState<OpportunityFormValues>(baseline)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [pending, setPending] = useState<false | 'save' | 'publish'>(false)
  // Set after a 409: someone changed the listing's status while this form was open.
  const [conflict, setConflict] = useState(false)
  const [reloading, setReloading] = useState(false)
  // Bumped when the latest version is loaded, so the location and phone fields start over from it.
  const [revision, setRevision] = useState(0)
  const deadlineRef = useRef<HTMLInputElement>(null)

  const dirty = JSON.stringify(values) !== JSON.stringify(baseline)
  const isLive = current?.status === 'published'
  const isArchived = current?.status === 'archived'
  const canPublish = !current || current.status === 'draft' || current.status === 'closed'

  function update<K extends keyof OpportunityFormValues>(key: K, value: OpportunityFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  // Checks a filled-in field as soon as the user leaves it, instead of waiting for Save.
  function checkField(key: keyof OpportunityFormValues) {
    if (!String(values[key]).trim()) return
    const error = validateOpportunity(values)[key]
    if (error) setFieldErrors((prev) => ({ ...prev, [key]: error }))
  }

  const inputProps = (key: keyof OpportunityFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, e.target.value as OpportunityFormValues[typeof key]),
    onBlur: () => checkField(key),
    'aria-invalid': Boolean(fieldErrors[key]),
    'aria-describedby': fieldErrors[key] ? `${key}-error` : undefined,
    className: 'border-border bg-secondary',
  })

  const emailHint = (key: 'application_email' | 'contact_email') => {
    const fix = suggestEmailFix(values[key].trim())
    if (!fix) return null
    return (
      <p className="text-xs text-amber-600 dark:text-amber-400">
        Did you mean{' '}
        <button type="button" className="font-medium underline underline-offset-2" onClick={() => update(key, fix)}>
          {fix}
        </button>
        ?
      </p>
    )
  }

  function handleOpenChange(next: boolean) {
    if (!next && pending) return
    if (!next && dirty && !window.confirm('Discard your unsaved changes?')) return
    onOpenChange(next)
  }

  function showError(nextError: unknown, prefix = '') {
    const details = getOpportunityError(nextError)
    const issues = issuesToFieldErrors(details.issues)
    if (details.code === 'DEADLINE_PASSED') issues.application_deadline = details.message
    setFieldErrors(issues)
    setError(prefix + (Object.keys(issues).length > 0 && !prefix ? 'Please fix the highlighted fields.' : details.message))
    setConflict(details.status === 409)
    if (details.status === 409) onChanged()
  }

  // Replaces the form with the listing as it is now on the server (GET /opportunities/admin/:id).
  async function loadLatest() {
    if (!current) return
    if (dirty && !window.confirm('Load the latest version? Your unsaved changes in this form will be lost.')) return
    setReloading(true)
    try {
      const fresh = await opportunitiesApi.getOne(current.id)
      const next = toFormValues(fresh)
      setCurrent(fresh)
      setBaseline(next)
      setValues(next)
      setFieldErrors({})
      setError('')
      setConflict(false)
      setRevision((value) => value + 1)
      onChanged()
    } catch (nextError) {
      setError(getOpportunityError(nextError).message)
    } finally {
      setReloading(false)
    }
  }

  async function submit(publish: boolean) {
    const errors = validateOpportunity(values, { publishing: publish })
    // A half-typed date reads as an empty value, so ask the input itself.
    if (deadlineRef.current?.validity.badInput) {
      errors.application_deadline = 'Enter a complete date, or clear the field.'
    }
    setFieldErrors(errors)
    setError('')
    setConflict(false)
    if (Object.keys(errors).length > 0) {
      setError('Please fix the highlighted fields.')
      return
    }

    setPending(publish ? 'publish' : 'save')
    const payload = toPayload(values)
    let saved = current
    try {
      if (!current) {
        saved = await opportunitiesApi.create(payload)
      } else {
        const changes = diffPayload(current, payload)
        if (Object.keys(changes).length > 0) saved = await opportunitiesApi.update(current.id, changes)
      }
    } catch (nextError) {
      showError(nextError)
      setPending(false)
      return
    }
    if (!saved) {
      setPending(false)
      return
    }

    if (publish) {
      try {
        saved = await opportunitiesApi.transition(saved.id, 'publish')
      } catch (nextError) {
        // Saved but not published: stay on the saved listing so retrying doesn't create a duplicate.
        setCurrent(saved)
        setBaseline(toFormValues(saved))
        onChanged()
        showError(nextError, 'Saved, but not published: ')
        setPending(false)
        return
      }
    }

    // `pending` stays set: the buttons remain disabled while the dialog animates closed, so a
    // second click can't create a duplicate. The page remounts the form for the next open.
    const message = publish
      ? 'Opportunity published'
      : !current
        ? 'Draft saved'
        : 'Changes saved'
    onSaved(saved, message)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden border-border bg-card sm:max-w-[800px]"
        // Escape in an open suggestion list closes the list, not the whole form.
        onEscapeKeyDown={(event) => {
          if (event.target instanceof HTMLElement && event.target.getAttribute('aria-expanded') === 'true') {
            event.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{current ? 'Edit opportunity' : 'New job or internship'}</DialogTitle>
          <DialogDescription>
            {current
              ? 'Update the listing details below.'
              : 'New listings are saved as drafts. Members only see them once published.'}
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            void submit(false)
          }}
        >
          <div className="grid flex-1 gap-5 overflow-y-auto px-1 py-4">
            {isLive && (
              <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
                <Info className="mt-0.5 size-4 shrink-0" />
                This listing is live. Saved changes reach members immediately.
              </div>
            )}
            {isArchived && (
              <div className="flex items-start gap-2 rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0" />
                This listing has been archived, so it can no longer be edited or published.
              </div>
            )}

            <fieldset className="grid gap-2">
              <legend className="mb-2 text-sm font-medium">Type</legend>
              <div className="grid grid-cols-2 gap-2">
                {(['internship', 'job'] as OpportunityType[]).map((value) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium focus-within:ring-2 focus-within:ring-ring ${values.type === value ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={value}
                      checked={values.type === value}
                      onChange={() => update('type', value)}
                      className="sr-only"
                    />
                    {typeConfig[value].label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="title" label="Title *" error={fieldErrors.title}>
                <Input {...inputProps('title')} maxLength={200} placeholder="Data Analyst Intern" />
              </Field>
              <Field id="organization" label="Organization *" error={fieldErrors.organization}>
                <Input {...inputProps('organization')} maxLength={200} placeholder="Company or organization name" />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="location"
                label="Location *"
                hint="Search for a city and pick it from the list, or choose Remote."
                error={fieldErrors.location}
              >
                <LocationField
                  key={`location-${revision}`}
                  id="location"
                  value={values.location}
                  onChange={(next) => update('location', next)}
                  invalid={Boolean(fieldErrors.location)}
                  describedBy={fieldErrors.location ? 'location-error' : undefined}
                />
              </Field>
              <Field
                id="application_deadline"
                label="Application deadline"
                hint="Last day to apply (Paris time), up to 2 years ahead. Leave empty for no deadline."
                error={fieldErrors.application_deadline}
              >
                <Input
                  {...inputProps('application_deadline')}
                  ref={deadlineRef}
                  type="date"
                  min={todayInParis()}
                  max={latestDeadline()}
                />
              </Field>
            </div>

            <Field
              id="description"
              label="Description *"
              hint={`${values.description.trim().length.toLocaleString()} / 10,000 characters (at least 20).`}
              error={fieldErrors.description}
            >
              <Textarea
                {...inputProps('description')}
                maxLength={10_000}
                placeholder="Describe the role, the team and what the candidate will work on..."
                className="min-h-[120px] border-border bg-secondary"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="qualifications"
                label="Qualifications"
                hint="One per line, up to 30."
                error={fieldErrors.qualifications}
              >
                <Textarea
                  {...inputProps('qualifications')}
                  placeholder={'Master student in statistics\nFluent in French'}
                  className="min-h-[100px] border-border bg-secondary"
                />
              </Field>
              <Field id="skills" label="Skills" hint="Separate with commas, up to 50." error={fieldErrors.skills}>
                <Textarea
                  {...inputProps('skills')}
                  placeholder="Excel, Python, SQL"
                  className="min-h-[100px] border-border bg-secondary"
                />
              </Field>
            </div>

            <Separator className="bg-border" />

            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">How to apply</h3>
              <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
                <Field id="application_method" label="Application method *">
                  <Select
                    value={values.application_method}
                    onValueChange={(value) => update('application_method', value as ApplicationMethod)}
                  >
                    <SelectTrigger id="application_method" className="w-full border-border bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-popover">
                      {(Object.keys(applicationMethodLabels) as ApplicationMethod[]).map((method) => (
                        <SelectItem key={method} value={method}>
                          {applicationMethodLabels[method]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {values.application_method === 'url' && (
                  <Field id="application_url" label="Application link *" error={fieldErrors.application_url}>
                    <Input {...inputProps('application_url')} type="url" inputMode="url" placeholder="https://company.com/jobs/42" />
                  </Field>
                )}
                {values.application_method === 'email' && (
                  <Field id="application_email" label="Application email *" error={fieldErrors.application_email}>
                    <Input {...inputProps('application_email')} type="email" maxLength={254} placeholder="jobs@company.com" />
                    {emailHint('application_email')}
                  </Field>
                )}
                {values.application_method === 'other' && (
                  <Field id="application_instructions" label="Instructions *" error={fieldErrors.application_instructions}>
                    <Textarea
                      {...inputProps('application_instructions')}
                      maxLength={2000}
                      placeholder="Drop your CV at the association office"
                      className="min-h-[80px] border-border bg-secondary"
                    />
                  </Field>
                )}
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">
                Contact <span className="font-normal text-muted-foreground">(optional)</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="contact_name" label="Name" error={fieldErrors.contact_name}>
                  <Input {...inputProps('contact_name')} maxLength={200} placeholder="Ama Mensah" />
                </Field>
                <Field id="contact_email" label="Email" error={fieldErrors.contact_email}>
                  <Input {...inputProps('contact_email')} type="email" maxLength={254} placeholder="hr@company.com" />
                  {emailHint('contact_email')}
                </Field>
                <Field
                  id="contact_phone"
                  label="Phone"
                  hint="Pick the country code first, then the number without the leading 0."
                  error={fieldErrors.contact_phone}
                >
                  <Suspense fallback={<Input id="contact_phone" disabled placeholder="Loading…" className="border-border bg-secondary" />}>
                    <PhoneField
                      key={`phone-${revision}`}
                      id="contact_phone"
                      value={values.contact_phone}
                      onChange={(next) => update('contact_phone', next)}
                      onBlur={() => checkField('contact_phone')}
                      invalid={Boolean(fieldErrors.contact_phone)}
                      describedBy={fieldErrors.contact_phone ? 'contact_phone-error' : undefined}
                    />
                  </Suspense>
                </Field>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2 flex-col gap-3 border-t border-border bg-card pt-4 sm:flex-row sm:items-center">
            {error && (
              <div role="alert" className="flex flex-col items-start gap-1 text-sm text-destructive sm:mr-auto">
                <p>{error}</p>
                {conflict && current && (
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="h-auto p-0"
                    onClick={() => void loadLatest()}
                    disabled={reloading}
                  >
                    {reloading ? 'Loading…' : 'Load latest version'}
                  </Button>
                )}
              </div>
            )}
            <div className="flex flex-col-reverse gap-2 sm:ml-auto sm:flex-row">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={Boolean(pending)}>
                Cancel
              </Button>
              <Button type="submit" variant={canPublish ? 'outline' : 'default'} disabled={Boolean(pending) || reloading || isArchived || (Boolean(current) && !dirty)}>
                {pending === 'save' ? 'Saving…' : current ? 'Save changes' : 'Save as draft'}
              </Button>
              {canPublish && (
                <Button type="button" onClick={() => void submit(true)} disabled={Boolean(pending) || reloading}>
                  {pending === 'publish' ? 'Publishing…' : current ? 'Save & publish' : 'Publish now'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
