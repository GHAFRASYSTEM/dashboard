// Moderator access is an open item in the spec; only admins see finance for now.
export function isFinanceAdmin(user: { role?: string } | null | undefined) {
  return user?.role?.toLowerCase() === 'admin'
}
