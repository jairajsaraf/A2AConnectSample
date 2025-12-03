import React from 'react';

// Shared UI Components

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

export const PrimaryButton = ({ children, onClick, className = "", type = "button" }: { children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; className?: string; type?: "button" | "submit" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg
    bg-[#500000] text-white hover:bg-[#3C0000] hover:shadow-maroon/20 border border-[#732f2f]/30 ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-bold transition-all border border-[#D6D3C4]/50 text-[#D6D3C4] hover:bg-[#D6D3C4]/10 ${className}`}
  >
    {children}
  </button>
);

export const InputField = ({ icon: Icon, type, placeholder, label }: { icon: any; type: string; placeholder: string; label: string }) => (
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
