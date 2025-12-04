'use client';

import { CURRENT_USER } from '@/lib/mockData';

export default function Topbar() {
  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-6">
      {/* Search bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events, people..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aggie-light focus:border-transparent"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3 ml-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{CURRENT_USER.name}</p>
          <p className="text-xs text-gray-500">{CURRENT_USER.email}</p>
        </div>
        <div className="w-10 h-10 bg-aggie-light rounded-full flex items-center justify-center text-white font-semibold">
          {CURRENT_USER.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </header>
  );
}
