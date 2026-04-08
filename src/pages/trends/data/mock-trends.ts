import type { Trend } from '../types/trends'

export const mockTrends: Trend[] = [
  {
    id: '1',
    title: 'Community Meetup 2024',
    summary:
      'Join us for our annual community gathering — a day of connection, celebration, and collaboration.',
    content:
      'Join us for our annual community gathering where members from across the region come together...',
    author: 'Admin',
    status: 'published',
    views: 1250,
    images: [],
    links: [{ label: 'Event Page', url: 'https://example.com/meetup' }],
    createdAt: new Date('2024-03-15'),
    category: 'Events',
  },
  {
    id: '2',
    title: 'New Partnership Announcement',
    summary:
      'We are thrilled to announce a strategic partnership that will expand opportunities for all members.',
    content:
      'Exciting news about our new partnership with leading organizations in the community...',
    author: 'John Doe',
    status: 'published',
    views: 890,
    images: [],
    links: [
      { label: 'Press Release', url: 'https://example.com/press' },
      { label: 'Partner Website', url: 'https://example.com/partner' },
    ],
    createdAt: new Date('2024-03-14'),
    category: 'Business',
  },
  {
    id: '3',
    title: 'Upcoming Events March',
    summary:
      "Check out what's happening this month — workshops, socials, and more lined up for the community.",
    content:
      "Check out what's happening this month across all our branches and chapters...",
    author: 'Sarah Smith',
    status: 'draft',
    views: 0,
    images: [],
    links: [],
    createdAt: new Date('2024-03-13'),
    category: 'Events',
  },
  {
    id: '4',
    title: 'Member Spotlight: Success Stories',
    summary:
      "Celebrating our members' achievements and the milestones they have reached this quarter.",
    content:
      'Celebrating our members achievements and the incredible milestones they have reached...',
    author: 'Admin',
    status: 'published',
    views: 567,
    images: [],
    links: [],
    createdAt: new Date('2024-03-12'),
    category: 'Community',
  },
  {
    id: '5',
    title: 'Health & Wellness Tips',
    summary:
      'Practical tips and insights for maintaining your wellbeing shared by our wellness committee.',
    content:
      'Tips for maintaining your wellbeing from our dedicated wellness committee...',
    author: 'Emily Brown',
    status: 'pending',
    views: 0,
    images: [],
    links: [{ label: 'Wellness Resources', url: 'https://example.com/wellness' }],
    createdAt: new Date('2024-03-11'),
    category: 'Health',
  },
]