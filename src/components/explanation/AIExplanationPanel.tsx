import React, { useState } from 'react';
import {
  BrainCircuit,
  MessageSquare,
  Send,
  Sparkles,
  ShieldAlert,
  Terminal,
  CheckCircle2,
  ListChecks,
  AlertOctagon,
  Copy,
  Check,
  Bot,
} from 'lucide-react';
import { fetchAIExplanation, sendAIChatMessage } from '../../services/api';

interface AIExplanationPanelProps {
  currentAlertTitle?: string;
  logExcerpt?: string;
}

export const AIExplanationPanel: React.FC<AIExplanationPanelProps> = ({
  currentAlertTitle = 'High-Frequency SSH Brute Force & Credential Dumping',
  logExcerpt = 'PAM authentication failure for user root from 185.220.101.42 via SSH (Attempt #4201)',
}) => {
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState<any>({
    detectionReason:
      'Aegis Detection Agent identified anomalous log burst matching signature T1110. Password attempts exceeded baseline threshold by 4,200 requests/30sec from Tor exit node 185.220.101.42.',
    evidenceLogs: [
      'Failed authentication count: 4,201 attempts in 30s',
      'Accepted root password login immediately following dictionary blast',
      'Outbound SSH banner probe on port 22',
    ],
    patternMatched: 'MITRE ATT&CK T1110.001 - Password Guessing & Credential Harvesting',
    mitreMapping: 'T1110.001 (Credential Access) -> T1078 (Valid Accounts)',
    confidenceLevel: 99.2,
    recommendedRemediation:
      'Isolate DB-Cluster-PostgreSQL network interface, block IP 185.220.101.42 at Edge Firewall, rotate root SSH keys, and enforce fail2ban jail.',
    detailedNarrative:
      'Sentinel AI auto-analyzed this security event in real time. The attack exhibits hallmarks of APT29 automated scanning tools. Aegis Detection Agent alerted Vanguard Response Agent, which triggered automated iptables drop rules and quarantined suspicious worker pods to prevent lateral database exfiltration.',
  });

  // Chat State
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([
    {
      role: 'assistant',
      content:
        'Greetings. I am Sentinel AI’s Forensic Specialist. Ask me anything about this incident, log evidence, MITRE ATT&CK mappings, or recommended remediation playbooks.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [sendingChat, setSendingChat] = useState(false);

  const handleGenerateLiveAnalysis = async () => {
    setLoadingExplanation(true);
    const res = await fetchAIExplanation({
      incidentTitle: currentAlertTitle,
      logExcerpt,
      severity: 'Critical',
      mitreCode: 'T1110',
    });
    if (res?.explanation) {
      setExplanationData(res.explanation);
    }
    setLoadingExplanation(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || sendingChat) return;

    const userMsg = chatInput.trim();
    const updatedMessages = [
      ...messages,
      { role: 'user' as const, content: userMsg },
    ];
    setMessages(updatedMessages);
    setChatInput('');
    setSendingChat(true);

    const res = await sendAIChatMessage(updatedMessages);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: res.reply || 'Analysis completed.',
      },
    ]);
    setSendingChat(false);
  };

  const handleQuickQuestion = (q: string) => {
    setChatInput(q);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span>AI EXPLANATION ENGINE & FORENSIC CHAT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Natural language threat explanations, log evidence correlation, and interactive Gemini AI security advisor.
          </p>
        </div>

        <button
          onClick={handleGenerateLiveAnalysis}
          disabled={loadingExplanation}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all shadow-md shadow-cyan-950"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>{loadingExplanation ? 'REASONING...' : 'RE-ANALYZE INCIDENT WITH GEMINI'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Structured AI Forensic Breakdown */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>INCIDENT EXPLANATION: {currentAlertTitle}</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              {explanationData.confidenceLevel || 99}% CONFIDENCE
            </span>
          </div>

          {/* Detection Reason */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-cyan-400">
              1. WHY THREAT WAS DETECTED
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-sans">
              {explanationData.detectionReason}
            </p>
          </div>

          {/* Evidence From Logs */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-cyan-400">
              2. EVIDENCE ARTIFACTS FROM LOGS
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              {explanationData.evidenceLogs?.map((ev: string, idx: number) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MITRE Mapping */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-cyan-400">
              3. MITRE ATT&CK MAPPING
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
              {explanationData.mitreMapping}
            </div>
          </div>

          {/* Recommended Remediation */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-cyan-400">
              4. RECOMMENDED REMEDIATION PLAYBOOK
            </span>
            <p className="text-xs text-emerald-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30 font-sans leading-relaxed">
              {explanationData.recommendedRemediation}
            </p>
          </div>
        </div>

        {/* Right: Interactive Chat Assistant */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between h-[600px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xs font-bold font-mono text-slate-200">
                  SENTINEL AI FORENSIC ASSISTANT
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
              {[
                'Explain SSH brute force vector',
                'How to isolate node via iptables?',
                'Map LockBit to MITRE ATT&CK',
                'Generate patch script',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 text-[10px] font-mono transition-colors"
                >
                  + {q}
                </button>
              ))}
            </div>

            {/* Message History */}
            <div className="h-[380px] overflow-y-auto space-y-3 pr-2 font-sans text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-cyan-950 border border-cyan-800 text-cyan-100 ml-auto'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 mr-auto'
                  }`}
                >
                  <p className="font-semibold text-[10px] font-mono text-slate-400 mb-1">
                    {m.role === 'user' ? 'ANALYST' : 'SENTINEL AI'}
                  </p>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              ))}
              {sendingChat && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono animate-pulse mr-auto">
                  Sentinel AI reasoning...
                </div>
              )}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-800">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Sentinel AI about threats, logs, or playbooks..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none font-sans"
            />
            <button
              type="submit"
              disabled={sendingChat || !chatInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
