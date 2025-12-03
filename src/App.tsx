import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Users, Calendar, BarChart2, BookOpen, ChevronRight, X, Home, LogOut, Settings, Bell, Search, TrendingUp, Award, MessageSquare, Video } from 'lucide-react';

// Color constants based on the provided config
// Aggie Maroon: #500000
// Aggie Dark Maroon: #3C0000
// Aggie Ochre: #D6D3C4 (Replacing Gold/Yellow)
// Aggie Navy: #2F3E51
// Aggie Gray: #707070
// Aggie Black: #000000
// Aggie Gray Light: #D1D1D1

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'John Aggie', email: 'jaggie@tamu.edu' });

  const handleLoginClick = () => setView('login');
  const handleSignupClick = () => setView('signup');
  const handleBackToHome = () => setView('landing');
  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('dashboard');
  };
  const handleSignup = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('dashboard');
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('landing');
  };

  // Shared UI Components
  const GlassCard = ({ children, className = "" }) => (
    <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );

  const PrimaryButton = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg
      bg-[#500000] text-white hover:bg-[#3C0000] hover:shadow-maroon/20 border border-[#732f2f]/30 ${className}`}
    >
      {children}
    </button>
  );

  const SecondaryButton = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-bold transition-all border border-[#D6D3C4]/50 text-[#D6D3C4] hover:bg-[#D6D3C4]/10 ${className}`}
    >
      {children}
    </button>
  );

  const InputField = ({ icon: Icon, type, placeholder, label }) => (
    <div className="mb-4">
      <label className="block text-[#D1D1D1] text-sm mb-2 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070] group-focus-within:text-[#D6D3C4] transition-colors">
          <Icon size={18} />
        </div>
        <input
          type={type}
          className="w-full bg-[#202020] border border-[#535353] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#D6D3C4] focus:ring-1 focus:ring-[#D6D3C4] transition-all placeholder-[#535353]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  // --- VIEWS ---

  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#000000] z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#500000] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#2F3E51] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button onClick={handleBackToHome} className="mb-6 flex items-center text-[#707070] hover:text-white transition-colors">
          <ArrowRight className="rotate-180 mr-2" size={16} /> Back to Home
        </button>

        <GlassCard className="p-8 border-t border-t-[#D6D3C4]/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D1D1D1] mb-2">Welcome Back</h2>
            <p className="text-[#D1D1D1] text-sm">Sign in to continue your Aggie journey</p>
          </div>

          <form onSubmit={handleLogin}>
            <InputField icon={Mail} type="text" label="Aggie ID or Email" placeholder="user@tamu.edu" />
            <InputField icon={Lock} type="password" label="Password" placeholder="••••••••" />

            <div className="flex justify-end mb-6">
              <a href="#" className="text-xs text-[#D6D3C4] hover:text-white">Forgot Password?</a>
            </div>

            <PrimaryButton className="w-full mb-4" onClick={handleLogin}>Log In</PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Don't have an account? <button onClick={handleSignupClick} className="text-[#D6D3C4] hover:underline">Sign Up</button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );

  const SignupView = () => (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#000000] z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#500000] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2F3E51] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button onClick={handleBackToHome} className="mb-6 flex items-center text-[#707070] hover:text-white transition-colors">
          <ArrowRight className="rotate-180 mr-2" size={16} /> Back to Home
        </button>

        <GlassCard className="p-8 border-t border-t-[#D6D3C4]/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D6D3C4] to-white mb-2">Get Started</h2>
            <p className="text-[#D1D1D1] text-sm">Join the network of thousands of Aggies</p>
          </div>

          <form onSubmit={handleSignup}>
            <InputField icon={Mail} type="text" label="Aggie ID or Email" placeholder="user@tamu.edu" />
            <InputField icon={Lock} type="password" label="Password" placeholder="••••••••" />
            <InputField icon={Lock} type="password" label="Confirm Password" placeholder="••••••••" />

            <PrimaryButton className="w-full mb-4 mt-6" onClick={handleSignup}>Create Account</PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Already have an account? <button onClick={handleLoginClick} className="text-[#D6D3C4] hover:underline">Log In</button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );

  const LandingView = () => (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[#000000]/30 border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#500000] flex items-center justify-center border border-[#3C0000]">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Aggie2Aggie <span className="text-[#D6D3C4]">Connect</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#D1D1D1]">
            <a href="#" className="hover:text-[#D6D3C4] transition-colors">Mentorship</a>
            <a href="#" className="hover:text-[#D6D3C4] transition-colors">Events</a>
            <a href="#" className="hover:text-[#D6D3C4] transition-colors">Resources</a>
            <button onClick={handleLoginClick} className="hover:text-white transition-colors">Log In</button>
            <button
              onClick={handleSignupClick}
              className="px-4 py-2 rounded-lg bg-[#500000] text-white border border-[#3C0000] hover:bg-[#3C0000] transition-all"
            >
              Get Started
            </button>
          </div>

           {/* Mobile Menu Button */}
           <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#202020] border-b border-white/10 p-4 flex flex-col gap-4">
             <a href="#" className="text-[#D1D1D1]">Mentorship</a>
            <a href="#" className="text-[#D1D1D1]">Events</a>
            <button onClick={handleLoginClick} className="text-left text-[#D1D1D1]">Log In</button>
            <button onClick={handleSignupClick} className="text-[#D6D3C4]">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#500000] rounded-full blur-[150px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2F3E51] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6D3C4]/10 border border-[#D6D3C4]/20 text-[#D6D3C4] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D6D3C4]"></span>
            The #1 Engagement Platform for Aggies
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect, Grow, and <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6D3C4] to-white">Thrive Together.</span>
          </h1>

          <p className="text-xl text-[#D1D1D1] mb-10 max-w-2xl mx-auto leading-relaxed">
            Your exclusive gateway to mentorship, community events, and professional resources tailored for the Aggie family.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton onClick={handleSignupClick} className="w-full sm:w-auto flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight size={18} />
            </PrimaryButton>
            <SecondaryButton onClick={handleLoginClick} className="w-full sm:w-auto">
              Member Login
            </SecondaryButton>
          </div>

          {/* Stats/Social Proof */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
             {[
               { label: "Active Members", val: "12k+" },
               { label: "Mentorships", val: "4.5k" },
               { label: "Events", val: "200+" },
               { label: "Resources", val: "Unlimited" }
             ].map((stat, i) => (
               <GlassCard key={i} className="p-4 text-center">
                 <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                 <div className="text-xs text-[#707070] uppercase tracking-wide">{stat.label}</div>
               </GlassCard>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to <span className="text-[#D6D3C4]">succeed</span></h2>
              <p className="text-[#D1D1D1] max-w-md">Powerful tools designed to foster connection and growth within the university ecosystem.</p>
            </div>
            <button className="hidden md:flex items-center text-[#D6D3C4] font-medium hover:text-white transition-colors mt-4 md:mt-0">
              View all features <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000]/40 flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Connections</h3>
              <p className="text-[#D1D1D1] leading-relaxed mb-6">
                Find and connect with peers, alumni, and faculty who share your interests and career goals.
              </p>
              <div className="w-full h-32 bg-gradient-to-t from-[#500000]/20 to-transparent rounded-lg relative overflow-hidden">
                 {/* Mock UI Element */}
                 <div className="absolute bottom-[-10px] left-4 right-4 bg-[#202020] p-3 rounded-t-lg border border-white/5 opacity-80">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#535353]"></div>
                     <div className="h-2 w-20 bg-[#535353] rounded"></div>
                   </div>
                 </div>
              </div>
            </GlassCard>

            {/* Feature 2 */}
            <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000]/40 flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Events & Workshops</h3>
              <p className="text-[#D1D1D1] leading-relaxed mb-6">
                Stay updated with the latest campus events, workshops, and networking opportunities.
              </p>
              <div className="w-full h-32 bg-gradient-to-t from-[#2F3E51]/20 to-transparent rounded-lg relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2 py-1 bg-[#D6D3C4] text-black text-xs font-bold rounded">JAN 15</div>
                  </div>
              </div>
            </GlassCard>

             {/* Feature 3 */}
             <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000]/40 flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth Analytics</h3>
              <p className="text-[#D1D1D1] leading-relaxed mb-6">
                Track your engagement, mentorship hours, and skill development progress over time.
              </p>
              <div className="w-full h-32 bg-gradient-to-t from-[#2F3E51]/20 to-transparent rounded-lg relative flex items-end justify-around px-6 pb-2">
                 <div className="w-2 h-10 bg-[#500000] rounded-t"></div>
                 <div className="w-2 h-16 bg-[#500000] rounded-t"></div>
                 <div className="w-2 h-12 bg-[#500000] rounded-t"></div>
                 <div className="w-2 h-20 bg-[#D6D3C4] rounded-t shadow-[0_0_10px_rgba(214,211,196,0.3)]"></div>
                 <div className="w-2 h-14 bg-[#500000] rounded-t"></div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#500000] to-[#3C0000] border border-white/10 p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make your mark?</h2>
              <p className="text-lg text-[#D1D1D1] mb-8 max-w-2xl mx-auto">
                Join thousands of other Aggies who are building their future today.
              </p>
              <button
                onClick={handleSignupClick}
                className="px-8 py-4 rounded-xl font-bold text-[#500000] bg-white hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Create Your Free Account
              </button>
            </div>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#000000] pt-16 pb-8 px-6 text-sm text-[#707070]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#500000] flex items-center justify-center text-xs text-white">A</div>
              <span className="text-white font-bold">Aggie2Aggie</span>
            </div>
            <p>© 2023 Aggie2Aggie Connect. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );

  const DashboardView = () => {
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
              onClick={handleLogout}
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

  return (
    <>
      {view === 'landing' && <LandingView />}
      {view === 'login' && <LoginView />}
      {view === 'signup' && <SignupView />}
      {view === 'dashboard' && <DashboardView />}
    </>
  );
};

export default App;
