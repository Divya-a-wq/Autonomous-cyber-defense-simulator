import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI initialization
let genAIInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured in process.env');
      return null;
    }
    genAIInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIInstance;
}

// In-Memory Simulation State
let activeNodes = [
  { id: 'node-fw-01', name: 'Edge-Firewall-Primary', type: 'firewall', status: 'healthy', ip: '192.168.1.1', score: 96 },
  { id: 'node-router-01', name: 'Core-Router-Gateway', type: 'router', status: 'healthy', ip: '192.168.1.254', score: 92 },
  { id: 'node-srv-web', name: 'Web-App-Cluster-01', type: 'server', status: 'warning', ip: '10.0.1.10', score: 78 },
  { id: 'node-db-main', name: 'DB-Cluster-PostgreSQL', type: 'database', status: 'compromised', ip: '10.0.2.20', score: 42 },
  { id: 'node-wkst-finance', name: 'Win11-Finance-Vault', type: 'workstation', status: 'healthy', ip: '10.0.3.45', score: 88 },
  { id: 'node-cloud-aws', name: 'AWS-Production-Kubernetes', type: 'cloud', status: 'healthy', ip: '52.94.233.12', score: 95 },
  { id: 'node-container-micro', name: 'Docker-Microservices-Pod', type: 'container', status: 'quarantined', ip: '172.17.0.4', score: 30 },
];

let systemRiskScore = 64;
let activeAlertsCount = 4;
let totalSimulationsRun = 12;

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Sentinel AI SOC Platform',
    timestamp: new Date().toISOString(),
    geminiConnected: !!process.env.GEMINI_API_KEY,
    riskScore: systemRiskScore,
  });
});

// Get Node Status
app.get('/api/nodes', (req, res) => {
  res.json({ nodes: activeNodes, riskScore: systemRiskScore });
});

