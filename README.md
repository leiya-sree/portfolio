# Leiya Sree M — Personal Portfolio

A modern, responsive personal portfolio website built to showcase my professional profile, technical work, internship experience, education, projects, resume, and contact information.

The portfolio also includes an AI-powered assistant that can answer questions based on the information available on the portfolio.

## 📌 About the Project

This project is my personal developer portfolio website.

The website was developed as a single platform to present my professional information and technical projects through a responsive and interactive interface.

It includes dedicated sections for:

- About
- Skills
- Experience
- Education
- Projects
- Resume
- Contact

The current version also includes a locally running AI portfolio assistant built using Retrieval-Augmented Generation (RAG).

## ✨ Features

- Responsive portfolio website
- Modern dark-themed developer interface
- Animated hero section
- Typing animation
- Interactive skills section
- Education section
- Interactive internship experience section
- Featured projects section
- Individual project detail views
- Resume download
- Contact form
- LinkedIn, GitHub, WhatsApp and Email links
- Responsive navigation
- Smooth animations and transitions
- AI-powered portfolio assistant

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React

### Backend

- Python
- FastAPI
- REST API

### AI / RAG

- ChromaDB
- Sentence Transformers
- Retrieval-Augmented Generation (RAG)
- Ollama
- Llama 3.2

### Database / Services

- Supabase

## 🤖 AI Portfolio Assistant

The portfolio includes an AI assistant called **Ask Leiya AI**.

The assistant is designed to answer questions about information available on the portfolio, including:

- About
- Skills
- Projects
- Experience
- Education
- Resume
- Contact information

### RAG Architecture

The assistant uses a Retrieval-Augmented Generation (RAG) workflow.

```text
User
  ↓
React Chatbot
  ↓
FastAPI API
  ↓
RAG Retrieval
  ↓
ChromaDB
  ↓
Relevant Portfolio Information
  ↓
Ollama
  ↓
Llama 3.2
  ↓
AI Response
```

The portfolio information is stored in a structured knowledge base.

The RAG system retrieves relevant information using embeddings before sending the context to the local AI model for response generation.

### Current AI Setup

The AI assistant currently runs locally using **Ollama**.

It is available for demonstration when the local AI server is running.

The assistant may not be available on the deployed portfolio website because the current AI backend runs locally.


## 📁 Project Structure

```text
portfolio/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── knowledge/
│   │   └── portfolio_knowledge.json
│   │
│   ├── rag/
│   │   ├── generator.py
│   │   ├── ingest.py
│   │   ├── retriever.py
│   │   └── vector_store.py
│   │
│   └── requirements.txt
│
├── public/
│   ├── images/
│   └── Leiyasreem_resume.pdf
│
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Python
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/leiya-sree/portfolio.git
```

### 2. Navigate to the Project

```bash
cd portfolio
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Start the Frontend

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## 🐍 Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

Install the backend dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
uvicorn app.main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

## 🔐 Environment Variables

The frontend uses an environment variable to connect to the local backend.

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Do not commit `.env` or `.env.local` files containing private credentials or configuration to GitHub.

## 🧠 RAG Knowledge Base

The AI assistant uses the portfolio knowledge base located at:

```text
backend/knowledge/portfolio_knowledge.json
```

The knowledge base contains structured information about the portfolio.

The RAG system processes this information and stores vector embeddings in ChromaDB for semantic retrieval.

## ⚠️ Current Limitations

- The AI assistant currently depends on a locally running Ollama server.
- The current AI backend is not publicly accessible from the deployed portfolio.
- The AI assistant is therefore primarily available for local demonstration.
- Additional deployment and AI improvements are planned.

## 🔮 Future Improvements

- Deploy the AI backend for public access
- Improve AI response quality
- Expand the portfolio knowledge base
- Improve RAG retrieval
- Add additional AI-powered features
- Add more portfolio projects
- Continue improving the user experience

## 📄 Resume

The resume is available through the portfolio website.

The current resume is also included in the project:

```text
public/Leiyasreem_resume.pdf
```

## 📬 Contact

**Leiya Sree M**

- Email: leiyasree2005@gmail.com
- LinkedIn: https://www.linkedin.com/in/leiya-sree
- GitHub: https://github.com/leiya-sree

---

© 2026 Leiya Sree M. All rights reserved.