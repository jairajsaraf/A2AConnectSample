import { MOCK_MENTORSHIP_REQUESTS, MOCK_USER_REGISTRATIONS } from '@/lib/mockData';

export default function MentorshipPage() {
  const hasMentorshipRequest = MOCK_USER_REGISTRATIONS.some(r => r.wants_mentor === 'Yes');
  const mentorshipRequest = MOCK_MENTORSHIP_REQUESTS[0];

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white">Mentorship</h1>
        <p className="text-aggie-gray-light mt-2">Connect with experienced mentors in your field</p>
      </div>

      {hasMentorshipRequest ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentorship request status */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-aggie-grays-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Your Mentorship Request
            </h2>
            <div className="space-y-5">
              <div className="p-4 bg-aggie-grays-100 rounded-lg">
                <p className="text-xs font-semibold text-aggie-grays-600 uppercase tracking-wide mb-1">Request ID</p>
                <p className="font-bold text-gray-900 text-lg">{mentorshipRequest.id}</p>
              </div>
              <div className="p-4 bg-aggie-grays-100 rounded-lg">
                <p className="text-xs font-semibold text-aggie-grays-600 uppercase tracking-wide mb-1">Preferences</p>
                <p className="font-semibold text-gray-900">{mentorshipRequest.mentor_preferences}</p>
              </div>
              <div className="p-4 bg-aggie-grays-100 rounded-lg">
                <p className="text-xs font-semibold text-aggie-grays-600 uppercase tracking-wide mb-2">Status</p>
                <span
                  className={`inline-block px-4 py-2 text-sm font-semibold rounded-full border-2 ${
                    mentorshipRequest.status === 'Matched'
                      ? 'bg-green-50 text-green-700 border-green-300'
                      : mentorshipRequest.status === 'Pending'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                      : 'bg-aggie-grays-100 text-aggie-grays-700 border-aggie-grays-300'
                  }`}
                >
                  {mentorshipRequest.status}
                </span>
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="bg-gradient-to-br from-aggie-grays-100 to-aggie-grays-200 rounded-xl p-8 border-2 border-aggie-grays-300 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              What to Expect
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-aggie-grays-200">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">We'll review your preferences and match you with a suitable mentor</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-aggie-grays-200">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">You'll receive an email introduction once matched</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-aggie-grays-200">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Typical matching time is 1-2 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-aggie-grays-200">
          <div className="text-6xl mb-6">🤝</div>
          <p className="text-gray-900 text-xl font-bold mb-3">
            You haven't requested a mentor yet
          </p>
          <p className="text-aggie-grays-600 mb-8 max-w-md mx-auto">
            Request mentorship when registering for events, or reach out to a GA
          </p>
          <a
            href="/events"
            className="inline-block px-8 py-3 bg-aggie-maroon text-white rounded-xl hover:bg-aggie-dark_maroon font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Browse Events
          </a>
        </div>
      )}
    </div>
  );
}
