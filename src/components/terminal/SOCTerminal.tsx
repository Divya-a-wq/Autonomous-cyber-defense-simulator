import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, ShieldAlert, CornerDownLeft } from 'lucide-react';
import { sendAIChatMessage } from '../../services/api';

export const SOCTerminal: React.FC = () => {
  const [history, setHistory] = useState<
    { type: 'input' | 'output' | 'error' | 'gemini'; text: string }[]
  >([
    {
      type: 'output',
      text: 'SENTINEL AI SOC COMMAND CLI [v3.4.0-enterprise]',
    },
    {
      type: 'output',
      text: 'Type "help" for list of SOC commands or "gemini <question>" for AI reasoning.',
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim();
    setInputVal('');

    setHistory((prev) => [...prev, { type: 'input', text: `soc-analyst@sentinel-cli:~$ ${cmd}` }]);

    const parts = cmd.split(' ');
    const rootCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    if (rootCmd === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `AVAILABLE SOC TERMINAL COMMANDS:
  help                    - Display command manual
  status                  - Check SOC system & risk score
  logs                    - View last 5 security log entries
  agents                  - Inspect 4 AI defense agents state
  isolate <node_id>       - Isolate network interface of target node
  scan <ip>               - Execute vulnerability Nmap scan
  docker ps               - List virtual Docker container instances
  gemini <query>          - Ask Gemini AI cybersecurity questions directly
  clear                   - Clear CLI output buffer`,
        },
      ]);
    } else if (rootCmd === 'status') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `SOC SYSTEM STATUS:
  Network Risk Score: 64/100 [ELEVATED]
  Active Alerts: 4 (1 Critical, 2 High, 1 Medium)
  AI Defense Agents: 4/4 ONLINE (Aegis, Vanguard, Phoenix, Cipher)
  Containment Engine: ACTIVE (1 Docker container quarantined)`,
        },
      ]);
    } else if (rootCmd === 'logs') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `RECENT LOGS:
  [03:03:55] AUTH CRITICAL: PAM failure for user root from 185.220.101.42 (Attempt #4201)
  [03:03:52] AUTH CRITICAL: Accepted password for root from 185.220.101.42
  [03:03:48] NET HIGH: High entropy DNS TXT query x89fa.c2.darknet-dns.ru
  [03:03:30] CONTAINER CRITICAL: Process /tmp/encrypter spawned in node-container-micro`,
        },
      ]);
    } else if (rootCmd === 'agents') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `AI DEFENSE AGENTS MATRIX:
  [Aegis Detection Engine]    - Status: ACTIVE      | Conf: 98.4%
  [Vanguard Response Agent]   - Status: REMEDIATING | Conf: 97.2%
  [Phoenix Recovery Agent]    - Status: IDLE        | Conf: 99.0%
  [Cipher Patch Generator]    - Status: ACTIVE      | Conf: 96.8%`,
        },
      ]);
    } else if (rootCmd === 'isolate') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `[VANGUARD AGENT] Isolating node interface [${args || 'target'}]... Interface br0 down. Zero traffic allowed.`,
        },
      ]);
    } else if (rootCmd === 'scan') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `[NMAP SCAN] Target: ${args || '10.0.2.20'}
  PORT 22/tcp  OPEN  OpenSSH 9.6 (CVE-2026-1189)
  PORT 80/tcp  OPEN  Nginx 1.26
  PORT 5432/tcp OPEN PostgreSQL 16.2
  Scan finished in 1.22s. 1 Critical Vulnerability found.`,
        },
      ]);
    } else if (rootCmd === 'docker') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `CONTAINER ID   IMAGE                               STATUS
  cnt-01         ubuntu:24.04-hardened                Up 4 days
  cnt-02         windows/servercore:ltsc2022          Up 1 day
  cnt-03         postgres:16.2-alpine                 Up 6 days
  cnt-04         nginx:1.26-alpine                    Up 12 days
  cnt-05         kalilinux/kali-rolling               Up 2 hours`,
        },
      ]);
    } else if (rootCmd === 'gemini') {
      setHistory((prev) => [...prev, { type: 'output', text: 'Querying Gemini AI server engine...' }]);
      const res = await sendAIChatMessage([
        { role: 'user', content: args || 'Explain SSH brute force defense' },
      ]);
      setHistory((prev) => [
        ...prev,
        { type: 'gemini', text: `[GEMINI 3.6 FLASH RESPONSE]:\n${res.reply}` },
      ]);
    } else if (rootCmd === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for list of valid SOC commands.`,
        },
      ]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE SOC COMMAND TERMINAL</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Command line interface for log queries, isolation playbooks, Nmap scans, and direct Gemini AI reasoning.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>TYPE "help" FOR COMMAND MANUAL</span>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs shadow-2xl h-[550px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-2 pr-2">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'input' && (
                <p className="text-cyan-400 font-bold">{item.text}</p>
              )}
              {item.type === 'output' && (
                <p className="text-slate-300 whitespace-pre-wrap">{item.text}</p>
              )}
              {item.type === 'gemini' && (
                <p className="text-emerald-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30 whitespace-pre-wrap my-1">
                  {item.text}
                </p>
              )}
              {item.type === 'error' && (
                <p className="text-rose-400">{item.text}</p>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-3 border-t border-slate-900">
          <span className="text-cyan-400 font-bold shrink-0">soc-analyst@sentinel-cli:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. help, status, isolate node-db-main, gemini Explain ransomware)..."
            className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs"
            autoFocus
          />
          <button type="submit" className="text-slate-500 hover:text-cyan-400">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
