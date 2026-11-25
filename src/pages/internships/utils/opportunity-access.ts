// Mirrors the backend: every /opportunities/admin endpoint requires role = 'admin'.
export function canManageOpportunities(user: { role?: string } | null | undefined) {
  return user?.role?.toLowerCase() === 'admin'
}
