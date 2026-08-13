import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Play,
  Pause,
  Download,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Terminal,
} from 'lucide-react';
import { INITIAL_LOGS } from '../../data/mockCyberData';
import { SecurityLog, Severity } from '../../types/cyber';

export const LogExplorer: React.FC = () => {
  const [logs, setLogs] = useState<SecurityLog[]>(INITIAL_LOGS);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [facilityFilter, setFacilityFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [anomalyOnly, setAnomalyOnly] = useState<boolean>(false);

  // Live log stream simulator
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomFacility = ['auth', 'system', 'network', 'firewall', 'container'][
        Math.floor(Math.random() * 5)
      ] as any;
      const isAnomaly = Math.random() > 0.65;

      const newLog: SecurityLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        sourceIp: `192.168.1.${Math.floor(Math.random() * 200 + 10)}`,
        destinationIp: `10.0.1.${Math.floor(Math.random() * 50 + 10)}`,
        facility: randomFacility,
        severity: isAnomaly ? 'critical' : 'low',
        message: isAnomaly
          ? `ANOMALY DETECTED: Rapid rate limit exceed on facility [${randomFacility}]`
          : `TLS Session keep-alive ACK on interface eth0`,
        rawPayload: `aug 13 ${timeStr} kernel[102]: facility=${randomFacility} status=${
          isAnomaly ? 'ERR_ANOMALY' : 'OK'
        }`,
        isAnomaly,
        mitreTechnique: isAnomaly ? 'T1071' : undefined,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  // Filter logic
  const filteredLogs = logs.filter((log) => {
    if (anomalyOnly && !log.isAnomaly) return false;
    if (facilityFilter !== 'all' && log.facility !== facilityFilter) return false;
    if (severityFilter !== 'all' && log.severity !== severityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.message.toLowerCase().includes(q) ||
        log.sourceIp.includes(q) ||
        log.destinationIp.includes(q) ||
        log.rawPayload.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportLogsAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sentinel_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>REAL-TIME SECURITY LOG EXPLORER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            High-throughput ingest stream parsing authentication, firewall, system, and container facility logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
              isLive
                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {isLive ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isLive ? 'STREAMING LIVE' : 'PAUSED'}</span>
          </button>

          <button
            onClick={exportLogsAsJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IP, payload, technique, or message..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono"
          />
        </div>

        {/* Facility Filter */}
        <select
          value={facilityFilter}
          onChange={(e) => setFacilityFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono uppercase"
        >
          <option value="all">ALL FACILITIES</option>
          <option value="auth">AUTH</option>
          <option value="system">SYSTEM</option>
          <option value="network">NETWORK</option>
          <option value="firewall">FIREWALL</option>
          <option value="container">CONTAINER</option>
        </select>

        {/* Severity Filter */}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-mono uppercase"
        >
          <option value="all">ALL SEVERITIES</option>
          <option value="critical">CRITICAL</option>
          <option value="high">HIGH</option>
          <option value="medium">MEDIUM</option>
          <option value="low">LOW</option>
        </select>

        {/* Anomaly Only Toggle */}
        <button
          onClick={() => setAnomalyOnly(!anomalyOnly)}
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
            anomalyOnly
              ? 'bg-rose-950 border-rose-500/50 text-rose-300'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}
        >
          {anomalyOnly ? '• ANOMALIES ONLY' : 'SHOW ALL LOGS'}
        </button>
      </div>

      {/* Log Stream Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
        <div className="grid grid-cols-12 gap-2 p-3 bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
          <div className="col-span-2">TIMESTAMP</div>
          <div className="col-span-1">FACILITY</div>
          <div className="col-span-2">SRC / DST IP</div>
          <div className="col-span-5">LOG MESSAGE</div>
          <div className="col-span-2 text-right">SEVERITY / MITRE</div>
        </div>

        <div className="divide-y divide-slate-900 max-h-[500px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`grid grid-cols-12 gap-2 p-3 hover:bg-slate-900/60 transition-colors ${
                log.isAnomaly ? 'bg-rose-950/10 border-l-2 border-l-rose-500' : ''
              }`}
            >
              <div className="col-span-2 text-slate-400 flex items-center gap-1.5">
                <span className="text-slate-500">{log.timestamp}</span>
              </div>

              <div className="col-span-1 uppercase text-cyan-400 font-bold">
                {log.facility}
              </div>

              <div className="col-span-2 text-slate-300 truncate">
                {log.sourceIp} → {log.destinationIp}
              </div>

              <div className="col-span-5 text-slate-200 truncate">
                {log.message}
              </div>

              <div className="col-span-2 text-right flex items-center justify-end gap-2">
                {log.mitreTechnique && (
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                    {log.mitreTechnique}
                  </span>
                )}
                <span
                  className={`px-1.5 py-0.2 rounded uppercase text-[10px] font-bold ${
                    log.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-300'
                      : log.severity === 'high'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {log.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
