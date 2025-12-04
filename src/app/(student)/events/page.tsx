import { MOCK_EVENTS, MOCK_USER_REGISTRATIONS } from '@/lib/mockData';

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
        <p className="text-gray-600 mt-2">Discover and register for upcoming events</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_EVENTS.map((event) => {
          const registration = MOCK_USER_REGISTRATIONS.find(r => r.event_id === event.event_id);
          const spotsLeft = event.capacity - event.registered_count;
          const isFull = spotsLeft <= 0;

          return (
            <div key={event.event_id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900">{event.event_name}</h2>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span>📅 {new Date(event.event_date).toLocaleDateString()}</span>
                    <span>👥 {event.registered_count}/{event.capacity} registered</span>
                    <span className={spotsLeft <= 10 && !isFull ? 'text-orange-600 font-medium' : ''}>
                      {isFull ? '🔒 Full' : `${spotsLeft} spots left`}
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  {registration ? (
                    <div className="text-center">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium block">
                        Registered ✓
                      </span>
                      <p className="text-xs text-gray-500 mt-2">ID: {registration.registration_id}</p>
                    </div>
                  ) : (
                    <button
                      disabled={isFull}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        isFull
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
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
