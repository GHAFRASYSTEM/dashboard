import type { MediaGroup, MediaItem } from '../types/gallery'

export const mockMedia: MediaItem[] = [
  { id: '1', title: 'AGM 2024 – Opening Ceremony', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', type: 'image', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-15'), size: '2.4 MB' },
  { id: '2', title: 'Community Outreach Program', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', type: 'image', category: 'Community', uploadedBy: 'John Doe', uploadedAt: new Date('2024-03-14'), size: '1.8 MB' },
  { id: '3', title: 'Executive Board Meeting', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', type: 'image', category: 'Meetings', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-13'), size: '3.1 MB' },
  { id: '4', title: 'Member Appreciation Day', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', type: 'image', category: 'Events', uploadedBy: 'Sarah Smith', uploadedAt: new Date('2024-03-12'), size: '2.7 MB' },
  { id: '5', title: 'Youth Workshop', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', type: 'image', category: 'Training', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-11'), size: '1.5 MB' },
  { id: '6', title: 'Charity Fundraiser', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800', type: 'image', category: 'Events', uploadedBy: 'Mike Johnson', uploadedAt: new Date('2024-03-10'), size: '2.2 MB' },
  { id: '7', title: 'Sports Day 2024', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', type: 'image', category: 'Sports', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-09'), size: '4.0 MB' },
  { id: '8', title: 'Cultural Night Celebration', url: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800', type: 'image', category: 'Events', uploadedBy: 'Emily Brown', uploadedAt: new Date('2024-03-08'), size: '3.5 MB' },
  { id: '9', title: 'Health Screening Program', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800', type: 'image', category: 'Community', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-07'), size: '1.9 MB' },
  { id: '10', title: 'Leadership Training', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', type: 'image', category: 'Training', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-06'), size: '2.1 MB' },
  { id: '11', title: 'New Year Gathering', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', type: 'image', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-01-05'), size: '2.8 MB' },
  { id: '12', title: 'Annual Awards Ceremony', url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', type: 'image', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-02-20'), size: '3.3 MB' },
  { id: '13', title: 'AGM 2024 Highlights Reel', url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', type: 'video', category: 'Events', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-16'), size: '48.2 MB', duration: '3:42' },
  { id: '14', title: 'Community Day Recap', url: 'https://www.w3schools.com/html/movie.mp4', thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', type: 'video', category: 'Community', uploadedBy: 'John Doe', uploadedAt: new Date('2024-03-14'), size: '32.7 MB', duration: '2:15' },
  { id: '15', title: 'Youth Workshop Testimonials', url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', type: 'video', category: 'Training', uploadedBy: 'Admin', uploadedAt: new Date('2024-03-11'), size: '21.0 MB', duration: '1:58' },
]

export const mockGroups: MediaGroup[] = [
  {
    id: 'g1',
    title: 'AGM 2024 Full Coverage',
    description:
      'Complete photo and video coverage of the 2024 Annual General Meeting, including the opening ceremony, keynote speeches, and networking sessions.',
    items: ['1', '13', '4'],
    createdAt: new Date('2024-03-16'),
    createdBy: 'Admin',
    category: 'Events',
  },
  {
    id: 'g2',
    title: 'Community Programmes – March 2024',
    description:
      'Highlights from our community outreach and health screening programmes held throughout March 2024.',
    items: ['2', '9', '14'],
    createdAt: new Date('2024-03-15'),
    createdBy: 'John Doe',
    category: 'Community',
  },
]