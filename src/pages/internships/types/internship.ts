export interface Internship {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  type: 'remote' | 'onsite' | 'hybrid'
  contractType: 'internship' | 'fulltime' | 'alternance'
  duration: string
  stipend?: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: string[]
  status: 'active' | 'inactive' | 'pending'
  applications: number
  postedAt: Date
  deadline: Date
  contactEmail?: string
  contactPhone?: string
  website?: string
  department?: string
}