export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  location: string
  address?: string
  membershipId: string
  status: 'active' | 'inactive' | 'pending'
  position?: string
  department?: string
  bio?: string
  joinedAt: Date
  lastPayment?: Date
  image?: string
  dateOfBirth?: Date
  occupation?: string
  employer?: string
  emergencyContact?: EmergencyContact
}

export interface Contribution {
  id: string
  type: string
  amount: number
  date: Date
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export interface Activity {
  id: string
  action: string
  description: string
  date: Date
}