import { MOCK_EVENTS, MOCK_USER_REGISTRATIONS } from '@/lib/mockData';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white">Browse Events</h1>
        <p className="text-aggie-gray-light mt-2">Discover and register for upcoming events</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_EVENTS.map((event) => {
          const registration = MOCK_USER_REGISTRATIONS.find(r => r.event_id === event.event_id);
          const spotsLeft = event.capacity - event.registered_count;
          const isFull = spotsLeft <= 0;

          return (
            <div key={event.event_id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-aggie-grays-200 hover:border-aggie-maroon transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{event.event_name}</h2>
                  <p className="text-gray-600 mt-3 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-6 mt-5">
                    <div className="flex items-center gap-2 px-4 py-2 bg-aggie-grays-100 rounded-lg">
                      <span className="text-lg">📅</span>
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-aggie-grays-100 rounded-lg">
                      <span className="text-lg">👥</span>
                      <span className="text-sm font-medium text-gray-700">
                        {event.registered_count}/{event.capacity} registered
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isFull
                        ? 'bg-red-50 border border-red-200'
                        : spotsLeft <= 10
                        ? 'bg-orange-50 border border-orange-200'
                        : 'bg-green-50 border border-green-200'
                    }`}>
                      <span className="text-lg">{isFull ? '🔒' : '✨'}</span>
                      <span className={`text-sm font-semibold ${
                        isFull
                          ? 'text-red-700'
                          : spotsLeft <= 10
                          ? 'text-orange-700'
                          : 'text-green-700'
                      }`}>
                        {isFull ? 'Full' : `${spotsLeft} spots left`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  {registration ? (
                    <div className="text-center">
                      <span className="px-6 py-3 bg-green-50 text-green-700 border-2 border-green-300 rounded-xl font-semibold text-sm block whitespace-nowrap">
                        Registered ✓
                      </span>
                      <p className="text-xs text-aggie-grays-500 mt-2">ID: {registration.registration_id}</p>
                    </div>
                  ) : (
                    <button
                      disabled={isFull}
                      className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        isFull
                          ? 'bg-aggie-grays-300 text-aggie-grays-600 cursor-not-allowed'
                          : 'bg-aggie-maroon text-white hover:bg-aggie-dark_maroon shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isFull ? 'Full' : 'Register'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
