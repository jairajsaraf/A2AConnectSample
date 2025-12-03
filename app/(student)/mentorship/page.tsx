import { MOCK_MENTORSHIP_REQUESTS, MOCK_USER_REGISTRATIONS } from '@/lib/mockData';

export default function MentorshipPage() {
  const hasMentorshipRequest = MOCK_USER_REGISTRATIONS.some(r => r.wants_mentor === 'Yes');
  const mentorshipRequest = MOCK_MENTORSHIP_REQUESTS[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mentorship</h1>
        <p className="text-gray-600 mt-2">Connect with experienced mentors in your field</p>
      </div>

      {hasMentorshipRequest ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentorship request status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Mentorship Request</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Request ID</p>
                <p className="font-medium text-gray-900">{mentorshipRequest.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preferences</p>
                <p className="font-medium text-gray-900">{mentorshipRequest.mentor_preferences}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    mentorshipRequest.status === 'Matched'
                      ? 'bg-green-100 text-green-800'
                      : mentorshipRequest.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {mentorshipRequest.status}
                </span>
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="bg-aggie-grays-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-aggie-dark_maroon mt-1">✓</span>
                <span>We'll review your preferences and match you with a suitable mentor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aggie-dark_maroon mt-1">✓</span>
                <span>You'll receive an email introduction once matched</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aggie-dark_maroon mt-1">✓</span>
                <span>Typical matching time is 1-2 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">
            You haven't requested a mentor yet
          </p>
          <p className="text-gray-600 mb-6">
            Request mentorship when registering for events, or reach out to a GA
          </p>
          <a
            href="/events"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
          >
            Browse Events
          </a>
        </div>
      )}
    </div>
  );
}
