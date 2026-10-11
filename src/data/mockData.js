export const communityStats = [
  { value: '24,500+', label: 'Meals Shared' },
  { value: '1,800+', label: 'Volunteers' },
  { value: '140+', label: 'Food Drives' },
  { value: '9,400+', label: 'Families Helped' },
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
    name: 'Midday Meal Drive',
    description: 'Providing fresh and nutritious meals to schoolchildren and daily wage workers every week.',
    location: 'Bangalore',
    target: '500 meals',
    completed: '340 meals',
    progress: 68,
    volunteers: 42,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Fresh Food Rescue',
    description: 'Recovering surplus food from restaurants and markets to distribute to vulnerable families.',
    location: 'Hosur',
    target: '1,200 kg',
    completed: '860 kg',
    progress: 72,
    volunteers: 31,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Emergency Relief Kit',
    description: 'Delivering staple food packs and essential nutrition support to families in crisis.',
    location: 'Mysuru',
    target: '250 kits',
    completed: '120 kits',
    progress: 52,
    volunteers: 27,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
  },
]

export const volunteerOpportunities = [
  {
    id: 1,
    title: 'Meal Packing Drive',
    location: 'Bangalore',
    date: '20 October 2026',
    volunteersNeeded: 50,
    registered: 32,
    category: 'Food Distribution',
  },
  {
    id: 2,
    title: 'Community Kitchen Support',
    location: 'Mysuru',
    date: '24 October 2026',
    volunteersNeeded: 30,
    registered: 18,
    category: 'Meal Service',
  },
  {
    id: 3,
    title: 'Mobile Food Delivery',
    location: 'Hubli',
    date: '28 October 2026',
    volunteersNeeded: 20,
    registered: 12,
    category: 'Logistics',
  },
  {
    id: 4,
    title: 'School Meal Support',
    location: 'Bengaluru',
    date: '03 November 2026',
    volunteersNeeded: 25,
    registered: 16,
    category: 'Education Support',
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
  { id: 1, message: 'Your meal request for Ward 7 is now under review.', read: false },
  { id: 2, message: 'You have been accepted for the Meal Packing Drive.', read: false },
  { id: 3, message: 'A fresh food donation has been assigned to your neighborhood.', read: true },
  { id: 4, message: 'A new food drive is available near you this weekend.', read: false },
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
