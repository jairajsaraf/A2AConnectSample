'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  userId: string;
  email: string;
  name: string;
  role: string;
}

interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  description: string;
  capacity: number;
  registered_count: number;
}

interface Registration {
  registration_id: string;
  event_id: string;
}

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchData(parsedUser.email);
  }, [router]);

  const fetchData = async (email: string) => {
    try {
      const eventsRes = await fetch('/api/events');
      const eventsData = await eventsRes.json();
      if (eventsData.success) {
        setEvents(eventsData.data);
      }

      const regRes = await fetch(`/api/registrations?email=${encodeURIComponent(email)}`);
      const regData = await regRes.json();
      if (regData.success) {
        setRegistrations(regData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScr5O94MDsUN19RsJpvaJe4ex0tzImx5JDZUHSdq2UADiA0Ng/viewform";

  return (
    <div className="space-y-8">
      
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-white">Browse Events</h1>
        <p className="text-aggie-gray-light mt-2">Discover and register for upcoming events</p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.6)] p-12 text-center">
          <div className="text-6xl mb-6">📅</div>
          <p className="text-white text-xl font-bold mb-3">No events available</p>
          <p className="text-[#b0b0b0] mb-8 max-w-md mx-auto">Check back soon for upcoming events and opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => {
            const registration = registrations.find((r) => r.event_id === event.event_id);
            const spotsLeft = event.capacity - event.registered_count;
            const isFull = spotsLeft <= 0;

            return (
              <div key={event.event_id} className="rounded-xl p-6 border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.6)] hover:bg-white/10 hover:border-aggie-maroon transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{event.event_name}</h2>
                    <p className="text-sm text-[#d0d0d0] mt-3 leading-relaxed">{event.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-5">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8">
                        <span className="text-lg">📅</span>
                        <span className="text-sm font-medium text-[#e0e0e0]">
                          {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8">
                        <span className="text-lg">👥</span>
                        <span className="text-sm font-medium text-[#e0e0e0]">{event.registered_count}/{event.capacity} registered</span>
                      </div>

                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isFull ? 'bg-red-500/15 border-red-400/40' : spotsLeft <= 10 ? 'bg-orange-500/15 border-orange-400/40' : 'bg-emerald-500/15 border-emerald-400/40'}`}>
                        <span className="text-lg">{isFull ? '🔒' : '✨'}</span>
                        <span className={`text-sm font-semibold ${isFull ? 'text-red-300' : spotsLeft <= 10 ? 'text-orange-200' : 'text-emerald-200'}`}>
                          {isFull ? 'Full' : `${spotsLeft} spots left`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    {registration ? (
                      <div className="text-center">
                        <span className="px-6 py-3 rounded-xl font-semibold text-sm block whitespace-nowrap bg-emerald-500/15 text-emerald-300 border border-emerald-400/40">Registered ✓</span>
                        <p className="text-xs text-[#9a9a9a] mt-2">ID: {registration.registration_id}</p>
                      </div>
                    ) : (
                      <div>
                        {isFull ? (
                          <button disabled className="px-8 py-3 rounded-xl font-semibold text-sm bg-white/8 text-[#777777] border border-white/15 cursor-not-allowed">Full</button>
                        ) : (
                          <a href={formUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-xl font-semibold text-sm text-center bg-aggie-maroon text-white border border-transparent hover:bg-aggie-dark_maroon shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.9)] active:scale-[0.97] active:translate-y-[1px] transition-all duration-200">Register</a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}