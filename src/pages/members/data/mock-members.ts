import type { Activity, Contribution, Member } from '../types/members'

export const positionOptions = [
  'Board Chairman',
  'Vice Chairman',
  'Secretary',
  'Assistant Secretary',
  'Treasurer',
  'Financial Secretary',
  'Welfare Officer',
  'Events Coordinator',
  'PRO',
  'Organizing Secretary',
  'Member',
]

export const departmentOptions = [
  'Executive',
  'Administration',
  'Finance',
  'Welfare',
  'Events',
  'Communications',
  'Technical',
  'General',
]

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Kwame Asante',
    email: 'kwame.asante@email.com',
    phone: '+233 24 111 2222',
    location: 'Accra',
    address: '123 Independence Avenue, East Legon, Accra',
    membershipId: 'GAF-001',
    status: 'active',
    position: 'Board Chairman',
    department: 'Executive',
    bio: 'Experienced leader with over 15 years in community development and organizational management.',
    joinedAt: new Date('2022-01-15'),
    lastPayment: new Date('2024-03-01'),
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    dateOfBirth: new Date('1985-06-15'),
    occupation: 'Business Consultant',
    employer: 'Asante Consulting Group',
    emergencyContact: {
      name: 'Akua Asante',
      phone: '+233 24 999 8888',
      relationship: 'Spouse',
    },
  },
  {
    id: '2',
    name: 'Ama Serwaa',
    email: 'ama.serwaa@email.com',
    phone: '+233 24 222 3333',
    location: 'Kumasi',
    membershipId: 'GAF-002',
    status: 'active',
    position: 'Secretary',
    department: 'Administration',
    bio: 'Detail-oriented professional dedicated to maintaining organizational excellence.',
    joinedAt: new Date('2022-02-20'),
    lastPayment: new Date('2024-03-05'),
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
]

export const mockContributions: Contribution[] = [
  {
    id: '1',
    type: 'Monthly Dues',
    amount: 100,
    date: new Date('2024-03-01'),
    status: 'completed',
    reference: 'TXN-001234',
  },
  {
    id: '2',
    type: 'Special Levy',
    amount: 500,
    date: new Date('2024-02-15'),
    status: 'completed',
    reference: 'TXN-001189',
  },
]

export const mockActivities: Activity[] = [
  {
    id: '1',
    action: 'Payment Received',
    description: 'Monthly dues payment of GHS 100',
    date: new Date('2024-03-01'),
  },
  {
    id: '2',
    action: 'Profile Updated',
    description: 'Updated contact information',
    date: new Date('2024-02-28'),
  },
]