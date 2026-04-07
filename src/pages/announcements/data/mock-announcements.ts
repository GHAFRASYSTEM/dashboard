import type { Announcement } from '../types/announcement'

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Annual General Meeting 2024',
    content: `We are pleased to announce the Annual General Meeting for 2024. This is an important event for all members of our organization.

**Meeting Details:**
- **Date:** March 25, 2024
- **Time:** 10:00 AM - 2:00 PM
- **Venue:** Grand Conference Hall, Building A

**Agenda:**
1. Welcome address by the Chairman
2. Review of the previous year's minutes
3. Financial report presentation
4. Performance review and achievements
5. Election of new board members
6. Open forum for member questions
7. Closing remarks

**Important Notes:**
- All members are encouraged to attend
- Please bring your membership ID for verification
- Refreshments will be served after the meeting
- Parking is available in the basement

We look forward to seeing you there and appreciate your continued support and participation in our organization's growth.

For any questions or special accommodations, please contact the administrative office at admin@example.com or call (555) 123-4567.`,
    author: 'John Admin',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    authorRole: 'Administrator',
    status: 'published',
    priority: 'high',
    audience: 'all',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=600&fit=crop',
    ],
    publishedAt: new Date('2024-03-15'),
    createdAt: new Date('2024-03-15'),
    views: 1247,
    likes: 89,
    comments: [
      {
        id: 'c1',
        author: 'Sarah Miller',
        authorAvatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        content:
          'Looking forward to attending! Will there be virtual attendance options available?',
        createdAt: new Date('2024-03-16'),
      },
      {
        id: 'c2',
        author: 'Michael Chen',
        authorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Great initiative! The agenda looks comprehensive.',
        createdAt: new Date('2024-03-16'),
      },
    ],
  },
  {
    id: '2',
    title: 'System Maintenance Notice',
    content: `**Important System Maintenance Scheduled**

We would like to inform all users that our systems will undergo scheduled maintenance to improve performance and security.

**Maintenance Window:**
- **Date:** Saturday, March 23, 2024
- **Time:** 2:00 AM - 6:00 AM (EST)
- **Duration:** Approximately 4 hours

**Affected Services:**
- User portal and dashboard
- API services
- File storage and downloads
- Email notifications

**What to Expect:**
During this maintenance window, all services will be temporarily unavailable. Users will not be able to log in or access any features. Any ongoing sessions will be terminated at the start of maintenance.

**Recommendations:**
1. Save all work before the maintenance window
2. Download any urgent files beforehand
3. Plan any time-sensitive tasks around the maintenance period

**Post-Maintenance:**
After maintenance is complete, you may need to:
- Clear your browser cache
- Log in again to your account
- Refresh any bookmarked pages

We apologize for any inconvenience this may cause and appreciate your patience as we work to improve our services.

For urgent matters during maintenance, please contact our emergency support line.`,
    author: 'Tech Team',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    authorRole: 'IT Department',
    status: 'published',
    priority: 'medium',
    audience: 'all',
    images: [],
    publishedAt: new Date('2024-03-14'),
    createdAt: new Date('2024-03-14'),
    views: 892,
    likes: 23,
    comments: [],
  },
  {
    id: '3',
    title: 'New Member Benefits Program',
    content: `We are excited to announce the launch of our new Member Benefits Program, designed to reward our valued members with exclusive perks and privileges.

**Program Highlights:**

**Gold Tier Benefits:**
- 15% discount on all services
- Priority customer support
- Early access to new features
- Monthly newsletter with exclusive content

**Platinum Tier Benefits:**
- All Gold benefits, plus:
- 25% discount on all services
- Dedicated account manager
- Free premium features for 3 months
- Invitation to exclusive member events

**How to Qualify:**
- Gold Tier: Active membership for 6+ months
- Platinum Tier: Active membership for 12+ months

Check your email for personalized details on activating your benefits.`,
    author: 'Sarah Manager',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    authorRole: 'Marketing Manager',
    status: 'draft',
    priority: 'low',
    audience: 'members',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    ],
    createdAt: new Date('2024-03-13'),
    views: 0,
    likes: 0,
    comments: [],
  },
]