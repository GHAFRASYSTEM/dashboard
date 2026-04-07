export interface Contribution {
  id: string
  memberId: string
  memberName: string
  amount: number
  month: string
  year: number
  status: 'paid' | 'pending' | 'overdue'
  paidAt?: Date
  reference?: string
}