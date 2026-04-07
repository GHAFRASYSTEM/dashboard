export interface ExecutiveSocialLinks {
  twitter?: string
  linkedin?: string
  website?: string
}

export interface Executive {
  id: string
  name: string
  position: string
  department?: string
  email: string
  phone: string
  bio: string
  fullBio?: string
  image?: string
  status: 'active' | 'inactive'
  joinedAt: Date
  location?: string
  education?: string
  achievements?: string[]
  responsibilities?: string[]
  socialLinks?: ExecutiveSocialLinks
  yearsOfService?: number
  projectsLed?: number
  teamMembers?: number
}