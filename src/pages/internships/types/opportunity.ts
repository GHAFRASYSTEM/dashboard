// Mirrors the backend Opportunities API (GHAFRASYSTEM/backend docs/opportunities-api.md).

export type OpportunityType = 'job' | 'internship'
export type OpportunityStatus = 'draft' | 'published' | 'closed' | 'archived'
export type OpportunityAvailability = 'open' | 'expired' | 'closed' | 'draft' | 'archived'
export type ApplicationMethod = 'url' | 'email' | 'other'
export type OpportunityAction = 'publish' | 'close' | 'archive'

export interface OpportunityProfile {
  id: string
  name: string | null
  email: string | null
}

export interface Opportunity {
  id: string
  title: string
  organization: string
  type: OpportunityType
  description: string
  qualifications: string[]
  skills: string[]
  location: string
  application_deadline: string | null
  application_method: ApplicationMethod
  application_url: string | null
  application_email: string | null
  application_instructions: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  status: OpportunityStatus
  published_at: string | null
  closed_at: string | null
  archived_at?: string | null
  created_at: string
  updated_at: string
  availability: OpportunityAvailability
  is_expired: boolean
  created_by?: string | null
  updated_by?: string | null
  creator?: OpportunityProfile | null
  updater?: OpportunityProfile | null
}

// Fields accepted by POST/PATCH /opportunities/admin. Status only changes through the action endpoints.
export interface OpportunityPayload {
  title: string
  organization: string
  type: OpportunityType
  description: string
  qualifications: string[]
  skills: string[]
  location: string
  application_deadline: string | null
  application_method: ApplicationMethod
  application_url: string | null
  application_email: string | null
  application_instructions: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
}

export type OpportunitySortField = 'created_at' | 'updated_at' | 'published_at' | 'application_deadline' | 'title'

export interface OpportunityFilters {
  page?: number
  limit?: number
  type?: OpportunityType
  status?: OpportunityStatus
  expired?: boolean
  location?: string
  search?: string
  sort_by?: OpportunitySortField
  sort_order?: 'asc' | 'desc'
}

export interface OpportunityListMeta {
  total: number
  page: number
  limit: number
  pages: number
}

export interface OpportunityListResponse {
  data: Opportunity[]
  meta: OpportunityListMeta
}

export interface OpportunityIssue {
  field: string
  message: string
}
