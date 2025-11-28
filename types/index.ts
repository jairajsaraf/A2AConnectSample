// Core data types matching Google Sheets schema

export interface EventRegistration {
  registration_id: string;
  time_stamp: string;
  event_name: string;
  event_id?: string;
  student_name: string;
  student_email: string;
  major_program: string;
  grad_year: string;
  interests: string;
  wants_mentor: 'Yes' | 'No';
  mentor_preferences?: string;
  entry_number: number;
  needs_review: boolean;
  review_status: 'Pending' | 'Approved' | 'Rejected';
  status: 'Registered' | 'Waitlisted' | 'Cancelled';
  email_sent: boolean;
}

export interface ReviewQueueItem {
  registration_id: string;
  student_name: string;
  student_email: string;
  event_name: string;
  major_program: string;
  grad_year: string;
  interests: string;
  needs_review: boolean;
  approved?: boolean;
  review_notes?: string;
  reviewed_at?: string;
  processed: boolean;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  major_program: string;
  grad_year: string;
  interests: string[];
}

export interface MentorshipRequest {
  id: string;
  student_email: string;
  student_name: string;
  mentor_preferences: string;
  status: 'Pending' | 'Matched' | 'Declined';
  matched_mentor?: string;
}

export interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  description: string;
  capacity: number;
  registered_count: number;
}
