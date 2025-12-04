import React, { useState } from 'react';
import { Home, LogOut, Settings, Bell, Search, Users, Calendar, BookOpen, Award } from 'lucide-react';

interface DashboardProps {
  currentUser: { name: string; email: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data for dashboard
  const stats = [
    { title: 'Upcoming Events', value: 3, subtitle: 'Available to register', icon: Calendar },
    { title: 'My Registrations', value: 2, subtitle: 'Total registered', icon: BookOpen },
    { title: 'Pending Reviews', value: 1, subtitle: 'Awaiting GA approval', icon: Award }
  ];

  const upcomingEvents = [
    { name: 'Career Fair 2025', date: 'Sunday, December 14, 2025', desc: 'Annual career fair with top tech companies', status: 'Registered' },
    { name: 'Networking Mixer', date: 'Friday, December 19, 2025', desc: 'Connect with alumni and industry professionals', status: 'Registered' },
    { name: 'Workshop: Resume Building', date: 'Tuesday, December 9, 2025', desc: 'Learn how to craft the perfect resume', status: 'Available' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: Home, key: 'dashboard' },
    { name: 'Events', icon: Calendar, key: 'events' },
    { name: 'My Registrations', icon: BookOpen, key: 'registrations' },
    { name: 'Mentorship', icon: Users, key: 'mentorship' },
    { name: 'GA Review', icon: Award, key: 'ga-review' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#500000] to-[#3C0000] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">Aggie2Aggie</h1>
          <h2 className="text-lg font-semibold text-[#D6D3C4]">Connect</h2>
          <p className="text-xs text-[#D1D1D1] mt-1">Engagement Platform</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.key
                    ? 'bg-white text-[#500000] font-semibold'
                    : 'text-[#D1D1D1] hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#D1D1D1] hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-1">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, people..."
              className="flex-1 max-w-md bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#500000] rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#500000] flex items-center justify-center text-white font-bold">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Hello, {currentUser.name.split(' ')[0]}! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your activities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.title}</p>
                      <p className="text-4xl font-bold text-[#500000] mt-2">{stat.value}</p>
                      <p className="text-gray-500 text-sm mt-1">{stat.subtitle}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#500000]/10 flex items-center justify-center">
                      <Icon size={24} className="text-[#500000]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#500000] hover:shadow-md transition-all text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                    <Calendar size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Browse Events</p>
                    <p className="text-sm text-gray-500">Find your next opportunity</p>
                  </div>
                </div>
              </button>

              <button className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#500000] hover:shadow-md transition-all text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <BookOpen size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">My Registrations</p>
                    <p className="text-sm text-gray-500">View registration status</p>
                  </div>
                </div>
              </button>

              <button className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#500000] hover:shadow-md transition-all text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <Users size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Mentorship</p>
                    <p className="text-sm text-gray-500">Connect with mentors</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{event.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                      <p className="text-sm text-gray-500 mt-2">{event.desc}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      event.status === 'Registered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
