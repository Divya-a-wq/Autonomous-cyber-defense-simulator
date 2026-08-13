import React, { useState } from 'react';
import {
  Globe,
  ShieldAlert,
  Search,
  ExternalLink,
  Lock,
  Cpu,
  Radio,
  FileCode,
  Layers,
} from 'lucide-react';
import { MOCK_THREAT_INTEL } from '../../data/mockCyberData';
import { ThreatIntelItem } from '../../types/cyber';

export const ThreatIntelHub: React.FC = () => {
  const [intelItems] = useState<ThreatIntelItem[]>(MOCK_THREAT_INTEL);
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = intelItems.filter((item) => {
    if (activeType !== 'all' && item.type !== activeType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.indicator.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.threatActor && item.threatActor.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>GLOBAL THREAT INTELLIGENCE HUB</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time feed of Indicators of Compromise (IOCs), malicious IP clusters, C2 domains, and nation-state threat actors.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>CYBER THREAT FEED: SYNCHRONIZED</span>
        </div>
      </div>

      {/* Global Attack Map Visualizer Simulation */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-900/40 min-h-[220px] relative overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(#082f49_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-900 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>LIVE GLOBAL ATTACK MAP SIMULATION</span>
          </div>
          <span className="text-slate-500">INGEST: 142 IOC/MIN</span>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 my-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500">ACTIVE APT THREAT ACTORS</span>
            <p className="text-lg font-bold text-rose-400 mt-0.5">APT29, Lazarus, FIN7</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500">MALICIOUS TOR EXIT NODES</span>
            <p className="text-lg font-bold text-amber-400 mt-0.5">1,420 Tracked</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500">ACTIVE C2 BOTNETS</span>
            <p className="text-lg font-bold text-cyan-400 mt-0.5">Darknet-DNS, LockBit</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500">ZERO-DAY CVE MONITOR</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">CVE-2026-1189</p>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-500">
          <span>SOURCE DATASETS: CISA / MITRE ATT&CK / MISP / ALIENVAULT OTX</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IP, hash, domain, or threat actor..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
          />
        </div>

        {['all', 'ip', 'hash', 'domain', 'cve'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase border transition-colors ${
              activeType === t
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* IOC Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((ioc) => (
          <div
            key={ioc.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                {ioc.type} INDICATOR
              </span>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                RISK SCORE: {ioc.riskScore}/100
              </span>
            </div>

            <div>
              <p className="text-sm font-bold font-mono text-slate-100 break-all select-all">
                {ioc.indicator}
              </p>
              {ioc.threatActor && (
                <p className="text-xs font-mono text-amber-400 mt-1">
                  THREAT ACTOR: {ioc.threatActor}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {ioc.description}
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
              <span className="text-cyan-400">{ioc.mitreReference}</span>
              <span>Last Seen: {ioc.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
