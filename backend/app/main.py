"""
FastAPI backend for Leiya Sree M's portfolio.

Run:
    python -m venv venv
    source venv/bin/activate          (Windows: venv\\Scripts\\activate)
    pip install -r requirements.txt
    uvicorn app.main:app --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app import schemas
from app.routers import contact, projects
from rag.generator import generate_answer
from rag.retriever import retrieve_relevant_chunks


app = FastAPI(
    title="Leiya Sree M — Portfolio API",
    description="REST API powering the portfolio of Leiya Sree M, Full Stack Developer.",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROUTERS
# ============================================================

app.include_router(projects.router)
app.include_router(contact.router)


# ============================================================
# AI CHATBOT
# ============================================================

@app.post("/api/chat", tags=["chat"])
def chat(payload: schemas.ChatRequest):
    """
    Answer portfolio-related questions using:
    1. ChromaDB retrieval
    2. Portfolio knowledge context
    3. Ollama / local LLM generation
    """

    message = payload.message.strip()

    if not message:
        raise HTTPException(
            status_code=422,
            detail="Message must not be empty.",
        )

    # --------------------------------------------------------
    # Step 1: Retrieve relevant portfolio information
    # --------------------------------------------------------

    try:
        retrieved_chunks = retrieve_relevant_chunks(
            message,
            top_k=3,
        )

        # Debug information for development
        print("\n===== USER QUESTION =====")
        print(message)

        print("\n===== RETRIEVED CONTEXT =====")

        for chunk in retrieved_chunks:
            print(chunk)

    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Unable to retrieve portfolio information right now.",
        ) from exc

    # --------------------------------------------------------
    # Step 2: Generate answer using the retrieved context
    # --------------------------------------------------------

    try:
        answer = generate_answer(
            message,
            retrieved_chunks,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Unable to generate a response right now.",
        ) from exc

    # --------------------------------------------------------
    # Step 3: Return response to React frontend
    # --------------------------------------------------------

    return {
        "reply": answer,
    }


# ============================================================
# ROOT
# ============================================================

@app.get("/", tags=["root"])
def root():
    return {
        "name": "Leiya Sree M — Portfolio API",
        "status": "running",
        "docs": "/docs",
        "endpoints": [
            "/projects",
            "/contact",
            "/resume",
            "/api/chat",
        ],
    }


# ============================================================
# RESUME
# ============================================================

@app.get("/resume", tags=["resume"])
def resume():
    """
    Returns metadata + a link to the resume file
    served by the frontend.
    """

    return {
        "name": "Leiya Sree M",
        "role": "Computer Science Engineering Graduate",
        "headline": "Full Stack Developer | Python Developer | AI Enthusiast",
        "resume_url": "/Leiyasreem_resume.pdf",
    }