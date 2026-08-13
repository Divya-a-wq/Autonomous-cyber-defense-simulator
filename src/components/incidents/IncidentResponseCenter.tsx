import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Shield,
  FileCode,
  CheckCircle2,
  Lock,
  Plus,
  User,
  Zap,
  Terminal,
  Paperclip,
  Check,
} from 'lucide-react';
import { MOCK_INCIDENTS } from '../../data/mockCyberData';
import { Incident } from '../../types/cyber';

interface IncidentResponseCenterProps {
  onExecuteAction: (actionName: string) => void;
}

export const IncidentResponseCenter: React.FC<IncidentResponseCenterProps> = ({
  onExecuteAction,
}) => {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident>(MOCK_INCIDENTS[0]);
  const [newNote, setNewNote] = useState<string>('');
  const [actionMessage, setActionMessage] = useState<string>('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const updated = { ...selectedIncident };
    updated.notes.push(newNote.trim());
    updated.timeline.push({
      timestamp: new Date().toLocaleTimeString(),
      event: `Analyst Note: ${newNote.trim()}`,
      type: 'analyst_note',
      actor: 'Alex Mercer',
    });
    setSelectedIncident(updated);
    setNewNote('');
  };

  const handleActionClick = (actionText: string) => {
    setActionMessage(`EXECUTED: ${actionText}`);
    onExecuteAction(actionText);
    setTimeout(() => setActionMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>INCIDENT RESPONSE & CASE MANAGEMENT CENTER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end incident management workflow, investigation timeline, evidence vault, and AI remediation execution.
          </p>
        </div>

        {actionMessage && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs animate-pulse">
            {actionMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Queue List (1 col) */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
            OPEN INCIDENTS ({incidents.length})
          </h2>

          <div className="space-y-3">
            {incidents.map((inc) => {
              const isSelected = selectedIncident.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {inc.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        inc.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 font-mono line-clamp-1">
                    {inc.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span>{inc.assignee}</span>
                    <span className="uppercase text-amber-400">{inc.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Incident Detail Suite (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {/* Title & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  CASE ID: {selectedIncident.id}
                </span>
                <h2 className="text-lg font-bold text-slate-100 font-mono mt-0.5">
                  {selectedIncident.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  Assignee: {selectedIncident.assignee}
                </span>
              </div>
            </div>

            {/* Evidence Vault */}
            <div>
              <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                <span>EVIDENCE VAULT ARTIFACTS</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedIncident.evidence.map((ev, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500">{ev.type}</span>
                    <p className="text-xs font-mono font-bold text-cyan-300 truncate">{ev.value}</p>
                    <p className="text-[10px] text-slate-400">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investigation Timeline */}
            <div>
              <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>FORENSIC INVESTIGATION TIMELINE</span>
              </h3>
              <div className="space-y-2 border-l-2 border-slate-800 pl-4">
                {selectedIncident.timeline.map((item, idx) => (
                  <div key={idx} className="relative space-y-0.5">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-bold">{item.actor}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-200">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Action Execution Buttons */}
            <div>
              <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>AI REMEDIATION PLAN & PLAYBOOK EXECUTION</span>
              </h3>

              <div className="space-y-2">
                {selectedIncident.remediationPlan.map((planStep, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <span className="text-xs font-mono text-slate-200">{planStep}</span>
                    <button
                      onClick={() => handleActionClick(planStep)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold shrink-0 transition-colors"
                    >
                      Execute Step
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Notes */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                ANALYST CASE NOTES
              </h3>

              <div className="space-y-2">
                {selectedIncident.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans">
                    {note}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add analyst note or evidence finding..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-sans"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
