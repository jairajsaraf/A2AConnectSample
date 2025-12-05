'use client';

import { useState, useEffect } from 'react';

interface UserData {
  userId: string;
  email: string;
  name: string;
  major_program?: string;
  grad_year?: string;
  role: string;
}

export default function Topbar() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return null;
  }

  // Format name to Title Case
  const formatName = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');

  // Initials in ALL CAPS
  const getInitials = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .map((n) => n[0] || '')
      .join('')
      .toUpperCase();

  const displayName = formatName(user.name);
  const initials = getInitials(user.name);

  return (
    <header
      className="h-16 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-8
                 bg-[#121212]/95 border-b border-[#2a2a2a] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
    >
      {/* Left tagline */}
      <div className="flex items-center gap-4">
        <span className="h-9 w-1 rounded-full bg-aggie-maroon" />
        <div className="leading-tight">
          <p className="text-lg font-semibold tracking-tight text-white">
            Always an Aggie.
          </p>
          <p className="text-sm text-[#c0c0c0]">
            There for you, here for you.
          </p>
        </div>
      </div>

      {/* User profile on the right */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-white">
            {displayName}
          </p>
          <p className="text-xs text-[#b0b0b0]">
            {user.email}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-aggie-maroon">
          {initials}
        </div>
      </div>
    </header>
  );
}
