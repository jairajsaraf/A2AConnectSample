'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardCard from "@/components/DashboardCard";

interface UserData {
  userId: string;
  email: string;
  name: string;
  major_program?: string;
  grad_year?: string;
  role: string;
}

interface Registration {
  registration_id: string;
  time_stamp: string;
  event_name: string;
  event_id: string;
  student_name: string;
  student_email: string;
  review_status: string;
  status: string;
}

interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  description: string;
  capacity: number;
  registered_count: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchDashboardData(parsedUser.email);
  }, [router]);

  const fetchDashboardData = async (email: string) => {
    try {
      // Fetch user's registrations
      const regResponse = await fetch(`/api/registrations?email=${encodeURIComponent(email)}`);
      const regData = await regResponse.json();

      if (regData.success) {
        setRegistrations(regData.data);
      }

      // Fetch all events
      const eventsResponse = await fetch('/api/events');
      const eventsData = await eventsResponse.json();

      if (eventsData.success) {
        setEvents(eventsData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Simple, consistent date parsing (same behavior as Events page)
  const parseEventDate = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  // Calculate stats from real data
  const totalRegistrations = registrations.length;
  const pendingReviews = registrations.filter(
    (r) => r.review_status === "Pending"
  ).length;

  // Use "from today onward" as upcoming
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneWeekFromNow = new Date(startOfToday);
  oneWeekFromNow.setDate(startOfToday.getDate() + 7);

  // Count all future events (today and later) with valid dates
  const upcomingEvents = events.filter((e) => {
    const eventDate = parseEventDate(e.event_date);
    return !isNaN(eventDate.getTime()) && eventDate >= startOfToday;
  }).length;

// 🔹 Make first name nicely capitalized
  const rawFirstName = (user.name || '').trim().split(/\s+/)[0] || '';
  const firstName =
    rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase();
  // Get events happening in the next 7 days
  const upcomingWeekEvents = events
    .filter((e) => {
      const eventDate = parseEventDate(e.event_date);
      return (
        !isNaN(eventDate.getTime()) &&
        eventDate >= startOfToday &&
        eventDate <= oneWeekFromNow
      );
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a.event_date);
      const dateB = parseEventDate(b.event_date);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-white">
          Hello, {firstName}! 👋
        </h1>
        <p className="text-aggie-gray-light mt-2">
          Here's what's happening with your activities
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Upcoming Events"
          value={upcomingEvents}
          icon="📅"
          subtitle="Available to register"
        />
        <DashboardCard
          title="My Registrations"
          value={totalRegistrations}
          icon="📝"
          subtitle="Total registered"
        />
        <DashboardCard
          title="Pending Reviews"
          value={pendingReviews}
          icon="⏳"
          subtitle="Awaiting GA approval"
        />
      </div>

      {/* Quick actions - glassy */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)] p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/events"
            className="flex items-center gap-3 p-5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-aggie-maroon transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="font-semibold text-white">Browse Events</p>
              <p className="text-sm text-[#b0b0b0]">Find your next opportunity</p>
            </div>
          </a>

          <a
            href="/my-registrations"
            className="flex items-center gap-3 p-5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-aggie-maroon transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="font-semibold text-white">My Registrations</p>
              <p className="text-sm text-[#b0b0b0]">View registration status</p>
            </div>
          </a>

          <a
            href="/mentorship"
            className="flex items-center gap-3 p-5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-aggie-maroon transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">🤝</span>
            </div>
            <div>
              <p className="font-semibold text-white">Mentorship</p>
              <p className="text-sm text-[#b0b0b0]">Connect with mentors</p>
            </div>
          </a>
        </div>
      </div>

      {/* This Week's Events */}
      <div className="rounded-xl p-6 border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <h2 className="text-xl font-semibold text-white mb-6">This Week's Events</h2>

        {upcomingWeekEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#b0b0b0] mb-4">No events scheduled for this week</p>
            <a
              href="/events"
              className="inline-block px-6 py-3 bg-aggie-maroon text-white rounded-xl hover:bg-aggie-dark_maroon font-semibold transition-all"
            >
              Browse All Events
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingWeekEvents.map((event) => {
              const registration = registrations.find(
                (r) => r.event_id === event.event_id
              );
              const eventDate = parseEventDate(event.event_date);

              return (
                <div
                  key={event.event_id}
                  className="flex items-center justify-between p-5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/12 hover:border-aggie-maroon hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">
                      {event.event_name}
                    </h3>
                    <p className="text-sm text-[#b0b0b0] mt-2 flex items-center gap-2">
                      <span>📅</span>
                      {!isNaN(eventDate.getTime())
                        ? eventDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : event.event_date}
                    </p>
                    <p className="text-sm text-[#d0d0d0] mt-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {registration ? (
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/40">
                        Registered ✓
                      </span>
                    ) : (
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-[#e0e0e0] border border-white/30">
                        {event.registered_count}/{event.capacity} spots
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
