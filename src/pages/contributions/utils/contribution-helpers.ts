import type { Contribution } from '../types/contribution'

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const getContributionStats = (contributions: Contribution[]) => {
  const paidCount = contributions.filter((c) => c.status === 'paid').length
  const pendingCount = contributions.filter((c) => c.status === 'pending').length
  const overdueCount = contributions.filter((c) => c.status === 'overdue').length

  const totalCollected = contributions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0)

  const outstanding = contributions
    .filter((c) => c.status === 'pending' || c.status === 'overdue')
    .reduce((sum, c) => sum + c.amount, 0)

  const collectionRate =
    contributions.length > 0
      ? Math.round((paidCount / contributions.length) * 100)
      : 0

  return {
    paidCount,
    pendingCount,
    overdueCount,
    totalCollected,
    outstanding,
    collectionRate,
  }
}