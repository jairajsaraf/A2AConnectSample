import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { GlassCard, PrimaryButton, InputField } from '../components/SharedComponents';

interface SignupProps {
  onSignup: (e: React.FormEvent) => void;
  onBackToHome: () => void;
  onLoginClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onBackToHome, onLoginClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#000000] z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#500000] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2F3E51] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button onClick={onBackToHome} className="mb-6 flex items-center text-[#707070] hover:text-white transition-colors">
          <ArrowRight className="rotate-180 mr-2" size={16} /> Back to Home
        </button>

        <GlassCard className="p-8 border-t border-t-[#D6D3C4]/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D6D3C4] to-white mb-2">Get Started</h2>
            <p className="text-[#D1D1D1] text-sm">Join the network of thousands of Aggies</p>
          </div>

          <form onSubmit={onSignup}>
            <InputField icon={Mail} type="text" label="Aggie ID or Email" placeholder="user@tamu.edu" />
            <InputField icon={Lock} type="password" label="Password" placeholder="••••••••" />
            <InputField icon={Lock} type="password" label="Confirm Password" placeholder="••••••••" />

            <PrimaryButton type="submit" className="w-full mb-4 mt-6">Create Account</PrimaryButton>

            <p className="text-center text-[#707070] text-sm">
              Already have an account? <button type="button" onClick={onLoginClick} className="text-[#D6D3C4] hover:underline">Log In</button>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Signup;
