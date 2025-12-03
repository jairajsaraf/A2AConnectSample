import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { GlassCard, PrimaryButton, InputField } from '../components/SharedComponents';

interface LoginProps {
  onLogin: (e: React.FormEvent) => void;
  onBackToHome: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBackToHome, onSignupClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#000000] z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#500000] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#2F3E51] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button onClick={onBackToHome} className="mb-6 flex items-center text-[#707070] hover:text-white transition-colors">
          <ArrowRight className="rotate-180 mr-2" size={16} /> Back to Home
        </button>

        <GlassCard className="p-8 border-t border-t-[#D6D3C4]/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D1D1D1] mb-2">Welcome Back</h2>
            <p className="text-[#D1D1D1] text-sm">Sign in to continue your Aggie journey</p>
          </div>

          <form onSubmit={onLogin}>
            <InputField icon={Mail} type="text" label="Aggie ID or Email" placeholder="user@tamu.edu" />
            <InputField icon={Lock} type="password" label="Password" placeholder="••••••••" />

            <div className="flex justify-end mb-6">
              <a href="#" className="text-xs text-[#D6D3C4] hover:text-white">Forgot Password?</a>
            </div>

            <PrimaryButton type="submit" className="w-full mb-4">Log In</PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Don't have an account? <button type="button" onClick={onSignupClick} className="text-[#D6D3C4] hover:underline">Sign Up</button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
