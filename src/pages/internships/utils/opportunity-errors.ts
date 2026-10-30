import type { OpportunityIssue } from '../types/opportunity'

type ApiErrorShape = {
  status?: number
  data?: { error?: { message?: string; code?: string; issues?: OpportunityIssue[] } }
}

export function getOpportunityError(error: unknown) {
  const value = error as ApiErrorShape | null
  const status = value?.status
  const code = value?.data?.error?.code
  const fallback =
    status === 401 ? 'Your session has expired. Please sign in again.'
    : status === 403 ? 'Only administrators can manage jobs and internships.'
    : status === 404 ? 'This opportunity could not be found.'
    : status === 409 ? 'This opportunity was changed by someone else. Reload and try again.'
    : status === 422 ? 'Some fields are invalid.'
    : 'Something went wrong. Please try again.'
  return {
    status,
    code,
    message: value?.data?.error?.message ?? fallback,
    issues: value?.data?.error?.issues ?? [],
  }
}

// Maps 422 `issues` to { field: message } for inline display next to inputs.
export function issuesToFieldErrors(issues: OpportunityIssue[]) {
  return Object.fromEntries(
    issues.filter((issue) => issue.field).map((issue) => [issue.field, issue.message]),
  ) as Record<string, string>
}
