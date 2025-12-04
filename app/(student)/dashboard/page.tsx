import DashboardCard from '@/components/DashboardCard';
import { CURRENT_USER, MOCK_USER_REGISTRATIONS, MOCK_EVENTS } from '@/lib/mockData';

export default function DashboardPage() {
  // Calculate stats from mock data
  const totalRegistrations = MOCK_USER_REGISTRATIONS.length;
  const pendingReviews = MOCK_USER_REGISTRATIONS.filter(r => r.review_status === 'Pending').length;
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.event_date) > new Date()).length;

  // Get today's schedule (mock - just showing next 3 events)
  const todaysSchedule = MOCK_EVENTS.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white">
          Hello, {CURRENT_USER.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-aggie-gray-light mt-2">Here's what's happening with your activities</p>
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

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-aggie-grays-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/events"
            className="flex items-center gap-3 p-5 border-2 border-aggie-grays-300 rounded-xl hover:border-aggie-maroon hover:bg-aggie-grays-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-aggie-grays-100 rounded-lg flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Browse Events</p>
              <p className="text-sm text-gray-500">Find your next opportunity</p>
            </div>
          </a>
          <a
            href="/my-registrations"
            className="flex items-center gap-3 p-5 border-2 border-aggie-grays-300 rounded-xl hover:border-aggie-maroon hover:bg-aggie-grays-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-aggie-grays-100 rounded-lg flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">My Registrations</p>
              <p className="text-sm text-gray-500">View registration status</p>
            </div>
          </a>
          <a
            href="/mentorship"
            className="flex items-center gap-3 p-5 border-2 border-aggie-grays-300 rounded-xl hover:border-aggie-maroon hover:bg-aggie-grays-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-aggie-grays-100 rounded-lg flex items-center justify-center group-hover:bg-aggie-maroon transition-colors">
              <span className="text-2xl">🤝</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Mentorship</p>
              <p className="text-sm text-gray-500">Connect with mentors</p>
            </div>
          </a>
        </div>
      </div>

      {/* Upcoming events schedule */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-aggie-grays-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          {todaysSchedule.map((event) => {
            const registration = MOCK_USER_REGISTRATIONS.find(r => r.event_id === event.event_id);
            return (
              <div
                key={event.event_id}
                className="flex items-center justify-between p-5 border-2 border-aggie-grays-200 rounded-xl hover:border-aggie-maroon hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{event.event_name}</h3>
                  <p className="text-sm text-aggie-grays-500 mt-2 flex items-center gap-2">
                    <span>📅</span>
                    {new Date(event.event_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                </div>
                <div className="ml-4">
                  {registration ? (
                    <span className="px-4 py-2 bg-green-50 text-green-700 border-2 border-green-200 rounded-full text-sm font-semibold">
                      Registered ✓
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-aggie-grays-100 text-aggie-grays-700 border-2 border-aggie-grays-300 rounded-full text-sm font-medium">
                      {event.registered_count}/{event.capacity} spots
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
