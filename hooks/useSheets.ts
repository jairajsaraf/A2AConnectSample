'use client';

import { useState, useEffect, useCallback } from 'react';

// Types matching your Google Sheets structure
export interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  description: string;
  capacity: number;
  registered_count: number;
}

export interface Registration {
  registration_id: string;
  time_stamp: string;
  event_name: string;
  event_id: string;
  student_name: string;
  student_email: string;
  major_program: string;
  grad_year: string;
  interests: string;
  wants_mentor: string;
  mentor_preferences: string;
  needs_review: string;
  review_status: string;
  status: string;
  email_sent: string;
}

export interface MentorshipRequest {
  request_id: string;
  student_email: string;
  interest_industry: string;
  career_goal: string;
  status: string;
  matched_mentor_id: string;
  suggested_mentor: string;
  created_at: string;
}

export interface Mentor {
  mentor_id: string;
  mentor_name: string;
  email: string;
  industry: string;
  company: string;
  role: string;
}

// Hook for fetching events
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error };
}

// Hook for fetching user's registrations
export function useRegistrations(userEmail: string) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!userEmail) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/registrations?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { registrations, loading, error, refetch };
}

// Hook for fetching mentorship status
export function useMentorship(userEmail: string) {
  const [mentorshipData, setMentorshipData] = useState<{
    request: MentorshipRequest | null;
    matchedMentor: Mentor | null;
    availableIndustries: string[];
  }>({ request: null, matchedMentor: null, availableIndustries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!userEmail) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/mentorship?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setMentorshipData(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch mentorship status');
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...mentorshipData, loading, error, refetch };
}

// Hook for registering to an event
export function useRegisterForEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: {
    event_name: string;
    student_name: string;
    student_email: string;
    major_program: string;
    grad_year: string;
    interests?: string;
    wants_mentor?: string;
    mentor_preferences?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        setError(result.error);
        return null;
      }
      
      return result.data;
    } catch (err) {
      setError('Failed to register');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}

// Hook for requesting mentorship
export function useRequestMentorship() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestMentorship = async (data: {
    student_email: string;
    interest_industry: string;
    career_goal?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        setError(result.error);
        return null;
      }
      
      return result.data;
    } catch (err) {
      setError('Failed to request mentorship');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { requestMentorship, loading, error };
}
