'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/events', label: 'Events', icon: '📅' },
  { href: '/my-registrations', label: 'My Registrations', icon: '📝' },
  { href: '/mentorship', label: 'Mentorship', icon: '🤝' },
  { href: '/review-queue', label: 'GA Review', icon: '✅', gaOnly: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get user role from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to home page
    router.push('/');
  };

  // Filter navigation items based on user role
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    // If item is GA only, show only if user is a Graduate Assistant
    if (item.gaOnly) {
      return userRole === 'Graduate Assistant (GA)';
    }
    return true;
  });

  return (
    <aside
      className="
        w-64 h-screen fixed left-0 top-0 flex flex-col
        bg-[#121212]/95 border-r border-[#2a2a2a]
        backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8)]
      "
    >
      {/* Logo / Header */}
      <div className="p-6 border-b border-[#2a2a2a]">
        <h1 className="text-2xl font-bold text-white">
          Aggie2Aggie <span className="text-[#D6D3C4]">Connect</span>
        </h1>
        <p className="text-sm text-[#b0b0b0] mt-1">Engagement Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    border
                    transition-all duration-150 ease-out
                    active:scale-[0.97] active:translate-y-[1px]
                    ${
                      isActive
                        ? 'bg-white/14 text-white font-semibold border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                        : 'bg-transparent text-[#d1d1d1] border-transparent hover:bg-white/8 hover:text-white hover:border-white/20 hover:shadow-[0_8px_22px_rgba(0,0,0,0.6)]'
                    }
                    ${item.gaOnly ? 'border-t border-[#2a2a2a] mt-4 pt-4' : ''}
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-[#2a2a2a] space-y-3">
        <button
          onClick={handleLogout}
          className="
            w-full px-4 py-2 rounded-lg
            flex items-center justify-center gap-2
            text-sm font-medium
            bg-[#2a2a2a] text-[#f5f5f5]
            border border-white/10
            hover:bg-[#ff4444]/90 hover:text-white hover:border-[#ff8888]
            transition-all duration-150 ease-out
            active:scale-[0.97] active:translate-y-[1px]
            shadow-[0_6px_18px_rgba(0,0,0,0.6)]
          "
        >
          <span>⏏</span>
          <span>Logout</span>
        </button>

        <p className="text-xs text-[#707070]">
          &copy; 2025 CMIS
        </p>
      </div>
    </aside>
  );
}