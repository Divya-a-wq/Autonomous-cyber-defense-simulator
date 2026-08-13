import React from 'react';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Bot,
  Zap,
  Radio,
  BarChart2,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Lock,
} from 'lucide-react';
import { Alert, AIAgent, NetworkNode } from '../../types/cyber';

interface SOCDashboardProps {
  alerts: Alert[];
  agents: AIAgent[];
  nodes: NetworkNode[];
  riskScore: number;
  onSelectAlert: (alert: Alert) => void;
  onTriggerSim: () => void;
  onNavigateTab: (tab: string) => void;
}

export const SOCDashboard: React.FC<SOCDashboardProps> = ({
  alerts,
  agents,
  nodes,
  riskScore,
  onSelectAlert,
  onTriggerSim,
  onNavigateTab,
}) => {
  const compromisedCount = nodes.filter(
    (n) => n.status === 'compromised' || n.status === 'quarantined'
  ).length;

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const highCount = alerts.filter((a) => a.severity === 'high').length;
  const medCount = alerts.filter((a) => a.severity === 'medium').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-900/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-xl font-bold text-slate-100 font-mono">
              SECURITY OPERATIONS CENTER (SOC)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, autonomous agent containment, and threat intelligence metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onTriggerSim}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Simulate Attack Scenario</span>
          </button>
          <button
            onClick={() => onNavigateTab('topology')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 text-xs font-bold transition-colors"
          >
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Network Map</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Risk Index */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>NETWORK RISK SCORE</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-cyan-300">
              {riskScore}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="mt-2 w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                riskScore > 70
                  ? 'bg-rose-500'
                  : riskScore > 40
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        {/* Active Threat Alerts */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ACTIVE ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-400">
              {alerts.length}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
              {criticalCount} CRITICAL
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-mono">
            {highCount} High, {medCount} Medium severity
          </p>
        </div>

        {/* Compromised Machines */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>COMPROMISED MACHINES</span>
            <Server className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-rose-400">
              {compromisedCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ {nodes.length} Nodes</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-mono">
            Auto-quarantine engine active
          </p>
        </div>

        {/* AI Defense SLA */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>AUTO-RESPONSE SLA</span>
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              1.2s
            </span>
            <span className="text-xs text-emerald-500 font-mono">99.4% Auto</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-mono">
            Average automated containment time
          </p>
        </div>
      </div>

      {/* Main Grid: Alerts Queue & AI Agent Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts Queue (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-slate-100 font-mono">ACTIVE THREAT ALERTS QUEUE</h2>
            </div>
            <button
              onClick={() => onNavigateTab('incidents')}
              className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
            >
              <span>View Incidents</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert)}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          alert.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : alert.severity === 'high'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {alert.mitreCode}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {alert.timestamp.split('T')[1]?.slice(0, 8) || '03:02:45'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {alert.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {alert.summary}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                      {alert.confidenceScore}% CONF
                    </span>
                    <p className="text-[10px] font-mono text-slate-500 mt-2">
                      Target: {alert.targetNodeName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Status Matrix (1 col) */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-slate-100 font-mono">AI AGENTS STATUS</h2>
            </div>
            <button
              onClick={() => onNavigateTab('agents')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Configure
            </button>
          </div>

          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      {agent.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                    {agent.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-snug">
                  {agent.lastAction}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                  <span>ACTIONS: {agent.actionsTakenCount}</span>
                  <span className="text-cyan-400">CONF: {agent.confidenceAvg}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
