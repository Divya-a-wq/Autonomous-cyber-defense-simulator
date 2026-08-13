import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { SOCDashboard } from './components/dashboard/SOCDashboard';
import { NetworkTopology } from './components/topology/NetworkTopology';
import { AttackLab } from './components/simulations/AttackLab';
import { AIAgentsView } from './components/agents/AIAgentsView';
import { AIExplanationPanel } from './components/explanation/AIExplanationPanel';
import { LogExplorer } from './components/logs/LogExplorer';
import { IncidentResponseCenter } from './components/incidents/IncidentResponseCenter';
import { ThreatIntelHub } from './components/threatIntel/ThreatIntelHub';
import { SecurityAnalytics } from './components/analytics/SecurityAnalytics';
import { DockerSandbox } from './components/containers/DockerSandbox';
import { SOCTerminal } from './components/terminal/SOCTerminal';
import { SecurityReports } from './components/reports/SecurityReports';

import {
  INITIAL_ALERTS,
  MOCK_AGENTS,
  INITIAL_NODES,
} from './data/mockCyberData';
import { Alert, AIAgent, NetworkNode, UserProfile } from './types/cyber';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);

  // Global State
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [agents, setAgents] = useState<AIAgent[]>(MOCK_AGENTS);
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [riskScore, setRiskScore] = useState<number>(64);
  const [selectedAlertForExplanation, setSelectedAlertForExplanation] =
    useState<Alert | null>(null);

  // Defensive Actions
  const handleIsolateNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: 'isolated' } : n))
    );
    setRiskScore((prev) => Math.max(10, prev - 15));
  };

  const handleRestoreNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: 'healthy' } : n))
    );
    setRiskScore((prev) => Math.max(10, prev - 10));
  };

  const handleScanNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              vulnerabilities: [
                ...n.vulnerabilities,
                'CVE-2026-1189 OpenSSH Remote Code Execution',
              ],
            }
          : n
      )
    );
  };

  const handleToggleAutopilot = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId ? { ...a, autoPilotEnabled: !a.autoPilotEnabled } : a
      )
    );
  };

  const handleTriggerScenario = (scenarioId: string, targetNodeId?: string) => {
    // Add new simulated alert
    const newAlert: Alert = {
      id: `alt-${Date.now()}`,
      title: `SIMULATED ATTACK: ${scenarioId.toUpperCase()}`,
      type: 'Simulated Exploit',
      severity: 'critical',
      status: 'active',
      targetNodeId: targetNodeId || 'node-db-main',
      targetNodeName: 'DB-Cluster-PostgreSQL',
      sourceIp: '185.220.101.42',
      confidenceScore: 99.4,
      mitreCode: 'T1059',
      mitreName: 'Command and Scripting Interpreter',
      timestamp: new Date().toISOString(),
      summary: `Automated simulation range generated synthetic attack log burst targeting ${
        targetNodeId || 'node-db-main'
      }.`,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setRiskScore((prev) => Math.min(99, prev + 12));

    // Update target node status
    if (targetNodeId) {
      setNodes((prev) =>
        prev.map((n) => (n.id === targetNodeId ? { ...n, status: 'compromised' } : n))
      );
    }
  };

  const handleSelectAlert = (alert: Alert) => {
    setSelectedAlertForExplanation(alert);
    setActiveTab('explanation');
  };

  // If on Landing page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar
          user={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          riskScore={riskScore}
          activeAlertsCount={alerts.length}
        />
        <LandingPage
          onEnterSOC={() => setShowLanding(false)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(usr) => {
            setCurrentUser(usr);
            setShowLanding(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Global Navbar */}
      <Navbar
        user={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        riskScore={riskScore}
        activeAlertsCount={alerts.length}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          activeAlertsCount={alerts.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
          {activeTab === 'dashboard' && (
            <SOCDashboard
              alerts={alerts}
              agents={agents}
              nodes={nodes}
              riskScore={riskScore}
              onSelectAlert={handleSelectAlert}
              onTriggerSim={() => setActiveTab('attack-lab')}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'topology' && (
            <NetworkTopology
              nodes={nodes}
              onIsolateNode={handleIsolateNode}
              onRestoreNode={handleRestoreNode}
              onScanNode={handleScanNode}
            />
          )}

          {activeTab === 'attack-lab' && (
            <AttackLab
              nodes={nodes}
              onTriggerScenario={handleTriggerScenario}
            />
          )}

          {activeTab === 'agents' && (
            <AIAgentsView
              agents={agents}
              onToggleAutopilot={handleToggleAutopilot}
            />
          )}

          {activeTab === 'explanation' && (
            <AIExplanationPanel
              currentAlertTitle={selectedAlertForExplanation?.title}
              logExcerpt={selectedAlertForExplanation?.summary}
            />
          )}

          {activeTab === 'logs' && <LogExplorer />}

          {activeTab === 'incidents' && (
            <IncidentResponseCenter
              onExecuteAction={(act) => console.log('Executed:', act)}
            />
          )}

          {activeTab === 'threat-intel' && <ThreatIntelHub />}

          {activeTab === 'analytics' && <SecurityAnalytics />}

          {activeTab === 'containers' && <DockerSandbox />}

          {activeTab === 'terminal' && <SOCTerminal />}

          {activeTab === 'reports' && <SecurityReports />}
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(usr) => setCurrentUser(usr)}
      />
    </div>
  );
}
