# 🛡️ Sentinel AI — Autonomous Cyber Defense Simulator

Sentinel AI is a full-stack **cybersecurity simulation and SOC training platform** designed for defensive security operations, threat detection, incident investigation, and automated response simulation.

The platform recreates a Security Operations Center (SOC) environment where users can monitor security events, investigate incidents, analyze logs, and observe AI-assisted defensive workflows through a real-time dashboard.

> **Safety:** Sentinel AI is designed for controlled defensive security simulation and training. It does not target or interact with real-world systems.

---

## 🚀 Features

* 📊 Real-time SOC monitoring dashboard
* 🚨 Live security alerts
* 🔥 Threat severity classification
* ⚡ Real-time event streaming with WebSockets
* 🤖 AI-assisted threat monitoring
* 🔍 Security log analysis and filtering
* 🛡️ Incident-response workflow management
* 🔐 JWT authentication
* 👥 Role-based access control
* 🐳 Dockerized simulation environment
* 📈 Security analytics and visualizations
* 📱 Responsive dashboard

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React Client     │
                    │    SOC Dashboard     │
                    └──────────┬───────────┘
                               │
                         REST API / WS
                               │
                    ┌──────────▼───────────┐
                    │   Node.js + Express  │
                    │      Backend API     │
                    └──────┬─────────┬─────┘
                           │         │
                    ┌──────▼───┐ ┌──▼────────────┐
                    │ MongoDB  │ │   Socket.io   │
                    │  Events  │ │ Real-time Feed│
                    └──────────┘ └───────────────┘
                           ▲
                           │
                    ┌──────┴───────────┐
                    │ Docker Simulation│
                    │    Services      │
                    └──────────────────┘
```

### Event Flow

```text
Security Simulation
        ↓
Security Event Generated
        ↓
Backend Event Processor
        ↓
Threat Classification
        ↓
MongoDB Storage
        ↓
Socket.io Event Stream
        ↓
SOC Dashboard
        ↓
Incident Investigation
        ↓
Defensive Response Workflow
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Socket.io
* JWT Authentication

### DevOps

* Docker
* Docker Compose
* Git
* GitHub

### AI

* Gemini API
* AI-assisted threat monitoring
* Automated security-event analysis

---

## 📁 Project Structure

```text
Autonomous-cyber-defense-simulator/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── docker-compose.yml
├── README.md
├── .gitignore
└── package.json
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure you have the following installed:

* Node.js 18+
* MongoDB
* Docker Desktop
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Divya-a-wq/Autonomous-cyber-defense-simulator.git

cd Autonomous-cyber-defense-simulator
```

---

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/sentinel-ai

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

### Important

Never commit your real API keys or secrets to GitHub.

Add the following to `.gitignore`:

```text
.env
.env.local
node_modules/
```

---

# 🐳 Docker Setup

From the project root:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

To stop the services:

```bash
docker compose down
```

---

# ▶️ Running the Application

## Start Backend

Open a terminal:

```bash
cd server
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

## Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🔌 API Overview

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register user            |
| POST   | `/api/auth/login`    | Authenticate user        |
| GET    | `/api/events`        | Retrieve security events |
| GET    | `/api/incidents`     | Retrieve incidents       |
| POST   | `/api/incidents`     | Create incident          |
| GET    | `/api/logs`          | Retrieve security logs   |
| POST   | `/api/analyze`       | Analyze security event   |

> Endpoint names may vary depending on the implementation in the current backend.

---

# 🔐 Authentication

Sentinel AI uses **JWT-based authentication**.

Authentication flow:

```text
User Registration
       ↓
User Login
       ↓
JWT Token Generated
       ↓
Token Sent With Requests
       ↓
Backend Authentication Middleware
       ↓
Authorized API Access
```

Role-based access can be used to provide different permissions for analysts, administrators, and other SOC users.

---

# 🤖 AI-Assisted Threat Monitoring

The AI layer can assist security analysts by:

* Analyzing security events
* Classifying suspicious activity
* Summarizing security logs
* Explaining potential threats
* Prioritizing incidents
* Suggesting defensive actions
* Generating incident summaries

The AI operates as an **analysis and decision-support layer**, while the simulation environment remains isolated from real-world infrastructure.

---

# 📊 SOC Dashboard

The dashboard provides visibility into:

* Total security events
* Active incidents
* Critical alerts
* Threat severity
* Recent security activity
* Event timelines
* Incident status
* Security logs
* Defensive actions

Example dashboard workflow:

```text
┌──────────────────────────────────────────┐
│              SENTINEL AI                 │
├────────────┬────────────┬────────────────┤
│   Events   │  Incidents │ Critical Alerts│
│    1,248   │     32     │       7        │
├────────────┴────────────┴────────────────┤
│                                          │
│       Real-Time Security Events          │
│                                          │
├──────────────────────────────────────────┤
│           Incident Timeline              │
│                                          │
├──────────────────────────────────────────┤
│             AI Analysis                  │
│                                          │
└──────────────────────────────────────────┘
```

---

# 🔄 Incident Response Workflow

```text
Detection
   ↓
Alert Generation
   ↓
Severity Classification
   ↓
Investigation
   ↓
AI-Assisted Analysis
   ↓
Containment Simulation
   ↓
Response
   ↓
Incident Resolution
   ↓
Security Report
```

---

# 🧪 Defensive Simulation Environment

Sentinel AI provides a controlled environment for experimenting with defensive security concepts.

Users can simulate security events and observe how the SOC platform:

1. Detects events
2. Generates alerts
3. Classifies severity
4. Processes logs
5. Creates incidents
6. Performs defensive simulations
7. Records the response
8. Generates an explanation

The system should be deployed only in isolated environments.

---

# 📈 Future Improvements

* 🧠 Advanced AI threat explanation engine
* 🎯 MITRE ATT&CK technique mapping
* 🕸️ Interactive network topology
* 📄 Automated PDF incident reports
* 👥 SOC team collaboration
* 🔎 Advanced threat intelligence
* 📚 Security knowledge base
* 🧩 Automated defensive playbooks
* 📊 Historical incident analytics
* 🔔 Advanced alert notification system
* 🧠 Multi-agent security analysis
* 📡 Advanced real-time event correlation

---

# 🔒 Security Disclaimer

Sentinel AI is intended for **cybersecurity education, defensive security research, SOC training, and controlled simulation**.

Do not use the platform to attack, scan, compromise, or interfere with systems that you do not own or have explicit authorization to test.

All security simulations should be performed inside isolated and controlled environments.

---

# 👩‍💻 Author

**Divya Nishad**

GitHub:
https://github.com/Divya-a-wq/Autonomous-cyber-defense-simulator

---

# ⭐ Contributing

Contributions are welcome.

To contribute:

```bash
git clone https://github.com/Divya-a-wq/Autonomous-cyber-defense-simulator.git

git checkout -b feature/your-feature

git add .

git commit -m "Add your feature"

git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is intended for educational and defensive cybersecurity purposes.
