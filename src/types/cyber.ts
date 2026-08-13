export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type NodeStatus = 'healthy' | 'warning' | 'compromised' | 'isolated' | 'quarantined';

export type NodeType = 'server' | 'workstation' | 'database' | 'firewall' | 'router' | 'cloud' | 'container';

export interface NetworkNode {
  id: string;
  name: string;
  type: NodeType;
  ip: string;
  os: string;
  status: NodeStatus;
  cpuUsage: number;
  memoryUsage: number;
  securityScore: number;
  activeConnections: number;
  openPorts: number[];
  services: string[];
  lastScanTime: string;
  vulnerabilities: string[];
  position: { x: number; y: number };
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  nodeId?: string;
  facility: 'auth' | 'system' | 'network' | 'firewall' | 'application' | 'container';
  severity: Severity;
  message: string;
  rawPayload: string;
  isAnomaly: boolean;
  mitreTechnique?: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  title: string;
  type: string;
  severity: Severity;
  status: 'active' | 'investigating' | 'contained' | 'resolved';
  targetNodeId: string;
  targetNodeName: string;
  sourceIp: string;
  confidenceScore: number;
  mitreCode: string;
  mitreName: string;
  summary: string;
}

export type AgentRole = 'detection' | 'response' | 'recovery' | 'patch';

export interface AIAgent {
  id: AgentRole;
  name: string;
  role: AgentRole;
  status: 'active' | 'analyzing' | 'remediating' | 'idle';
  actionsTakenCount: number;
  confidenceAvg: number;
  description: string;
  lastAction: string;
  lastActionTimestamp: string;
  autoPilotEnabled: boolean;
}

export interface AIAction {
  id: string;
  timestamp: string;
  agentRole: AgentRole;
  alertId: string;
  actionType: string;
  targetNodeId: string;
  targetNodeName: string;
  description: string;
  explanation: {
    detectionReason: string;
    evidenceLogs: string[];
    patternMatched: string;
    mitreMapping: string;
    confidenceLevel: number;
    recommendedRemediation: string;
  };
  patchScript?: string;
  status: 'executed' | 'pending' | 'reverted';
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: 'open' | 'investigating' | 'contained' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignee: string;
  affectedNodes: string[];
  alertIds: string[];
  mitreTechniques: string[];
  timeline: {
    timestamp: string;
    event: string;
    type: 'alert' | 'agent_action' | 'analyst_note' | 'status_change';
    actor: string;
  }[];
  evidence: {
    type: string;
    value: string;
    description: string;
  }[];
  notes: string[];
  remediationPlan: string[];
}

export interface ContainerNode {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'isolated' | 'restarting';
  ip: string;
  ports: string;
  cpuPercent: number;
  memUsageMB: number;
  uptime: string;
  type: 'ubuntu' | 'windows' | 'database' | 'web' | 'attacker' | 'firewall';
}

export interface ThreatIntelItem {
  id: string;
  type: 'ip' | 'hash' | 'domain' | 'actor' | 'cve';
  indicator: string;
  threatActor?: string;
  category: string;
  riskScore: number;
  firstSeen: string;
  lastSeen: string;
  mitreReference: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'SOC Analyst L1' | 'SOC Analyst L2' | 'Lead Incident Responder' | 'SecOps Admin' | 'Red Team Operator';
  avatar: string;
  token?: string;
}

export interface SimulationScenario {
  id: string;
  name: string;
  category: string;
  severity: Severity;
  description: string;
  targetNodeType: NodeType;
  mitreCode: string;
  mitreName: string;
  estimatedDurationSec: number;
  simulatedLogsCount: number;
}
