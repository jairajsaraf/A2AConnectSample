export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Header with Login/Register */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">A2A Connect</div>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="px-6 py-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Login
            </a>
            <a
              href="/dashboard"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Aggie2Aggie Connect
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connecting UC Davis students through events, mentorship, and community engagement
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-6 mb-20">
            <a
              href="/dashboard"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
            <a
              href="/events"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              Browse Events
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {/* Events Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Events</h3>
              <p className="text-gray-600">
                Discover and register for campus events, workshops, and networking opportunities
              </p>
            </div>

            {/* Mentorship Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Mentorship</h3>
              <p className="text-gray-600">
                Connect with experienced mentors who can guide you through your academic journey
              </p>
            </div>

            {/* Community Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Build lasting connections with fellow Aggies and grow your network
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Aggie2Aggie Connect | UC Davis CMIS</p>
        </div>
      </footer>
    </div>
  );
}
