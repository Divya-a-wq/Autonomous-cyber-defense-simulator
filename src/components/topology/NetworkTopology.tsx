import React, { useState } from 'react';
import {
  Server,
  Shield,
  Database,
  Monitor,
  Cloud,
  Cpu,
  Lock,
  Radio,
  Activity,
  AlertOctagon,
  CheckCircle,
  RefreshCw,
  Zap,
  Terminal,
  FileText,
  X,
} from 'lucide-react';
import { NetworkNode } from '../../types/cyber';

interface NetworkTopologyProps {
  nodes: NetworkNode[];
  onIsolateNode: (nodeId: string) => void;
  onRestoreNode: (nodeId: string) => void;
  onScanNode: (nodeId: string) => void;
}

export const NetworkTopology: React.FC<NetworkTopologyProps> = ({
  nodes,
  onIsolateNode,
  onRestoreNode,
  onScanNode,
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(nodes[2] || null);

  const getNodeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'firewall':
        return Shield;
      case 'database':
        return Database;
      case 'workstation':
        return Monitor;
      case 'cloud':
        return Cloud;
      case 'container':
        return Cpu;
      default:
        return Server;
    }
  };

  const getStatusColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'healthy':
        return 'border-emerald-500/60 bg-emerald-950/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'warning':
        return 'border-amber-500/60 bg-amber-950/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'compromised':
        return 'border-rose-500/80 bg-rose-950/40 text-rose-400 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.4)]';
      case 'isolated':
      case 'quarantined':
        return 'border-purple-500/60 bg-purple-950/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE NETWORK TOPOLOGY SIMULATOR</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual node graph mapping servers, firewalls, cloud pods, and workstation endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Healthy</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>Compromised</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/40 text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Isolated</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Network Canvas (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-950 border border-cyan-900/40 p-6 min-h-[500px] relative overflow-hidden flex flex-col justify-between">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Connected SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="100" y1="220" x2="280" y2="220" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" />
            <line x1="280" y1="220" x2="480" y2="100" stroke="#0284c7" strokeWidth="2" />
            <line x1="280" y1="220" x2="480" y2="340" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="480" y1="100" x2="680" y2="120" stroke="#0284c7" strokeWidth="2" />
            <line x1="480" y1="340" x2="680" y2="320" stroke="#0284c7" strokeWidth="2" />
            <line x1="680" y1="320" x2="860" y2="220" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Node Elements */}
          <div className="relative w-full h-[440px] select-none">
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 ${getStatusColor(
                    node.status
                  )} ${
                    isSelected
                      ? 'ring-4 ring-cyan-400/50 scale-110 z-20'
                      : 'hover:scale-105 z-10'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[11px] font-bold font-mono tracking-tight text-center whitespace-nowrap text-slate-100">
                    {node.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {node.ip}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
            <span>TRAFFIC PROTOCOLS: TLS 1.3 / IPSEC / SSHv2</span>
            <span>CLICK NODE TO INSPECT TELEMETRY</span>
          </div>
        </div>

        {/* Node Inspector Side Panel (1 col) */}
        {selectedNode ? (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-bold font-mono text-slate-100">
                  {selectedNode.name}
                </h2>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  selectedNode.status === 'healthy'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : selectedNode.status === 'compromised'
                    ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                    : 'bg-purple-500/20 text-purple-300'
                }`}
              >
                {selectedNode.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">IP ADDRESS</span>
                <p className="font-bold text-cyan-300 mt-0.5">{selectedNode.ip}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">SECURITY SCORE</span>
                <p className="font-bold text-emerald-400 mt-0.5">
                  {selectedNode.securityScore} / 100
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">CPU LOAD</span>
                <p className="font-bold text-slate-200 mt-0.5">{selectedNode.cpuUsage}%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">RAM USAGE</span>
                <p className="font-bold text-slate-200 mt-0.5">{selectedNode.memoryUsage}%</p>
              </div>
            </div>

            {/* Vulnerabilities */}
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                DETECTED VULNERABILITIES ({selectedNode.vulnerabilities.length})
              </span>
              {selectedNode.vulnerabilities.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedNode.vulnerabilities.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs font-mono"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No active critical vulnerabilities found.</span>
                </div>
              )}
            </div>

            {/* Open Ports & Services */}
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                SERVICES & OPEN PORTS
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {selectedNode.openPorts.map((port) => (
                  <span
                    key={port}
                    className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800"
                  >
                    Port {port}
                  </span>
                ))}
              </div>
            </div>

            {/* Defensive Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-400 block">
                SOC DEFENSIVE ACTIONS
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onIsolateNode(selectedNode.id)}
                  className="py-2.5 px-3 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/50 text-purple-200 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Isolate Node</span>
                </button>

                <button
                  onClick={() => onScanNode(selectedNode.id)}
                  className="py-2.5 px-3 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Node</span>
                </button>
              </div>

              <button
                onClick={() => onRestoreNode(selectedNode.id)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Restore Clean Image Snapshot</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500 font-mono text-xs">
            <Server className="w-10 h-10 mb-2 opacity-50 text-cyan-400" />
            <p>Select any node on the network topology map to inspect state and execute defense playbooks.</p>
          </div>
        )}
      </div>
    </div>
  );
};