// Node Action (Isolate, Scan, Patch, Restore)
app.post('/api/nodes/:id/action', (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  const nodeIndex = activeNodes.findIndex((n) => n.id === id);
  if (nodeIndex === -1) {
    return res.status(404).json({ error: 'Node not found' });
  }

  let newStatus = activeNodes[nodeIndex].status;
  let message = '';

  if (action === 'isolate') {
    newStatus = 'isolated';
    message = `Node ${activeNodes[nodeIndex].name} network interface isolated. Zero traffic allowed.`;
  } else if (action === 'quarantine') {
    newStatus = 'quarantined';
    message = `Node ${activeNodes[nodeIndex].name} quarantined in sandbox.`;
  } else if (action === 'restore') {
    newStatus = 'healthy';
    activeNodes[nodeIndex].score = 95;
    message = `Node ${activeNodes[nodeIndex].name} restored to clean state from golden image snapshot.`;
  } else if (action === 'scan') {
    message = `Deep vulnerability and memory scan executed on ${activeNodes[nodeIndex].name}. No rootkits found.`;
  }

  activeNodes[nodeIndex].status = newStatus;

  res.json({
    success: true,
    node: activeNodes[nodeIndex],
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
});

// Trigger Cyber Attack Simulation
app.post('/api/simulations/trigger', (req, res) => {
  const { scenarioId, targetNodeId } = req.body;
  totalSimulationsRun += 1;

  // Calculate simulated attack impact
  let alertTitle = 'Simulated Cyber Attack Event';
  let severity = 'high';
  let mitreCode = 'T1110';
  let mitreName = 'Brute Force';

  if (scenarioId === 'sim-brute-force') {
    alertTitle = 'Dictionary Attack Spike on SSH Service';
    severity = 'critical';
    mitreCode = 'T1110.001';
    mitreName = 'Brute Force: Password Guessing';
  } else if (scenarioId === 'sim-ransomware') {
    alertTitle = 'Ransomware Canary Alert: Rapid File Entropy Encryption';
    severity = 'critical';
    mitreCode = 'T1486';
    mitreName = 'Data Encrypted for Impact';
  } else if (scenarioId === 'sim-phishing') {
    alertTitle = 'Spear Phishing Link Click & Token Intercept';
    severity = 'high';
    mitreCode = 'T1566.002';
    mitreName = 'Phishing: Spearphishing Link';
  } else if (scenarioId === 'sim-priv-esc') {
    alertTitle = 'Kernel Exploit Invoked by Low-Privilege Web Worker';
    severity = 'high';
    mitreCode = 'T1068';
    mitreName = 'Exploitation for Privilege Escalation';
  }

  // Update target node if provided
  if (targetNodeId) {
    const node = activeNodes.find((n) => n.id === targetNodeId);
    if (node) {
      node.status = 'compromised';
      node.score = Math.max(15, node.score - 45);
    }
  }

  systemRiskScore = Math.min(95, systemRiskScore + 12);
  activeAlertsCount += 1;

  res.json({
    success: true,
    simulationId: `sim-exec-${Date.now()}`,
    alertGenerated: {
      id: `alt-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      title: alertTitle,
      severity,
      mitreCode,
      mitreName,
      confidenceScore: 98.9,
    },
    systemRiskScore,
  });
});

// Gemini AI Incident Explanation & Forensic Analysis Endpoint
app.post('/api/gemini/explain', async (req, res) => {
  const { incidentTitle, logExcerpt, targetNode, mitreCode, severity } = req.body;

  try {
    const ai = getGenAI();
    if (!ai) {
      // Fallback explanation if GEMINI_API_KEY is not set
      return res.json({
        explanation: {
          detectionReason: `The Aegis Detection Agent identified anomalous pattern matching technique ${mitreCode || 'T1110'} based on rapid log spikes.`,
          evidenceLogs: [
            logExcerpt || 'Failed authentication threshold breached 4,000 times in 30s.',
            'Unusual outbound traffic directed to unregistered external IP.',
          ],
          patternMatched: `${mitreCode || 'T1110'} - Threat signature verified against Sentinel Cyber Database.`,
          mitreMapping: `MITRE ATT&CK: ${mitreCode || 'T1110'} - Severity: ${severity || 'Critical'}`,
          confidenceLevel: 98.6,
          recommendedRemediation: 'Isolate target node immediately, enforce IP block on edge firewall, and rotate credentials.',
          detailedNarrative: `Sentinel AI analyzed the incident "${incidentTitle || 'Security Event'}". The attack exhibits hallmarks of automated threat actors. Immediate automated isolation prevented lateral movement.`,
        },
      });
    }

    const prompt = `You are Sentinel AI's Senior Cyber Threat Analyst & Incident Response Agent.
Analyze this cybersecurity incident and provide a structured JSON response:
Incident: "${incidentTitle || 'Unknown Security Event'}"
Target Asset: "${targetNode || 'PostgreSQL DB Server'}"
Severity: "${severity || 'Critical'}"
MITRE ATT&CK Code: "${mitreCode || 'T1110'}"
Sample Log Excerpt: "${logExcerpt || 'PAM failure 4200 attempts'}"

Required JSON schema output:
{
  "detectionReason": "Clear, precise description of why the anomaly was flagged.",
  "evidenceLogs": ["Log evidence item 1", "Log evidence item 2"],
  "patternMatched": "Technique signature or exploit pattern matched.",
  "mitreMapping": "MITRE ATT&CK technique details and tactic stage.",
  "confidenceLevel": 98.5,
  "recommendedRemediation": "Clear action steps for containment and recovery.",
  "detailedNarrative": "A 2-paragraph natural language explanation explaining the attacker's intent, vector, and why AI defense agents executed containment."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedText = response.text ? response.text.trim() : '{}';
    const explanationData = JSON.parse(parsedText);

    res.json({
      success: true,
      explanation: explanationData,
    });
  } catch (error: any) {
    console.error('Gemini API Explain Error:', error);
    res.status(500).json({
      error: 'AI Explanation Service Error',
      details: error?.message || 'Failed to process AI explanation',
    });
  }
});

// Gemini AI Security Assistant / Mentor Chat
app.post('/api/gemini/chat', async (req, res) => {
  const { messages, currentContext } = req.body;

  try {
    const ai = getGenAI();
    if (!ai) {
      return res.json({
        reply: `[Sentinel AI Offline Mode] I received your query regarding "${messages?.[messages.length - 1]?.content || 'security query'}". System is operating normally in local simulation mode. To enable live Gemini AI reasoning, ensure GEMINI_API_KEY is configured in your secrets.`,
      });
    }

    const systemInstruction = `You are Sentinel AI, an autonomous cybersecurity defense advisor and SOC analyst mentor.
You assist blue teams, SOC analysts, and incident responders in analyzing threats, understanding attack vectors (ransomware, brute force, DNS tunneling, phishing, privilege escalation), interpreting logs, mapping to MITRE ATT&CK, and deploying defensive patches.
Current SOC Context:
- Active Network Nodes: 7 (Ubuntu, Windows, Postgres DB, Edge Firewall, Router, AWS EKS, Docker Sandbox)
- Current Network Risk Score: ${systemRiskScore}/100
- Active Alerts: ${activeAlertsCount}
Be concise, authoritative, professional, and highlight actionable security recommendations. Use bullet points and code blocks where helpful.`;

    const userPrompt = messages?.[messages.length - 1]?.content || 'Hello Sentinel AI';

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemInstruction}\n\nUser Question: ${userPrompt}`,
    });

    res.json({
      reply: response.text || 'No response generated from AI agent.',
    });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      error: 'Gemini Chat Error',
      details: error?.message || 'Failed to generate response',
    });
  }
});

// Vite middleware for development vs production static serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentinel AI Cyber Platform backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
