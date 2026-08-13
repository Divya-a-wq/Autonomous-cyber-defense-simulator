import React, { useState } from 'react';
import {
  ShieldAlert,
  Zap,
  Bot,
  BrainCircuit,
  Lock,
  Globe,
  Terminal,
  Activity,
  CheckCircle2,
  ArrowRight,
  Play,
  Cpu,
  Layers,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchSimulation: () => void;
  onViewDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchSimulation,
  onViewDemo,
}) => {
  const [showDocsModal, setShowDocsModal] = useState(false);

  const features = [
    {
      icon: Bot,
      title: 'Autonomous AI Defense Agents',
      description:
        'Four specialized AI agents (Detection, Response, Recovery, and Patch Generation) autonomously isolate threats, block malicious IPs, and generate remediation patches in milliseconds.',
    },
    {
      icon: Zap,
      title: 'Safe Attack Simulation Lab',
      description:
        'Simulate brute force attacks, ransomware canary behavior, phishing incidents, and privilege escalation in an isolated sandbox with realistic security log generation.',
    },
    {
      icon: BrainCircuit,
      title: 'Natural Language AI Explanations',
      description:
        'Powered by Gemini AI, every defensive decision, log evidence artifact, and MITRE ATT&CK mapping is explained clearly with step-by-step reasoning.',
    },
    {
      icon: Layers,
      title: 'Interactive Network Topology',
      description:
        'Visualize firewalls, database clusters, web servers, workstations, and Kubernetes cloud pods in real-time with health status and active traffic pulses.',
    },
    {
      icon: Cpu,
      title: 'Docker Sandbox Simulation',
      description:
        'Virtual machine and container management interface simulating Ubuntu, Windows, Postgres, and Kali Linux attacker nodes with live stdout stdout logs.',
    },
    {
      icon: FileText,
      title: 'Executive PDF Security Reports',
      description:
        'Generate printable forensic audit reports, threat intelligence summaries, and remediation compliance checklists for SOC management.',
    },
  ];

  const testimonials = [
    {
      quote:
        'Sentinel AI transformed our SOC analyst training. The AI explanation engine gives junior analysts instant senior-level forensic insight during ransomware simulations.',
      name: 'Dr. Marcus Vance',
      role: 'CISO & Cybersecurity Director',
      company: 'Apex Cyber Intelligence',
    },
    {
      quote:
        'The ability to launch realistic brute force and DNS tunneling simulations while four AI agents handle active containment in real-time is revolutionary.',
      name: 'Elena Rostova',
      role: 'Lead Incident Response Engineer',
      company: 'Vanguard Security Labs',
    },
    {
      quote:
        'We replaced traditional static lab setups with Sentinel AI. The interactive Docker sandbox and automated patch generator are second to none.',
      name: 'David K. Chen',
      role: 'Head of Threat Operations',
      company: 'CloudShield Global',
    },
  ];

  const pricingTiers = [
    {
      name: 'Community Defense Lab',
      price: '$0',
      period: 'Forever Free',
      description: 'Ideal for students, researchers, and individual SOC practice.',
      features: [
        '7 Simulated Network Nodes',
        '3 Attack Simulation Scenarios',
        'Basic AI Detection Agent',
        'Real-time Log Stream Viewer',
        'Community Forum Support',
      ],
      cta: 'Start Free Lab',
      highlighted: false,
    },
    {
      name: 'Enterprise SOC Edition',
      price: '$2,499',
      period: 'per month / organization',
      description: 'Full autonomous blue-team platform for corporate Security Operations Centers.',
      features: [
        'Unlimited Network Topology Nodes',
        'All 7 Cyber Attack Scenarios + Custom Scenario Builder',
        'All 4 Autonomous AI Defense Agents',
        'Full Gemini AI Forensic & Explanation Chat Engine',
        'Docker Virtual Sandbox Management',
        'Automated Executive PDF Reports',
        'Dedicated 24/7 Support SLA',
      ],
      cta: 'Launch Enterprise Trial',
      highlighted: true,
    },
    {
      name: 'Federal & Defense Command',
      price: 'Custom',
      period: 'Bespoke deployment',
      description: 'Air-gapped enterprise deployment for military and national defense labs.',
      features: [
        'On-Premises / Air-Gapped Cluster Support',
        'Custom MITRE ATT&CK Mapping Models',
        'Zero-Trust Role-Based Access Control',
        'Custom SIEM & SOAR API Webhooks',
        'Dedicated Cyber Range Engineers',
      ],
      cta: 'Contact Defense Team',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Animated Cyber Hero Section */}
      <section className="relative pt-16 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Neon Grid Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-8 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>AUTONOMOUS CYBER DEFENSE SIMULATOR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-none">
          AI-Powered Autonomous{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Cyber Defense
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl leading-relaxed">
          Simulate real-world cyber attacks in a safe virtual laboratory while autonomous AI security agents automatically detect threats, isolate compromised machines, generate firewall patches, and explain every decision in natural language.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLaunchSimulation}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 h-5" />
            <span>Launch Simulation</span>
          </button>

          <button
            onClick={onViewDemo}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base transition-all hover:border-cyan-500/50"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>View Live Demo</span>
          </button>

          <button
            onClick={() => setShowDocsModal(true)}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Documentation</span>
          </button>
        </div>

        {/* Live SOC Preview Card */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl bg-slate-900/90 border border-cyan-900/50 p-4 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-left backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-cyan-300 font-bold">SOC LIVE COMMAND DASHBOARD PREVIEW</span>
            </div>
            <span className="text-slate-500">LAB STATUS: ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">ACTIVE DEFENSE AGENTS</span>
              <p className="text-2xl font-bold font-mono text-cyan-400">4 / 4 ONLINE</p>
              <p className="text-[10px] font-mono text-emerald-400">Aegis, Vanguard, Phoenix, Cipher</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">BLOCKED ATTACK RATE</span>
              <p className="text-2xl font-bold font-mono text-emerald-400">99.4%</p>
              <p className="text-[10px] font-mono text-slate-400">Average response SLA: 1.2s</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">CONTAINMENT STATE</span>
              <p className="text-2xl font-bold font-mono text-amber-400">1 Node Quarantined</p>
              <p className="text-[10px] font-mono text-slate-400">Docker container isolation active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Designed for Enterprise SOC & Blue-Team Training
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
            Everything you need to practice incident response, train security analysts, and observe autonomous AI defense in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:bg-slate-900 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Trusted by Security Leaders</h2>
            <p className="mt-2 text-slate-400 text-sm">
              See how CISOs and Incident Responders evaluate Sentinel AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-slate-900">
                  <p className="text-sm font-bold text-cyan-300">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-xs text-slate-500 font-mono">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Deploy for individual practice or scale across your enterprise Security Operations Center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-slate-900 border flex flex-col justify-between relative ${
                p.highlighted
                  ? 'border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-slate-900/90'
                  : 'border-slate-800'
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider">
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-100">{p.name}</h3>
                <p className="mt-2 text-xs text-slate-400">{p.description}</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-cyan-300">
                    {p.price}
                  </span>
                  <span className="text-xs text-slate-400 ml-2 font-mono">
                    {p.period}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onLaunchSimulation}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  p.highlighted
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Docs Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-slate-100">Sentinel AI Platform Documentation</h3>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-mono"
              >
                [ESC CLOSE]
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-300 leading-relaxed font-mono">
              <h4 className="text-sm font-bold text-cyan-300">1. Architectural Overview</h4>
              <p>
                Sentinel AI operates a full-stack cybersecurity simulation environment with an Express backend and React frontend.
                It features four autonomous AI security agents:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li><strong className="text-cyan-400">Aegis Detection Agent:</strong> Log stream parsing & anomaly scoring.</li>
                <li><strong className="text-cyan-400">Vanguard Response Agent:</strong> Automated network interface isolation.</li>
                <li><strong className="text-cyan-400">Phoenix Recovery Agent:</strong> Integrity verification & backup restoration.</li>
                <li><strong className="text-cyan-400">Cipher Patch Agent:</strong> Autogenerated security hardening code.</li>
              </ul>

              <h4 className="text-sm font-bold text-cyan-300 mt-4">2. Safe Simulation Mechanics</h4>
              <p>
                All attack scenarios generate realistic security log entries and state updates. No actual malicious binaries or exploits are executed on local hardware.
              </p>

              <h4 className="text-sm font-bold text-cyan-300 mt-4">3. Gemini AI Integration</h4>
              <p>
                Server-side Gemini 3.6 Flash reasoning provides detailed forensic explanations, log evidence analysis, and interactive advisor Q&A.
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
