import React from 'react';
import {
  LayoutDashboard,
  Network,
  Zap,
  Bot,
  BrainCircuit,
  FileText,
  AlertTriangle,
  Globe,
  BarChart3,
  Box,
  Terminal,
  FileCheck,
  Settings,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeAlertsCount,
}) => {
  const navItems = [
    { id: 'landing', label: 'Public Portal', icon: Sparkles },
    { id: 'dashboard', label: 'SOC Dashboard', icon: LayoutDashboard },
    { id: 'topology', label: 'Network Topology', icon: Network },
    { id: 'simulations', label: 'Attack Lab', icon: Zap, badge: 'HOT' },
    { id: 'agents', label: 'AI Defense Agents', icon: Bot, badge: '4' },
    { id: 'explanation', label: 'AI Forensic Engine', icon: BrainCircuit },
    { id: 'logs', label: 'Log Explorer', icon: FileText },
    {
      id: 'incidents',
      label: 'Incident Response',
      icon: AlertTriangle,
      count: activeAlertsCount,
    },
    { id: 'threat-intel', label: 'Threat Intelligence', icon: Globe },
    { id: 'analytics', label: 'Security Analytics', icon: BarChart3 },
    { id: 'containers', label: 'Docker Sandbox', icon: Box },
    { id: 'terminal', label: 'SOC Terminal', icon: Terminal },
    { id: 'reports', label: 'PDF Reports', icon: FileCheck },
    { id: 'settings', label: 'Settings & Audit', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-cyan-900/30 flex flex-col justify-between py-3 px-2 select-none shrink-0 overflow-y-auto">
      <div className="space-y-1">
        <div className="px-3 py-1.5 mb-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Defense Laboratory Navigation
          </p>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950 to-blue-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 m-1 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] font-mono space-y-2">
        <div className="flex items-center justify-between text-slate-300 font-bold">
          <span>AI AGENT STATUS</span>
          <span className="text-emerald-400">4/4 ONLINE</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-emerald-400 animate-pulse" />
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Gemini 3.6 Flash Server Engine active. Zero real exploit execution. Safe virtual lab environment.
        </p>
      </div>
    </aside>
  );
};
