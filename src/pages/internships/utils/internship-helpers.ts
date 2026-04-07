import type { Internship } from '../types/internship'

export const filterInternships = (
  internships: Internship[],
  searchQuery: string,
  statusFilter: string,
  contractFilter: string,
  typeFilter: string
) => {
  const query = searchQuery.trim().toLowerCase()

  return internships.filter((internship) => {
    const matchesSearch =
      query === '' ||
      internship.title.toLowerCase().includes(query) ||
      internship.company.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === 'all' || internship.status === statusFilter

    const matchesType =
      typeFilter === 'all' || internship.type === typeFilter

    const matchesContract =
      contractFilter === 'all' || internship.contractType === contractFilter

    return matchesSearch && matchesStatus && matchesType && matchesContract
  })
}

export const getInternshipStats = (internships: Internship[]) => {
  return {
    total: internships.length,
    active: internships.filter((internship) => internship.status === 'active').length,
    pending: internships.filter((internship) => internship.status === 'pending').length,
    totalApplications: internships.reduce(
      (sum, internship) => sum + internship.applications,
      0
    ),
  }
}