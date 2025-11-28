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
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {CURRENT_USER.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your activities</p>
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/events"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-medium text-gray-900">Browse Events</p>
              <p className="text-sm text-gray-500">Find your next opportunity</p>
            </div>
          </a>
          <a
            href="/my-registrations"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-gray-900">My Registrations</p>
              <p className="text-sm text-gray-500">View registration status</p>
            </div>
          </a>
          <a
            href="/mentorship"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <span className="text-2xl">🤝</span>
            <div>
              <p className="font-medium text-gray-900">Mentorship</p>
              <p className="text-sm text-gray-500">Connect with mentors</p>
            </div>
          </a>
        </div>
      </div>

      {/* Upcoming events schedule */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {todaysSchedule.map((event) => {
            const registration = MOCK_USER_REGISTRATIONS.find(r => r.event_id === event.event_id);
            return (
              <div
                key={event.event_id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{event.event_name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(event.event_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="ml-4">
                  {registration ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Registered ✓
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
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
