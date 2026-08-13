import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, ShieldCheck, Zap } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const SecurityAnalytics: React.FC = () => {
  const trendData = [
    { time: '00:00', attacks: 12, riskScore: 30, aiBlocked: 12 },
    { time: '02:00', attacks: 18, riskScore: 35, aiBlocked: 18 },
    { time: '04:00', attacks: 45, riskScore: 55, aiBlocked: 44 },
    { time: '06:00', attacks: 80, riskScore: 78, aiBlocked: 79 },
    { time: '08:00', attacks: 35, riskScore: 48, aiBlocked: 35 },
    { time: '10:00', attacks: 25, riskScore: 40, aiBlocked: 25 },
    { time: '12:00', attacks: 60, riskScore: 68, aiBlocked: 59 },
    { time: '14:00', attacks: 92, riskScore: 88, aiBlocked: 91 },
  ];

  const categoryData = [
    { name: 'Brute Force SSH', value: 42, color: '#f43f5e' },
    { name: 'Ransomware Canary', value: 28, color: '#f59e0b' },
    { name: 'DNS Tunneling', value: 18, color: '#06b6d4' },
    { name: 'Phishing Links', value: 12, color: '#a855f7' },
  ];

  const agentSLAData = [
    { agent: 'Aegis Detection', avgMs: 140, accuracy: 98.9 },
    { agent: 'Vanguard Containment', avgMs: 420, accuracy: 97.8 },
    { agent: 'Phoenix Restoration', avgMs: 1200, accuracy: 99.4 },
    { agent: 'Cipher Patch Gen', avgMs: 850, accuracy: 96.5 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>SECURITY ANALYTICS & AI PERFORMANCE METRICS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quantitative analysis of threat frequency, response SLA times, detection accuracy, and risk trends.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AI ACCURACY RATE: 98.2%</span>
        </div>
      </div>

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-500">24H ATTACK VOLUMES</span>
          <p className="text-2xl font-bold font-mono text-cyan-300 mt-1">364 Events</p>
          <span className="text-[10px] font-mono text-emerald-400">↑ 14% vs yesterday</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-500">AUTOMATED CONTAINMENT %</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">99.2%</p>
          <span className="text-[10px] font-mono text-slate-400">Zero human intervention needed</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-500">AVERAGE TIME TO CONTAIN (MTTR)</span>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">1.2 Seconds</p>
          <span className="text-[10px] font-mono text-slate-400">SLA target &lt; 5.0s</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-500">SYSTEM HEALTH SCORE</span>
          <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">94.8 / 100</p>
          <span className="text-[10px] font-mono text-emerald-400">Normal Range</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Attack Frequency & Risk Score Trend */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold font-mono text-slate-200">
              ATTACK FREQUENCY & RISK INDEX OVER TIME
            </h2>
            <span className="text-[10px] font-mono text-slate-500">24 HOUR WINDOW</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="attacks" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAttacks)" name="Attacks Detected" />
                <Area type="monotone" dataKey="riskScore" stroke="#f43f5e" fillOpacity={0} name="Risk Index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Threat Categories Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold font-mono text-slate-200">
              THREAT CATEGORY DISTRIBUTION (%)
            </h2>
            <span className="text-[10px] font-mono text-slate-500">MITRE MAPPED</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: AI Agents SLA Latency */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold font-mono text-slate-200">
              AI AGENTS PERFORMANCE & LATENCY SLA (MILLISECONDS)
            </h2>
            <span className="text-[10px] font-mono text-emerald-400">ALL AGENTS HEALTHY</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentSLAData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="agent" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="avgMs" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Response Time (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
