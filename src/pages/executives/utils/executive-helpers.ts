import type { Executive } from '../types/executive'

export const getExecutiveInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const filterExecutives = (executives: Executive[], search: string) => {
  const query = search.trim().toLowerCase()

  return executives.filter((executive) => {
    if (!query) return true

    return (
      executive.name.toLowerCase().includes(query) ||
      executive.position.toLowerCase().includes(query)
    )
  })
}

export const getExecutiveStats = (executives: Executive[]) => {
  return {
    total: executives.length,
    active: executives.filter((e) => e.status === 'active').length,
    inactive: executives.filter((e) => e.status === 'inactive').length,
  }
}