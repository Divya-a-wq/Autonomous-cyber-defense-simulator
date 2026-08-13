import React, { useState } from 'react';
import {
  Zap,
  ShieldAlert,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Terminal,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { SIMULATION_SCENARIOS } from '../../data/mockCyberData';
import { SimulationScenario, NetworkNode } from '../../types/cyber';

interface AttackLabProps {
  nodes: NetworkNode[];
  onTriggerScenario: (scenarioId: string, targetNodeId?: string) => void;
}

export const AttackLab: React.FC<AttackLabProps> = ({
  nodes,
  onTriggerScenario,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(
    SIMULATION_SCENARIOS[0]
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-db-main');
  const [attackSpeed, setAttackSpeed] = useState<number>(2); // 1x, 2x, 5x
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [simulationLogHistory, setSimulationLogHistory] = useState<string[]>([]);

  const handleLaunch = () => {
    setIsRunning(true);
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] LAUNCHING SIMULATION: "${selectedScenario.name}" against target node [${selectedNodeId}]...`;
    setSimulationLogHistory((prev) => [newLog, ...prev]);

    onTriggerScenario(selectedScenario.id, selectedNodeId);

    setTimeout(() => {
      setIsRunning(false);
      setSimulationLogHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] SIMULATION COMPLETED. Security alerts generated & dispatched to Aegis Detection Agent.`,
        ...prev,
      ]);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>SAFE CYBER ATTACK SIMULATION LABORATORY</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Defensive training range. Simulates attack patterns and security logs without executing malicious code.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>ZERO REAL EXPLOITS • ISOLATED VIRTUAL RANGE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection Grid (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
            AVAILABLE DEFENSIVE TRAINING SCENARIOS ({SIMULATION_SCENARIOS.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIMULATION_SCENARIOS.map((scen) => {
              const isSelected = selectedScenario.id === scen.id;
              return (
                <div
                  key={scen.id}
                  onClick={() => setSelectedScenario(scen)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                        {scen.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          scen.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {scen.severity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-100 font-mono">
                      {scen.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {scen.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span className="text-cyan-400 font-bold">{scen.mitreCode}</span>
                    <span>{scen.simulatedLogsCount} Logs</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Scenario Builder */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold font-mono text-cyan-400 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>CUSTOM SCENARIO BUILDER</span>
            </h3>
            <p className="text-xs text-slate-400">
              Inject custom simulated telemetry queries or payload triggers into the log pipeline:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Simulate WebShell upload on Nginx port 443 with base64 payload"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
              />
              <button
                onClick={() => {
                  if (!customPrompt) return;
                  setSimulationLogHistory((prev) => [
                    `[${new Date().toLocaleTimeString()}] CUSTOM TRIGGER: ${customPrompt}`,
                    ...prev,
                  ]);
                  onTriggerScenario('sim-custom', selectedNodeId);
                  setCustomPrompt('');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold text-xs font-mono shrink-0"
              >
                Inject Logs
              </button>
            </div>
          </div>
        </div>

        {/* Execution Control Panel & Output Console (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>SIMULATION PARAMETERS</span>
            </h2>

            {/* Target Node Selection */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                TARGET NETWORK NODE
              </label>
              <select
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} ({n.ip}) - [{n.status.toUpperCase()}]
                  </option>
                ))}
              </select>
            </div>

            {/* Attack Speed Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                ATTACK INTENSITY & SPEED
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setAttackSpeed(s)}
                    className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${
                      attackSpeed === s
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s}x Speed
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleLaunch}
              disabled={isRunning}
              className={`w-full py-3.5 rounded-xl font-bold font-mono text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                isRunning
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950 hover:scale-[1.02]'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? 'EXECUTING SIMULATION...' : 'LAUNCH SIMULATION'}</span>
            </button>
          </div>

          {/* Console Telemetry Output */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>SIMULATION OUTPUT CONSOLE</span>
              </span>
              <button
                onClick={() => setSimulationLogHistory([])}
                className="text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>

            <div className="h-44 overflow-y-auto space-y-1 font-mono text-[11px] text-slate-300 leading-tight">
              {simulationLogHistory.length === 0 ? (
                <p className="text-slate-600 italic">No simulation logs in current session. Select a scenario and launch.</p>
              ) : (
                simulationLogHistory.map((log, idx) => (
                  <p key={idx} className="text-emerald-400">
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
