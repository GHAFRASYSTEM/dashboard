import type { FinanceIssue } from '../types/finance'

type ApiErrorShape = {
  status?: number
  data?: { error?: { message?: string; issues?: FinanceIssue[] } }
}

export function getFinanceError(error: unknown) {
  const value = error as ApiErrorShape | null
  const status = value?.status
  const fallback =
    status === 401 ? 'Your session has expired. Please sign in again.'
    : status === 403 ? 'You do not have permission to view finance.'
    : status === 404 ? 'This record could not be found.'
    : status === 400 ? 'Some filters are invalid.'
    : status === 413 ? 'The receipt file is too large (max 5 MB).'
    : status === 415 ? 'Unsupported receipt type. Use PDF, JPG or PNG.'
    : 'Something went wrong. Please try again.'
  return {
    status,
    message: value?.data?.error?.message ?? fallback,
    issues: value?.data?.error?.issues ?? [],
  }
}

// Maps 422 `issues` to { field: message } for inline display next to inputs.
export function issuesToFieldErrors(issues: FinanceIssue[]) {
  return Object.fromEntries(issues.map((issue) => [issue.field, issue.message])) as Record<string, string>
}
