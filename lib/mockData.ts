import { EventRegistration, Event, Person, MentorshipRequest } from '@/types';

// Mock current user
export const CURRENT_USER = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  avatar_url: null,
};

// Mock events
export const MOCK_EVENTS: Event[] = [
  {
    event_id: 'E001',
    event_name: 'Career Fair 2025',
    event_date: '2025-12-15',
    description: 'Annual career fair with top tech companies',
    capacity: 200,
    registered_count: 156,
  },
  {
    event_id: 'E002',
    event_name: 'Networking Mixer',
    event_date: '2025-12-20',
    description: 'Connect with alumni and industry professionals',
    capacity: 50,
    registered_count: 42,
  },
  {
    event_id: 'E003',
    event_name: 'Workshop: Resume Building',
    event_date: '2025-12-10',
    description: 'Learn to craft the perfect resume',
    capacity: 30,
    registered_count: 30,
  },
];

// Mock registrations for current user
export const MOCK_USER_REGISTRATIONS: EventRegistration[] = [
  {
    registration_id: 'R1708',
    time_stamp: '2025-11-15T10:30:00Z',
    event_name: 'Career Fair 2025',
    event_id: 'E001',
    student_name: 'Sarah Johnson',
    student_email: 'sarah.johnson@university.edu',
    major_program: 'Computer Science',
    grad_year: '2026',
    interests: 'Software Engineering, AI/ML',
    wants_mentor: 'Yes',
    mentor_preferences: 'Senior engineer in ML/AI',
    entry_number: 1708,
    needs_review: true,
    review_status: 'Pending',
    status: 'Registered',
    email_sent: true,
  },
  {
    registration_id: 'R2070',
    time_stamp: '2025-11-20T14:15:00Z',
    event_name: 'Networking Mixer',
    event_id: 'E002',
    student_name: 'Sarah Johnson',
    student_email: 'sarah.johnson@university.edu',
    major_program: 'Computer Science',
    grad_year: '2026',
    interests: 'Software Engineering, AI/ML',
    wants_mentor: 'No',
    entry_number: 2070,
    needs_review: false,
    review_status: 'Approved',
    status: 'Registered',
    email_sent: true,
  },
];

// Mock people directory
export const MOCK_PEOPLE: Person[] = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    major_program: 'Computer Science',
    grad_year: '2026',
    interests: ['Software Engineering', 'AI/ML'],
  },
  {
    id: 'P002',
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    major_program: 'Data Science',
    grad_year: '2025',
    interests: ['Data Analytics', 'Machine Learning'],
  },
];

// Mock mentorship requests
export const MOCK_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 'M001',
    student_email: 'sarah.johnson@university.edu',
    student_name: 'Sarah Johnson',
    mentor_preferences: 'Senior engineer in ML/AI',
    status: 'Pending',
  },
];
