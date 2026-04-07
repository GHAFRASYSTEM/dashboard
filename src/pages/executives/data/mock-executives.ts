import type { Executive } from '../types/executive'

export const mockExecutives: Executive[] = [
  {
    id: '1',
    name: 'Dr. James Mensah',
    position: 'President',
    department: 'Executive Board',
    email: 'president@gafra.org',
    phone: '+233 24 123 4567',
    bio: 'Leading the organization since 2020 with a vision for community growth...',
    fullBio: `Dr. James Mensah is a distinguished leader with over 20 years of experience in community development and organizational management. He has been instrumental in transforming GAFRA into a leading community organization.

His leadership style emphasizes collaboration, transparency, and sustainable growth. Under his guidance, the organization has achieved remarkable milestones including expanding membership by 150%, launching 5 major community initiatives, and establishing partnerships with international organizations.

Dr. Mensah holds a PhD in Community Development from the University of Ghana and has served on various national committees for community welfare. His vision for GAFRA is to create a self-sustaining community that empowers every member to achieve their full potential.`,
    status: 'active',
    joinedAt: new Date('2020-01-15'),
    location: 'Accra, Ghana',
    education: 'PhD in Community Development, University of Ghana',
    achievements: [
      'Expanded organization membership by 150%',
      'Launched 5 major community initiatives',
      'Established international partnerships',
      'Received Community Leadership Award 2023',
      'Published research on sustainable community development',
    ],
    responsibilities: [
      'Oversee all organizational operations and strategic direction',
      'Chair executive board meetings and general assemblies',
      'Represent the organization in external engagements',
      'Ensure compliance with organizational policies',
      'Lead fundraising and partnership development efforts',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/jmensah',
      linkedin: 'https://linkedin.com/in/jmensah',
      website: 'https://jmensah.com',
    },
    yearsOfService: 6,
    projectsLed: 12,
    teamMembers: 45,
  },
  {
    id: '2',
    name: 'Mrs. Grace Osei',
    position: 'Vice President',
    department: 'Executive Board',
    email: 'vp@gafra.org',
    phone: '+233 24 234 5678',
    bio: 'Dedicated to member welfare and community development programs...',
    fullBio: `Mrs. Grace Osei brings a wealth of experience in social work and community engagement to her role as Vice President. Her dedication to member welfare has been the cornerstone of many successful programs within GAFRA.

With a background in social work and public administration, Grace has spearheaded numerous initiatives focused on education, health, and economic empowerment. She is particularly passionate about women and youth development programs.

Her approach to leadership is centered on empathy, active listening, and creating inclusive spaces for all community members to thrive.`,
    status: 'active',
    joinedAt: new Date('2020-01-15'),
    location: 'Accra, Ghana',
    education: 'Masters in Social Work, University of Cape Coast',
    achievements: [
      'Established the Women Empowerment Program',
      'Launched youth mentorship initiative',
      'Coordinated 20+ community outreach events',
      'Received Social Impact Award 2022',
    ],
    responsibilities: [
      'Support the President in organizational leadership',
      'Oversee member welfare and support programs',
      'Coordinate community development initiatives',
      'Lead the membership engagement committee',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/graceosei',
    },
    yearsOfService: 6,
    projectsLed: 8,
    teamMembers: 20,
  },
  {
    id: '3',
    name: 'Mr. Kofi Asante',
    position: 'General Secretary',
    department: 'Administration',
    email: 'secretary@gafra.org',
    phone: '+233 24 345 6789',
    bio: 'Managing organizational records and communications...',
    fullBio: `Mr. Kofi Asante serves as the General Secretary, ensuring smooth administrative operations and effective communication across all levels of the organization.

With his meticulous attention to detail and organizational skills, Kofi has transformed the administrative processes, implementing digital record-keeping systems and streamlined communication channels.

He believes in transparency and accessibility, making sure all members are well-informed about organizational activities and decisions.`,
    status: 'active',
    joinedAt: new Date('2021-03-20'),
    location: 'Tema, Ghana',
    education: 'Bachelor in Business Administration, GIMPA',
    achievements: [
      'Implemented digital record management system',
      'Improved member communication efficiency by 80%',
      'Organized 15+ successful general meetings',
    ],
    responsibilities: [
      'Maintain organizational records and documentation',
      'Coordinate internal and external communications',
      'Organize meetings and prepare minutes',
      'Manage correspondence and official documents',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/kofiasante',
    },
    yearsOfService: 5,
    projectsLed: 5,
    teamMembers: 8,
  },
  {
    id: '4',
    name: 'Mrs. Ama Boateng',
    position: 'Treasurer',
    department: 'Finance',
    email: 'treasurer@gafra.org',
    phone: '+233 24 456 7890',
    bio: 'Overseeing financial operations and member contributions...',
    fullBio: `Mrs. Ama Boateng manages the financial health of GAFRA with exceptional expertise and integrity. Her financial acumen has ensured the organization maintains strong fiscal responsibility.

As a certified accountant with experience in both corporate and non-profit sectors, Ama has implemented robust financial systems that ensure transparency and accountability in all financial matters.

She is committed to maximizing the impact of every contribution made by members, ensuring funds are utilized effectively for community benefit.`,
    status: 'active',
    joinedAt: new Date('2021-03-20'),
    location: 'Accra, Ghana',
    education: 'Chartered Accountant (ICAG), MBA Finance',
    achievements: [
      'Achieved 100% financial audit compliance',
      'Increased organizational savings by 40%',
      'Implemented transparent financial reporting system',
      'Secured 3 major grants for community projects',
    ],
    responsibilities: [
      'Manage all financial operations and budgets',
      'Oversee member dues and contributions',
      'Prepare financial reports and statements',
      'Ensure compliance with financial regulations',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amaboateng',
    },
    yearsOfService: 5,
    projectsLed: 4,
    teamMembers: 6,
  },
  {
    id: '5',
    name: 'Mr. Kwame Adjei',
    position: 'Organizing Secretary',
    department: 'Events & Activities',
    email: 'organizing@gafra.org',
    phone: '+233 24 567 8901',
    bio: 'Coordinating events and member activities...',
    fullBio: `Mr. Kwame Adjei brings energy and creativity to his role as Organizing Secretary. He is responsible for planning and executing all organizational events and activities.

With a background in event management and community organizing, Kwame has successfully coordinated numerous memorable events that have strengthened community bonds and increased member engagement.

His innovative approach to event planning ensures each gathering is meaningful, well-organized, and leaves lasting positive impressions.`,
    status: 'active',
    joinedAt: new Date('2022-01-10'),
    location: 'Kumasi, Ghana',
    education: 'Diploma in Event Management, BlueCrest College',
    achievements: [
      'Organized 30+ successful community events',
      'Increased event attendance by 200%',
      'Launched annual community festival',
      'Created volunteer engagement program',
    ],
    responsibilities: [
      'Plan and coordinate all organizational events',
      'Manage event logistics and vendors',
      'Coordinate volunteer activities',
      'Develop annual events calendar',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/kwameadjei',
    },
    yearsOfService: 4,
    projectsLed: 30,
    teamMembers: 15,
  },
  {
    id: '6',
    name: 'Ms. Efua Mensah',
    position: 'PRO',
    department: 'Communications',
    email: 'pro@gafra.org',
    phone: '+233 24 678 9012',
    bio: 'Managing public relations and media communications...',
    fullBio: `Ms. Efua Mensah serves as the Public Relations Officer, managing the organization's public image and communications strategy. Her expertise in media relations has significantly raised GAFRA's profile.

With a journalism background and experience in corporate communications, Efua has built strong relationships with media outlets and developed effective communication strategies that keep both members and the public well-informed.

She is passionate about storytelling and uses various platforms to share the impact and stories of GAFRA's community work.`,
    status: 'active',
    joinedAt: new Date('2022-01-10'),
    location: 'Accra, Ghana',
    education: 'Bachelor in Mass Communication, GIJ',
    achievements: [
      'Increased social media following by 500%',
      'Secured 20+ media features for the organization',
      'Launched organizational newsletter',
      'Developed brand guidelines and materials',
    ],
    responsibilities: [
      'Manage public relations and media engagement',
      'Develop and implement communication strategies',
      'Handle social media and digital presence',
      'Coordinate press releases and media coverage',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/efuamensah',
      linkedin: 'https://linkedin.com/in/efuamensah',
      website: 'https://efuamensah.com',
    },
    yearsOfService: 4,
    projectsLed: 15,
    teamMembers: 10,
  },
]