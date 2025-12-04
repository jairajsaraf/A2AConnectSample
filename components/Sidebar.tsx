'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/events', label: 'Events', icon: '📅' },
  { href: '/my-registrations', label: 'My Registrations', icon: '📝' },
  { href: '/mentorship', label: 'Mentorship', icon: '🤝' },
  { href: '/review-queue', label: 'GA Review', icon: '✅', gaOnly: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-aggie-maroon h-screen shadow-lg fixed left-0 top-0 flex flex-col">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-aggie-white">Aggie2Aggie Connect</h1>
        <p className="text-sm text-aggie-gray-light mt-1">Engagement Platform</p>
        
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-aggie-white text-aggie-dark_maroon font-semibold'
                        : 'text-aggie-white hover:bg-aggie-gray-light'
                    }
                    ${item.gaOnly ? 'border-t border-gray-200 mt-4 pt-4' : ''}
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        <p>&copy; 2025 CMIS</p>
      </div>
    </aside>
  );
}
