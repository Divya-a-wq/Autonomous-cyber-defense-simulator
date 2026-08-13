import React, { useState } from 'react';
import { Shield, Lock, Mail, User, CheckCircle, Chrome } from 'lucide-react';
import { UserProfile } from '../../types/cyber';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.mercer@sentinel.ai');
  const [name, setName] = useState('Alex Mercer');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserProfile['role']>('Lead Incident Responder');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'SOC Analyst',
      email: email || 'analyst@sentinel.ai',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      token: `jwt-token-${Date.now()}`,
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleGoogleOAuth = () => {
    const newUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      name: 'Google Workspace User',
      email: 'divyanishad2316@gmail.com',
      role: 'SOC Analyst L2',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      token: `jwt-oauth-${Date.now()}`,
    };
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-cyan-900/60 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-in fade-in zoom-in-95">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {isSignUp ? 'Create Sentinel AI SOC Account' : 'Authenticate SOC Analyst'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Secure Role-Based Access Control System
          </p>
        </div>

        <button
          onClick={handleGoogleOAuth}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all mb-4"
        >
          <Chrome className="w-4 h-4 text-cyan-400" />
          <span>Sign in with Google Workspace</span>
        </button>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-mono">OR JWT SESSION</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">FULL NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  placeholder="Analyst Name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">SOC WORK EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
                placeholder="name@sentinel.ai"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">PASSPHRASE</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">ASSIGNED SOC ROLE</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
            >
              <option value="Lead Incident Responder">Lead Incident Responder</option>
              <option value="SOC Analyst L2">SOC Analyst L2</option>
              <option value="SOC Analyst L1">SOC Analyst L1</option>
              <option value="SecOps Admin">SecOps Admin</option>
              <option value="Red Team Operator">Red Team Operator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/30 transition-all mt-4"
          >
            {isSignUp ? 'Create SOC Account' : 'Authenticate & Enter SOC'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-cyan-400 hover:underline font-mono"
          >
            {isSignUp ? 'Already registered? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-300 font-mono">
            [Cancel / Close]
          </button>
        </div>
      </div>
    </div>
  );
};
