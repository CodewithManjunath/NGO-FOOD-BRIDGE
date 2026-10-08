export const communityStats = [
  { value: '10,000+', label: 'Community Members' },
  { value: '2,500+', label: 'Volunteers' },
  { value: '350+', label: 'Projects' },
  { value: '8,000+', label: 'Problems Solved' },
]

export const reports = [
  {
    id: 'NGO-2026-00482',
    title: 'Broken Street Light',
    description: 'Street light near Market Road has been malfunctioning for over a week, increasing safety concerns for pedestrians.',
    category: 'Public Safety',
    location: 'Bangalore North',
    priority: 'High',
    status: 'In Progress',
    progress: 65,
    date: '2026-10-03',
    reportedBy: 'Aisha K.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'NGO-2026-00421',
    title: 'Garbage Overflow',
    description: 'Overflowing garbage bins near the bus stop are attracting stray animals and creating health issues.',
    category: 'Garbage',
    location: 'Jayanagar',
    priority: 'Medium',
    status: 'Assigned',
    progress: 40,
    date: '2026-10-01',
    reportedBy: 'Rohan P.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'NGO-2026-00399',
    title: 'Water Supply Issue',
    description: 'Residents have had inconsistent water pressure for two days and the main pipe is leaking.',
    category: 'Water Problems',
    location: 'Whitefield',
    priority: 'High',
    status: 'Under Review',
    progress: 20,
    date: '2026-09-28',
    reportedBy: 'Maya S.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  },
]

export const projects = [
  {
    id: 1,
    name: 'Clean Community Initiative',
    description: 'A neighborhood cleanup campaign to improve public spaces and reduce waste across the city.',
    location: 'Bangalore',
    target: '100 streets',
    completed: '68 streets',
    progress: 68,
    volunteers: 42,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'School Support Network',
    description: 'Providing learning kits, mentorship, and digital support to children in underserved schools.',
    location: 'Hosur',
    target: '12 schools',
    completed: '8 schools',
    progress: 72,
    volunteers: 31,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Healthcare Outreach',
    description: 'Free health screening and wellness support for vulnerable families in remote communities.',
    location: 'Mysuru',
    target: '4 clinics',
    completed: '2 clinics',
    progress: 52,
    volunteers: 27,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  },
]

export const volunteerOpportunities = [
  {
    id: 1,
    title: 'Tree Plantation Drive',
    location: 'Bangalore',
    date: '20 October 2026',
    volunteersNeeded: 50,
    registered: 32,
    category: 'Environment',
  },
  {
    id: 2,
    title: 'Food Distribution',
    location: 'Mysuru',
    date: '24 October 2026',
    volunteersNeeded: 30,
    registered: 18,
    category: 'Food Distribution',
  },
  {
    id: 3,
    title: 'Medical Camp',
    location: 'Hubli',
    date: '28 October 2026',
    volunteersNeeded: 20,
    registered: 12,
    category: 'Healthcare',
  },
  {
    id: 4,
    title: 'School Support',
    location: 'Bengaluru',
    date: '03 November 2026',
    volunteersNeeded: 25,
    registered: 16,
    category: 'Education',
  },
]

export const users = [
  {
    id: 'u1',
    name: 'Aisha Kumar',
    email: 'aisha@example.com',
    role: 'user',
    location: 'Bangalore',
    phone: '+91 98765 43210',
  },
  {
    id: 'u2',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    role: 'user',
    location: 'Mysuru',
    phone: '+91 98765 11111',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@ngo.org',
    role: 'admin',
    location: 'Head Office',
    phone: '+91 91234 56789',
  },
]

export const notifications = [
  { id: 1, message: 'Your report NGO-2026-00482 is now under review.', read: false },
  { id: 2, message: 'You have been accepted for Tree Plantation Drive.', read: false },
  { id: 3, message: 'Your reported street-light problem has been resolved.', read: true },
  { id: 4, message: 'A new volunteer opportunity is available near you.', read: false },
]

export const donations = [
  { id: 1, donor: 'Anonymous', amount: 1500, campaign: 'Education Fund', date: '2026-10-02' },
  { id: 2, donor: 'R. Mehta', amount: 5000, campaign: 'Healthcare', date: '2026-10-01' },
  { id: 3, donor: 'K. Nair', amount: 2500, campaign: 'Environmental Action', date: '2026-09-30' },
]

export const campaigns = [
  { id: 1, name: 'Back to School Drive', location: 'Bangalore', status: 'Active' },
  { id: 2, name: 'Clean Rivers Campaign', location: 'Mysuru', status: 'Upcoming' },
  { id: 3, name: 'Winter Care Kit', location: 'Hubli', status: 'Active' },
]

export const impactMetrics = [
  { value: 8452, label: 'People Helped' },
  { value: 3284, label: 'Problems Reported' },
  { value: 2917, label: 'Problems Resolved' },
  { value: 1248, label: 'Active Volunteers' },
  { value: 126, label: 'Community Projects' },
]

export const categories = ['Garbage', 'Road Damage', 'Street Lights', 'Water Problems', 'Public Safety', 'Education', 'Healthcare', 'Environment', 'Homelessness', 'Other']

export const defaultProfile = {
  name: 'Aisha Kumar',
  email: 'aisha@example.com',
  phone: '+91 98765 43210',
  location: 'Bangalore',
  skills: 'Project coordination, community outreach',
  availability: 'Weekends',
}
