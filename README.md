# 🧠 CortexGPT — Context-Aware AI Chat System

CortexGPT is a full-stack AI conversational platform designed to provide **context-aware and persistent conversations**.

Unlike a basic chatbot that treats every message independently, CortexGPT stores conversation history and user context, allowing the AI to maintain continuity across multi-turn conversations and sessions.

## ✨ Features

* 🤖 AI-powered conversations
* 🧠 Context-aware responses
* 💾 Persistent conversation history
* 🔐 JWT authentication
* 👤 User account management
* 💬 Multi-turn conversations
* 🔎 Conversation search
* 📂 Session-based conversation tracking
* ⚡ AI API integration
* 📱 Responsive chat interface

## 🏗️ Architecture

```text
┌─────────────────────┐
│   React Frontend    │
│    Chat Interface   │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│   Express Backend   │
│ Conversation Logic  │
└───────┬───────┬─────┘
        │       │
        ▼       ▼
┌────────────┐ ┌────────────────┐
│  MongoDB   │ │   OpenAI API   │
│ Chat Data  │ │ AI Generation  │
└────────────┘ └────────────────┘
```

The backend retrieves relevant conversation history, constructs the AI prompt with contextual information, sends it to the AI API, and stores the resulting conversation.

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* OpenAI API
* JWT Authentication

## 📁 Project Structure

```text
SigmaGPT/
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
│   └── server.js
│
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB
* OpenAI API key
* Git

### Clone Repository

```bash
git clone https://github.com/Divya-a-wq/SigmaGPT.git

cd SigmaGPT
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Configure Environment Variables

Create `.env` inside the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cortexgpt
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

## 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## 🔌 API Endpoints

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/auth/register`     | Register a user     |
| POST   | `/api/auth/login`        | Authenticate a user |
| POST   | `/api/chat`              | Send a message      |
| GET    | `/api/conversations`     | Get conversations   |
| GET    | `/api/conversations/:id` | Get a conversation  |

## 🔄 Conversation Flow

```text
User Message
     ↓
Authentication
     ↓
Conversation Retrieval
     ↓
Context Construction
     ↓
AI API
     ↓
Generated Response
     ↓
MongoDB Storage
     ↓
Response to User
```

## 🔮 Future Improvements

* Retrieval-Augmented Generation (RAG)
* Document upload and analysis
* Voice conversations
* Streaming AI responses
* Conversation export
* Semantic memory
* Vector database integration
* Multi-modal conversations

## 👩‍💻 Author

**Divya Nishad**

GitHub:
https://github.com/Divya-a-wq

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
