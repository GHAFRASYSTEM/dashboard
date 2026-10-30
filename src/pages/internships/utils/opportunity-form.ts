import { format, parseISO } from 'date-fns'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { emailPattern } from './email'
import type {
  ApplicationMethod,
  Opportunity,
  OpportunityPayload,
  OpportunityType,
} from '../types/opportunity'

// Form state keeps every field as a string; lists are edited as text and split on save.
export type OpportunityFormValues = {
  title: string
  organization: string
  type: OpportunityType
  location: string
  application_deadline: string
  description: string
  qualifications: string
  skills: string
  application_method: ApplicationMethod
  application_url: string
  application_email: string
  application_instructions: string
  contact_name: string
  contact_email: string
  contact_phone: string
}

export const emptyFormValues: OpportunityFormValues = {
  title: '',
  organization: '',
  type: 'internship',
  location: '',
  application_deadline: '',
  description: '',
  qualifications: '',
  skills: '',
  application_method: 'url',
  application_url: '',
  application_email: '',
  application_instructions: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
}

export function toFormValues(item: Opportunity): OpportunityFormValues {
  return {
    title: item.title,
    organization: item.organization,
    type: item.type,
    location: item.location,
    application_deadline: item.application_deadline ?? '',
    description: item.description,
    qualifications: item.qualifications.join('\n'),
    skills: item.skills.join(', '),
    application_method: item.application_method,
    application_url: item.application_url ?? '',
    application_email: item.application_email ?? '',
    application_instructions: item.application_instructions ?? '',
    contact_name: item.contact_name ?? '',
    contact_email: item.contact_email ?? '',
    contact_phone: item.contact_phone ?? '',
  }
}

const splitLines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean)
const splitSkills = (value: string) => value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean)
const optional = (value: string) => value.trim() || null

export function toPayload(values: OpportunityFormValues): OpportunityPayload {
  const method = values.application_method
  return {
    title: values.title.trim(),
    organization: values.organization.trim(),
    type: values.type,
    description: values.description.trim(),
    qualifications: splitLines(values.qualifications),
    skills: splitSkills(values.skills),
    location: values.location.trim(),
    application_deadline: values.application_deadline || null,
    application_method: method,
    // Only the detail that matches the method is kept, so a switched method leaves no stale data behind.
    application_url: method === 'url' ? optional(values.application_url) : null,
    application_email: method === 'email' ? optional(values.application_email) : null,
    application_instructions: method === 'other' ? optional(values.application_instructions) : null,
    contact_name: optional(values.contact_name),
    contact_email: optional(values.contact_email),
    contact_phone: optional(values.contact_phone),
  }
}

// PATCH only what changed; `null` clears an optional field on the backend.
export function diffPayload(item: Opportunity, payload: OpportunityPayload) {
  const changes: Partial<OpportunityPayload> = {}
  for (const key of Object.keys(payload) as (keyof OpportunityPayload)[]) {
    if (JSON.stringify(payload[key]) !== JSON.stringify(item[key] ?? null)) {
      Object.assign(changes, { [key]: payload[key] })
    }
  }
  return changes
}

// Today's date in Paris, which is where the backend decides whether a deadline has passed.
export function todayInParis() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date())
}

// Deadlines can be set up to two years ahead, which also rules out 5- and 6-digit years.
const MAX_YEARS_AHEAD = 2

export function latestDeadline() {
  const [year, month, day] = todayInParis().split('-')
  // 29 February doesn't exist in most target years.
  return `${Number(year) + MAX_YEARS_AHEAD}-${month}-${month === '02' && day === '29' ? '28' : day}`
}


function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function checkLength(errors: Record<string, string>, field: string, label: string, value: string, min: number, max: number) {
  if (!value) errors[field] = `${label} is required.`
  else if (value.length < min) errors[field] = `${label} must be at least ${min} characters.`
  else if (value.length > max) errors[field] = `${label} must be at most ${max} characters.`
}

// Mirrors the backend schema so most mistakes are caught before the request; keys match API field names.
export function validateOpportunity(values: OpportunityFormValues, { publishing = false } = {}) {
  const payload = toPayload(values)
  const errors: Record<string, string> = {}

  checkLength(errors, 'title', 'Title', payload.title, 3, 200)
  checkLength(errors, 'organization', 'Organization', payload.organization, 2, 200)
  // The location field only holds a value once a suggestion (or Remote) has been picked.
  if (!payload.location) errors.location = 'Choose a location from the suggestions.'
  else checkLength(errors, 'location', 'Location', payload.location, 2, 200)
  checkLength(errors, 'description', 'Description', payload.description, 20, 10_000)

  if (payload.qualifications.length > 30) errors.qualifications = 'Add at most 30 qualifications.'
  else if (payload.qualifications.some((item) => item.length > 300)) errors.qualifications = 'Each qualification must be at most 300 characters.'
  if (payload.skills.length > 50) errors.skills = 'Add at most 50 skills.'
  else if (payload.skills.some((item) => item.length > 100)) errors.skills = 'Each skill must be at most 100 characters.'

  const deadline = payload.application_deadline
  if (deadline) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
      errors.application_deadline = 'Enter a valid date.'
    } else if (deadline > latestDeadline()) {
      errors.application_deadline = `Choose a date no later than ${format(parseISO(latestDeadline()), 'MMM d, yyyy')}.`
    } else if (publishing && deadline < todayInParis()) {
      errors.application_deadline = 'This deadline has passed. Move it or clear it before publishing.'
    }
  }

  if (payload.application_method === 'url') {
    if (!payload.application_url) errors.application_url = 'Add the link where members apply.'
    else if (!isHttpUrl(payload.application_url)) errors.application_url = 'Enter a valid link starting with http:// or https://.'
  }
  if (payload.application_method === 'email') {
    if (!payload.application_email) errors.application_email = 'Add the email address members apply to.'
    else if (!emailPattern.test(payload.application_email)) errors.application_email = 'Enter a valid email address, like name@company.com.'
  }
  if (payload.application_method === 'other') {
    if (!payload.application_instructions) errors.application_instructions = 'Explain how members should apply.'
    else if (payload.application_instructions.length > 2000) errors.application_instructions = 'Instructions must be at most 2000 characters.'
  }

  if (payload.contact_name && payload.contact_name.length > 200) errors.contact_name = 'Name must be at most 200 characters.'
  if (payload.contact_email && !emailPattern.test(payload.contact_email)) {
    errors.contact_email = 'Enter a valid email address, like name@company.com.'
  }
  // The phone field saves "+<country code> <number>"; this checks the length and format for that country.
  if (payload.contact_phone && !isValidPhoneNumber(payload.contact_phone)) {
    errors.contact_phone = 'Enter a complete, valid number for the selected country.'
  }

  return errors
}
