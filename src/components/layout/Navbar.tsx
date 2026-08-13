import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Activity,
  Cpu,
  Lock,
  User,
  Bell,
  Sparkles,
  Search,
  Terminal,
  Zap,
  Radio,
  Clock,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import { UserProfile } from '../../types/cyber';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  riskScore: number;
  activeAlertsCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onQuickSimulate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  riskScore,
  activeAlertsCount,
  darkMode,
  setDarkMode,
  onQuickSimulate,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score < 70) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30 animate-pulse';
  };

  return (
    <header className="h-16 border-b border-cyan-900/40 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-all">
            <ShieldAlert className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                SENTINEL<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                SOC v3.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Autonomous Cyber Defense Lab
            </p>
          </div>
        </button>

        {/* Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-slate-300">SYSTEM: ONLINE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">LATENCY: 14ms</span>
        </div>
      </div>

      {/* Middle Status Indicators */}
      <div className="hidden md:flex items-center gap-3">
        {/* Risk Score */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${getRiskColor(riskScore)}`}>
          <Activity className="w-4 h-4" />
          <span>RISK INDEX:</span>
          <span className="font-bold text-sm">{riskScore}/100</span>
        </div>

        {/* Active Threat Counter */}
        <button
          onClick={() => setActiveTab('incidents')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:border-slate-700 text-xs font-mono text-slate-300 transition-colors"
        >
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span>ACTIVE THREATS:</span>
          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
            {activeAlertsCount}
          </span>
        </button>

        {/* Quick Launch Simulation */}
        <button
          onClick={onQuickSimulate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/30 transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Simulate Attack</span>
        </button>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3">
        {/* Terminal Shortcut Button */}
        <button
          onClick={() => setActiveTab('terminal')}
          title="Open SOC Terminal"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Terminal className="w-4 h-4" />
        </button>

        {/* Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{timeStr || '03:04:00 UTC'}</span>
        </div>

        {/* Dark/Light mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          title="Toggle Theme Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* User Auth Profile Button */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-cyan-500/50"
              />
              <div className="hidden xl:block">
                <p className="text-xs font-medium text-slate-200 leading-tight">{user.name}</p>
                <p className="text-[10px] text-cyan-400 font-mono leading-tight">{user.role}</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-200">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors mt-1"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Profile & Settings</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-semibold font-mono transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>SOC Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
