export default function ReviewQueuePage() {
  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white">GA Review Queue</h1>
        <p className="text-aggie-gray-light mt-2">Review and approve student registrations</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-16 text-center border-2 border-aggie-grays-200">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-aggie-grays-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-aggie-grays-200">
            <span className="text-5xl">🚧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">GA Review Queue - Coming Soon</h2>
          <p className="text-aggie-grays-600 text-lg mb-6">
            This page will allow GAs to review and approve student registrations
          </p>
          <div className="bg-aggie-grays-100 rounded-xl p-6 border-2 border-aggie-grays-200">
            <h3 className="font-semibold text-gray-900 mb-3">Features in Development:</h3>
            <ul className="text-left space-y-2 text-aggie-grays-700">
              <li className="flex items-center gap-2">
                <span className="text-aggie-maroon">•</span>
                <span>View pending student registrations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aggie-maroon">•</span>
                <span>Review and approve registration requests</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aggie-maroon">•</span>
                <span>Manage waitlists and event capacity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aggie-maroon">•</span>
                <span>Send notifications to students</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
