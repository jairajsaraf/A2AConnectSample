'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  userId: string;
  email: string;
  name: string;
}

interface Registration {
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
  review_status: string;
  status: string;
}

export default function MyRegistrationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchRegistrations(parsedUser.email);
  }, [router]);

  const fetchRegistrations = async (email: string) => {
    try {
      const response = await fetch(`/api/registrations?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading your registrations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-white">My Registrations</h1>
        <p className="text-aggie-gray-light mt-2">View and manage your event registrations</p>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-aggie-grays-200">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-aggie-grays-500 text-lg font-medium mb-4">No registrations yet</p>
          <a
            href="/events"
            className="inline-block px-6 py-3 bg-aggie-maroon text-white rounded-xl hover:bg-aggie-dark_maroon font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Browse events to get started
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-aggie-grays-200">
          <table className="min-w-full divide-y divide-aggie-grays-200">
            <thead className="bg-aggie-grays-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-aggie-grays-700 uppercase tracking-wider">
                  Registration ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-aggie-grays-700 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-aggie-grays-700 uppercase tracking-wider">
                  Date Registered
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-aggie-grays-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-aggie-grays-700 uppercase tracking-wider">
                  Review Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-aggie-grays-200">
              {registrations.map((registration) => (
                <tr key={registration.registration_id} className="hover:bg-aggie-grays-100 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {registration.registration_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {registration.event_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-aggie-grays-600">
                    {new Date(registration.time_stamp).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 ${
                        registration.status === 'Registered'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : registration.status === 'Waitlisted'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-aggie-grays-100 text-aggie-grays-700 border-aggie-grays-300'
                      }`}
                    >
                      {registration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 ${
                        registration.review_status === 'Approved'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : registration.review_status === 'Pending'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {registration.review_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}