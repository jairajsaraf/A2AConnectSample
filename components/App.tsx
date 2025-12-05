'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, ArrowRight, Users, Calendar, BarChart2, ChevronRight, X } from 'lucide-react';

type ViewType = 'landing' | 'login' | 'signup';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

interface InputFieldProps {
  icon: React.ComponentType<{ size?: number }>;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

interface SelectFieldProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
}

// Component definitions (outside App to prevent re-creation on every render)
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg
    bg-[#500000] text-white hover:bg-[#3C0000] border border-[#732f2f]/30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-bold transition-all border border-[#D6D3C4]/50 text-[#D6D3C4] hover:bg-[#D6D3C4]/10 ${className}`}
  >
    {children}
  </button>
);

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, type, placeholder, label, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-[#D1D1D1] text-sm mb-2 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070] group-focus-within:text-[#D6D3C4] transition-colors">
        <Icon size={18} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full bg-[#202020] border border-[#535353] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#D6D3C4] focus:ring-1 focus:ring-[#D6D3C4] transition-all placeholder-[#535353]"
        placeholder={placeholder}
      />
    </div>
    {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

const SelectField: React.FC<SelectFieldProps> = ({ icon: Icon, label, value, onChange, options, error }) => (
  <div className="mb-4">
    <label className="block text-[#D1D1D1] text-sm mb-2 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070] group-focus-within:text-[#D6D3C4] transition-colors z-10">
        <Icon size={18} />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-[#202020] border border-[#535353] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#D6D3C4] focus:ring-1 focus:ring-[#D6D3C4] transition-all appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#202020] text-white">
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#707070]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Student');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLoginClick = (): void => setView('login');
  const handleSignupClick = (): void => setView('signup');
  const handleBackToHome = (): void => setView('landing');

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle signup submission
  const handleSignupSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSignupError('');

    // Validation
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword || !signupRole) {
      setSignupError('All fields are required');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }

    setSignupLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: signupRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setSignupError(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('An error occurred. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  // LOGIN VIEW
  const LoginView: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
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
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D1D1D1] mb-2">
              Welcome Back
            </h2>
            <p className="text-[#D1D1D1] text-sm">Sign in to continue your Aggie journey</p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <InputField 
              icon={Mail} 
              type="email" 
              label="Email" 
              placeholder="user@tamu.edu"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <InputField 
              icon={Lock} 
              type="password" 
              label="Password" 
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            <PrimaryButton type="submit" className="w-full mb-4" disabled={loginLoading}>
              {loginLoading ? 'Logging in...' : 'Log In'}
            </PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Don&apos;t have an account?{' '}
              <button type="button" onClick={handleSignupClick} className="text-[#D6D3C4] hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );

  // SIGNUP VIEW
  const SignupView: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
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
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D6D3C4] to-white mb-2">
              Get Started
            </h2>
            <p className="text-[#D1D1D1] text-sm">Join the network of thousands of Aggies</p>
          </div>

          <form onSubmit={handleSignupSubmit}>
            <InputField
              icon={User}
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <InputField
              icon={Mail}
              type="email"
              label="Email"
              placeholder="user@tamu.edu"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <SelectField
              icon={Users}
              label="Role"
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              options={['Student', 'Graduate Assistant (GA)', 'Mentor', 'Admin']}
            />
            <InputField
              icon={Lock}
              type="password"
              label="Password"
              placeholder="••••••••"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <InputField
              icon={Lock}
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
            />

            {signupError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 text-sm">{signupError}</p>
              </div>
            )}

            <PrimaryButton type="submit" className="w-full mb-4 mt-6" disabled={signupLoading}>
              {signupLoading ? 'Creating Account...' : 'Create Account'}
            </PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Already have an account?{' '}
              <button type="button" onClick={handleLoginClick} className="text-[#D6D3C4] hover:underline">
                Log In
              </button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );

  // LANDING VIEW (keep your existing landing page code)
  const LandingView: React.FC = () => (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden font-sans">
      {/* Your existing landing page code... */}
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

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#202020] border-b border-white/10 p-4 flex flex-col gap-4">
            <a href="#" className="text-[#D1D1D1] hover:text-[#D6D3C4]">Mentorship</a>
            <a href="#" className="text-[#D1D1D1] hover:text-[#D6D3C4]">Events</a>
            <a href="#" className="text-[#D1D1D1] hover:text-[#D6D3C4]">Resources</a>
            <button onClick={handleLoginClick} className="text-left text-[#D1D1D1] hover:text-white">Log In</button>
            <button onClick={handleSignupClick} className="text-left text-[#D6D3C4]">Get Started</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
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

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need to <span className="text-[#D6D3C4]">succeed</span>
              </h2>
              <p className="text-[#D1D1D1] max-w-md">
                Powerful tools designed to foster connection and growth within the university ecosystem.
              </p>
            </div>
            <button className="hidden md:flex items-center text-[#D6D3C4] font-medium hover:text-white transition-colors mt-4 md:mt-0">
              View all features <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000] flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Connections</h3>
              <p className="text-[#D1D1D1] leading-relaxed mb-6">
                Find and connect with peers, alumni, and faculty who share your interests and career goals.
              </p>
              <div className="w-full h-32 bg-gradient-to-t from-[#500000]/20 to-transparent rounded-lg relative overflow-hidden">
                <div className="absolute bottom-[-10px] left-4 right-4 bg-[#202020] p-3 rounded-t-lg border border-white/5 opacity-80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#535353]"></div>
                    <div className="h-2 w-20 bg-[#535353] rounded"></div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000] flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Events &amp; Workshops</h3>
              <p className="text-[#D1D1D1] leading-relaxed mb-6">
                Stay updated with the latest campus events, workshops, and networking opportunities.
              </p>
              <div className="w-full h-32 bg-gradient-to-t from-[#2F3E51]/20 to-transparent rounded-lg relative overflow-hidden">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-2 py-1 bg-[#D6D3C4] text-black text-xs font-bold rounded">JAN 15</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 group hover:bg-white/10 transition-colors cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#500000] flex items-center justify-center text-[#D6D3C4] mb-6 group-hover:scale-110 transition-transform">
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

      {/* CTA SECTION */}
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
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#000000] pt-16 pb-8 px-6 text-sm text-[#707070]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#500000] flex items-center justify-center text-xs text-white">A</div>
              <span className="text-white font-bold">Aggie2Aggie</span>
            </div>
            <p>&copy; 2024 Aggie2Aggie Connect. All rights reserved.</p>
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

  return (
    <>
      {view === 'landing' && <LandingView />}
      {view === 'login' && <LoginView />}
      {view === 'signup' && <SignupView />}
    </>
  );
};

export default App;