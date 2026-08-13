import React, { useState } from 'react';
import {
  Box,
  Play,
  Square,
  RotateCcw,
  Lock,
  Terminal,
  Cpu,
  HardDrive,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { MOCK_CONTAINERS } from '../../data/mockCyberData';
import { ContainerNode } from '../../types/cyber';

export const DockerSandbox: React.FC = () => {
  const [containers, setContainers] = useState<ContainerNode[]>(MOCK_CONTAINERS);
  const [selectedContainer, setSelectedContainer] = useState<ContainerNode>(MOCK_CONTAINERS[0]);
  const [activeTab, setActiveTab] = useState<'logs' | 'env' | 'stats'>('logs');

  const handleContainerAction = (
    id: string,
    action: 'start' | 'stop' | 'isolate' | 'restart'
  ) => {
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          let status = c.status;
          if (action === 'start') status = 'running';
          if (action === 'stop') status = 'stopped';
          if (action === 'isolate') status = 'isolated';
          if (action === 'restart') status = 'running';
          return { ...c, status };
        }
        return c;
      })
    );
    if (selectedContainer.id === id) {
      let status = selectedContainer.status;
      if (action === 'start') status = 'running';
      if (action === 'stop') status = 'stopped';
      if (action === 'isolate') status = 'isolated';
      if (action === 'restart') status = 'running';
      setSelectedContainer({ ...selectedContainer, status });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            <span>DOCKER VIRTUAL SANDBOX & CONTAINER ENGINE</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulated Linux and Windows containers isolated in sandboxed virtual bridges for safe security testing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>DOCKER DAEMON v26.1 - VIRTUAL BRIDGE ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Container Manager List (1 col) */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
            VIRTUAL CONTAINER INSTANCES ({containers.length})
          </h2>

          <div className="space-y-3">
            {containers.map((cnt) => {
              const isSelected = selectedContainer.id === cnt.id;
              return (
                <div
                  key={cnt.id}
                  onClick={() => setSelectedContainer(cnt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {cnt.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        cnt.status === 'running'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : cnt.status === 'isolated'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {cnt.status}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    IMAGE: {cnt.image}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span>IP: {cnt.ip}</span>
                    <span>CPU: {cnt.cpuPercent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Container Inspector & Live Output (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            {/* Top Info & Control Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  CONTAINER ID: {selectedContainer.id}
                </span>
                <h2 className="text-lg font-bold font-mono text-slate-100">
                  {selectedContainer.name}
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  {selectedContainer.image}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleContainerAction(selectedContainer.id, 'start')}
                  className="p-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 transition-colors"
                  title="Start Container"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleContainerAction(selectedContainer.id, 'stop')}
                  className="p-2 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300 transition-colors"
                  title="Stop Container"
                >
                  <Square className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleContainerAction(selectedContainer.id, 'isolate')}
                  className="p-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500/50 text-purple-300 transition-colors"
                  title="Isolate Interface"
                >
                  <Lock className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleContainerAction(selectedContainer.id, 'restart')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
                  title="Restart Container"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Container Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">CONTAINER IP</span>
                <p className="font-bold text-cyan-300 mt-0.5">{selectedContainer.ip}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">EXPOSED PORTS</span>
                <p className="font-bold text-slate-200 mt-0.5">{selectedContainer.ports}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">MEMORY ALLOCATED</span>
                <p className="font-bold text-slate-200 mt-0.5">{selectedContainer.memUsageMB} MB</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">UPTIME</span>
                <p className="font-bold text-emerald-400 mt-0.5">{selectedContainer.uptime}</p>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex border-b border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-4 py-2 font-bold border-b-2 transition-colors ${
                  activeTab === 'logs'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                STDOUT LOGS
              </button>
              <button
                onClick={() => setActiveTab('env')}
                className={`px-4 py-2 font-bold border-b-2 transition-colors ${
                  activeTab === 'env'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                ENVIRONMENT VARS
              </button>
            </div>

            {/* Tab Content Output */}
            {activeTab === 'logs' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 space-y-1 h-56 overflow-y-auto">
                <p>[container-init] Booting virtual instance {selectedContainer.name}...</p>
                <p>[kernel] Mounted virtual bridge /dev/net/tun0</p>
                <p>[systemd] Started security monitoring daemon falco-agent v0.38</p>
                <p>[network] Binding port interface {selectedContainer.ports} [STATUS: OK]</p>
                <p>[app] Application listener active on {selectedContainer.ip}</p>
                {selectedContainer.status === 'isolated' && (
                  <p className="text-purple-400">[WARNING] Network interface disconnected by Vanguard Agent.</p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1 h-56 overflow-y-auto">
                <p>PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin</p>
                <p>NODE_ENV=production</p>
                <p>CONTAINER_ID={selectedContainer.id}</p>
                <p>SENTINEL_GUARD_ENABLED=true</p>
                <p>SECURITY_POLICY=STRICT_ZERO_TRUST</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
