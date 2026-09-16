"""Generate grounded portfolio answers with a local Ollama model."""

from __future__ import annotations

import json
import os
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


# ============================================================
# OLLAMA CONFIGURATION
# ============================================================

OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434/api/chat",
)

MODEL_NAME = "llama3.2:3b"


# ============================================================
# SYSTEM INSTRUCTIONS
# ============================================================

_SYSTEM_INSTRUCTIONS = """You are Leiya Sree M's portfolio assistant.

Your job is to answer questions about Leiya using ONLY the portfolio
context supplied in the user message.

IMPORTANT RULES:

1. Use ONLY the supplied portfolio context.
2. Never invent information.
3. Never assume information that is not present.
4. If the requested information is present in the context, answer it directly.
5. If the requested information is NOT present in the context, say:
   "That information is not available in the portfolio."
6. Do not say that the context does not mention something if the information
   is actually present in the supplied context.
7. Do not invent salary, job history, technologies, achievements, project
   details, education details, contact information, or personal information.
8. When the context contains multiple relevant entries, combine them when
   appropriate.
9. For internship questions, use the experience information supplied in the
   context.
10. Keep answers concise, professional, and natural.
11. Normally answer in 1–4 sentences.
12. The supplied portfolio context is authoritative.

IMPORTANT:
Before saying information is unavailable, carefully check ALL supplied
context entries for the answer.
"""


# ============================================================
# BUILD CONTEXT
# ============================================================

def _build_context(
    retrieved_chunks: list[dict[str, Any]],
) -> str:
    """Format retrieved portfolio chunks into a grounded context block."""

    context_parts: list[str] = []

    for index, chunk in enumerate(retrieved_chunks, start=1):

        metadata = chunk.get("metadata", {})

        section = metadata.get(
            "section",
            "unknown",
        )

        subsection = metadata.get(
            "subsection",
            "unknown",
        )

        text = chunk.get(
            "text",
            "",
        ).strip()

        if not text:
            continue

        context_parts.append(
            f"[Context {index}]\n"
            f"Section: {section}\n"
            f"Subsection: {subsection}\n"
            f"Information: {text}"
        )

    return "\n\n".join(context_parts)


# ============================================================
# GENERATE ANSWER
# ============================================================

def generate_answer(
    question: str,
    retrieved_chunks: list[dict[str, Any]],
) -> str:
    """
    Generate a grounded answer from the user's question
    and retrieved portfolio chunks.
    """

    question = question.strip()

    if not question:
        raise ValueError(
            "question must not be empty"
        )

    # --------------------------------------------------------
    # DEBUG: SHOW WHAT THE GENERATOR RECEIVES
    # --------------------------------------------------------

    print("\n========================================")
    print("===== GENERATOR INPUT =====")
    print("========================================")

    print("\nUSER QUESTION:")
    print(question)

    print("\nRETRIEVED CHUNKS:")

    for index, chunk in enumerate(
        retrieved_chunks,
        start=1,
    ):
        print(f"\n--- Chunk {index} ---")
        print(chunk)

    # --------------------------------------------------------
    # Build context
    # --------------------------------------------------------

    context = _build_context(
        retrieved_chunks
    )

    if not context:
        raise ValueError(
            "retrieved_chunks must contain at least one "
            "non-empty chunk"
        )

    # --------------------------------------------------------
    # DEBUG: SHOW FINAL CONTEXT SENT TO OLLAMA
    # --------------------------------------------------------

    print("\n========================================")
    print("===== CONTEXT SENT TO OLLAMA =====")
    print("========================================")

    print(context)

    # --------------------------------------------------------
    # Ollama request
    # --------------------------------------------------------

    payload = {
        "model": MODEL_NAME,
        "stream": False,
        "keep_alive": "10m",

        "options": {
            "temperature": 0.2,
            "top_p": 0.9,
            "num_predict": 128,
        },

        "messages": [
            {
                "role": "system",
                "content": _SYSTEM_INSTRUCTIONS,
            },

            {
                "role": "user",
                "content": (
                    "Here is the portfolio information:\n\n"
                    f"{context}\n\n"
                    "Now answer the following question "
                    "using ONLY the portfolio information above.\n\n"
                    f"Question: {question}"
                ),
            },
        ],
    }

    # --------------------------------------------------------
    # Create HTTP request
    # --------------------------------------------------------

    request = Request(
        OLLAMA_URL,
        data=json.dumps(
            payload
        ).encode("utf-8"),

        headers={
            "Content-Type": "application/json",
        },

        method="POST",
    )

    # --------------------------------------------------------
    # Call Ollama
    # --------------------------------------------------------

    try:

        with urlopen(
            request,
            timeout=120,
        ) as response:

            result = json.loads(
                response
                .read()
                .decode("utf-8")
            )

    except HTTPError as exc:

        if exc.code == 404:
            raise RuntimeError(
                "Ollama model or endpoint was not found."
            ) from exc

        raise RuntimeError(
            "Ollama returned an API error."
        ) from exc

    except (
        URLError,
        TimeoutError,
        ConnectionError,
    ) as exc:

        raise RuntimeError(
            "Ollama is unavailable. "
            "Start Ollama and try again."
        ) from exc

    except (
        json.JSONDecodeError,
        KeyError,
        TypeError,
    ) as exc:

        raise RuntimeError(
            "Ollama returned an invalid response."
        ) from exc

    # --------------------------------------------------------
    # Extract answer
    # --------------------------------------------------------

    answer = (
        result
        .get("message", {})
        .get("content", "")
        .strip()
    )

    if not answer:
        raise RuntimeError(
            "Ollama returned an empty response."
        )

    # --------------------------------------------------------
    # DEBUG: SHOW GENERATED ANSWER
    # --------------------------------------------------------

    print("\n========================================")
    print("===== OLLAMA ANSWER =====")
    print("========================================")

    print(answer)

    print("\n========================================\n")

    return answer


# ============================================================
# DIRECT TEST
# ============================================================

if __name__ == "__main__":

    manual_context = [
        {
            "text": (
                "Leiya's internship experience at "
                "Banibro Technologies Pvt Ltd as a "
                "Software Development Intern involved "
                "an Odoo ERP software development environment. "
                "She worked on data scraping and data processing "
                "using Python, XML, and PostgreSQL. "
                "Technologies: Python, XML, PostgreSQL, Odoo ERP."
            ),

            "metadata": {
                "section": "experience",
                "subsection": "Banibro Technologies Pvt Ltd",
                "source": "portfolio_knowledge.json",
            },
        }
    ]

    try:

        answer = generate_answer(
            "What technologies did I use during my Odoo internship?",
            manual_context,
        )

        print("Ollama connection: successful")
        print(f"Model: {MODEL_NAME}")
        print("Generation succeeded: yes")
        print(f"Generated answer: {answer}")

    except RuntimeError as exc:

        print("Ollama connection: failed")
        print(f"Model: {MODEL_NAME}")
        print("Generation succeeded: no")
        print(f"Failure category: {exc}")