"""Retrieve relevant portfolio knowledge chunks from the local vector store."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import chromadb
from sentence_transformers import SentenceTransformer


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_NAME = "all-MiniLM-L6-v2"
COLLECTION_NAME = "portfolio_knowledge"
CHROMA_PATH = Path(__file__).resolve().parent / "chroma_db"

_model: SentenceTransformer | None = None
_collection: Any = None


# ============================================================
# LOAD MODEL + VECTOR DATABASE
# ============================================================

def _get_collection() -> Any:
    """Load the embedding model and persistent Chroma collection once."""

    global _model, _collection

    if _model is None:
        print(f"Loading embedding model: {MODEL_NAME}")
        _model = SentenceTransformer(MODEL_NAME)
        print(f"Embedding model loaded successfully: {MODEL_NAME}")

    if _collection is None:
        client = chromadb.PersistentClient(
            path=str(CHROMA_PATH)
        )

        _collection = client.get_collection(
            name=COLLECTION_NAME
        )

        print(
            f"ChromaDB collection loaded: "
            f"{COLLECTION_NAME} "
            f"({_collection.count()} documents)"
        )

    return _collection


# ============================================================
# QUERY TOKENIZATION
# ============================================================

def _query_tokens(query: str) -> set[str]:
    """Convert query text into lowercase word tokens."""

    return set(
        re.findall(
            r"[a-z0-9]+",
            query.lower(),
        )
    )


# ============================================================
# SECTION DETECTION
# ============================================================

def _target_sections(
    query_tokens: set[str],
) -> set[str]:
    """
    Detect the main portfolio section requested by the user.

    Specific intent words such as internship/Odoo/experience
    receive higher priority than generic words such as
    technology or use.
    """

    # --------------------------------------------------------
    # Strong intent detection
    # --------------------------------------------------------

    experience_strong = {
        "internship",
        "internships",
        "intern",
        "worked",
        "work",
        "company",
        "companies",
        "experience",
        "job",
        "jobs",
        "role",
        "roles",
        "employment",
        "career",
        "odoo",
    }

    education_strong = {
        "education",
        "educational",
        "degree",
        "study",
        "studied",
        "course",
        "university",
        "school",
        "college",
        "cgpa",
        "percentage",
        "hsc",
        "bachelor",
        "engineering",
    }

    project_strong = {
        "project",
        "projects",
        "built",
        "build",
        "developed",
        "features",
        "dashboard",
        "pothole",
        "yolov8",
    }

    contact_strong = {
        "contact",
        "email",
        "phone",
        "reach",
        "linkedin",
        "github",
        "whatsapp",
    }

    profile_strong = {
        "name",
        "headline",
        "location",
        "background",
        "profile",
        "about",
    }

    skills_strong = {
        "skill",
        "skills",
        "technologies",
        "technology",
        "technical",
        "stack",
        "tools",
        "libraries",
        "frontend",
        "backend",
        "database",
        "python",
        "react",
        "sql",
    }

    # --------------------------------------------------------
    # IMPORTANT:
    # Specific experience words win over generic
    # "technology" / "use" words.
    # --------------------------------------------------------

    if query_tokens & experience_strong:
        return {"experience"}

    if query_tokens & education_strong:
        return {"education"}

    if query_tokens & project_strong:
        return {"projects"}

    if query_tokens & contact_strong:
        return {"contact"}

    # --------------------------------------------------------
    # Skills only after specific sections are checked
    # --------------------------------------------------------

    if query_tokens & skills_strong:
        return {"skills"}

    if query_tokens & profile_strong:
        return {"profile"}

    return set()


# ============================================================
# SECTION BOOST
# ============================================================

def _section_boost(
    query_tokens: set[str],
    section: str,
    subsection: str,
) -> float:
    """Give additional ranking weight to the intended section."""

    boost = 0.0

    target_sections = _target_sections(
        query_tokens
    )

    # --------------------------------------------------------
    # Strong section match
    # --------------------------------------------------------

    if section in target_sections:

        if section == "experience":
            boost += 1.5

        elif section == "education":
            boost += 1.5

        elif section == "projects":
            boost += 1.5

        elif section == "contact":
            boost += 1.5

        elif section == "skills":
            boost += 0.8

        else:
            boost += 0.5

    # --------------------------------------------------------
    # Experience-specific keywords
    # --------------------------------------------------------

    if section == "experience":

        if query_tokens & {
            "internship",
            "internships",
            "intern",
            "experience",
            "worked",
            "work",
            "company",
            "companies",
            "odoo",
            "role",
            "employment",
        }:
            boost += 1.0

        # Banibro / Odoo-related matching
        if query_tokens & {
            "odoo",
            "erp",
        }:
            boost += 1.5

    # --------------------------------------------------------
    # Education-specific keywords
    # --------------------------------------------------------

    if section == "education":

        if query_tokens & {
            "education",
            "educational",
            "degree",
            "study",
            "studied",
            "course",
            "university",
            "school",
            "college",
            "cgpa",
            "hsc",
            "bachelor",
            "engineering",
        }:
            boost += 1.0

    # --------------------------------------------------------
    # Project-specific keywords
    # --------------------------------------------------------

    if section == "projects":

        if query_tokens & {
            "project",
            "projects",
            "built",
            "build",
            "developed",
            "features",
            "dashboard",
            "yolov8",
            "pothole",
        }:
            boost += 1.0

    # --------------------------------------------------------
    # Skills-specific matching
    # --------------------------------------------------------

    if section == "skills":

        if query_tokens & {
            "skill",
            "skills",
            "technology",
            "technologies",
            "technical",
            "stack",
        }:
            boost += 0.4

        if subsection.lower() in query_tokens:
            boost += 0.55

        if (
            subsection == "Backend"
            and query_tokens
            & {
                "server",
                "side",
                "api",
                "python",
                "fastapi",
            }
        ):
            boost += 0.4

        if (
            subsection == "Frontend"
            and query_tokens
            & {
                "frontend",
                "client",
                "react",
                "javascript",
                "html5",
                "css3",
            }
        ):
            boost += 0.4

    return boost


# ============================================================
# RETRIEVAL
# ============================================================

def retrieve_relevant_chunks(
    query: str,
    top_k: int = 3,
) -> list[dict[str, Any]]:
    """
    Return the most relevant portfolio chunks.

    Uses:
    - semantic similarity from ChromaDB
    - lexical overlap
    - section intent
    - strong keyword boosts
    """

    query = query.strip()

    if not query:
        raise ValueError(
            "query must not be empty"
        )

    if top_k < 1:
        raise ValueError(
            "top_k must be at least 1"
        )

    collection = _get_collection()

    # --------------------------------------------------------
    # Create query embedding
    # --------------------------------------------------------

    query_embedding = _model.encode(
        [query]
    ).tolist()

    candidate_count = collection.count()

    result = collection.query(
        query_embeddings=query_embedding,
        n_results=candidate_count,
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )

    documents = result.get(
        "documents",
        [[]],
    )[0]

    metadatas = result.get(
        "metadatas",
        [[]],
    )[0]

    distances = result.get(
        "distances",
        [[]],
    )[0]

    # --------------------------------------------------------
    # Analyze query
    # --------------------------------------------------------

    query_tokens = _query_tokens(
        query
    )

    target_sections = _target_sections(
        query_tokens
    )

    # --------------------------------------------------------
    # Rank results
    # --------------------------------------------------------

    ranked: list[dict[str, Any]] = []

    for document, metadata, distance in zip(
        documents,
        metadatas,
        distances,
    ):

        document_tokens = _query_tokens(
            document
        )

        lexical_overlap = (
            len(
                query_tokens
                & document_tokens
            )
            / max(
                len(query_tokens),
                1,
            )
        )

        section = metadata.get(
            "section",
            "",
        )

        subsection = metadata.get(
            "subsection",
            "",
        )

        intent_boost = _section_boost(
            query_tokens,
            section,
            subsection,
        )

        rank_score = (
            -distance
            + lexical_overlap * 0.2
            + intent_boost
        )

        ranked.append(
            {
                "text": document,
                "metadata": metadata,
                "distance": distance,
                "_rank_score": rank_score,
            }
        )

    # --------------------------------------------------------
    # Sort by final ranking
    # --------------------------------------------------------

    ranked.sort(
        key=lambda result: result["_rank_score"],
        reverse=True,
    )

    # --------------------------------------------------------
    # Remove internal score
    # --------------------------------------------------------

    for result in ranked:
        result.pop(
            "_rank_score",
            None,
        )

    # --------------------------------------------------------
    # If we detected a target section,
    # return only that section.
    # --------------------------------------------------------

    if target_sections:

        targeted = [
            result
            for result in ranked
            if result["metadata"].get(
                "section"
            ) in target_sections
        ]

        if targeted:
            return targeted[:top_k]

    return ranked[:top_k]


# ============================================================
# TEST HELPER
# ============================================================

def _print_test_results(
    query: str,
) -> None:

    print(
        f"\nQuery: {query}"
    )

    results = retrieve_relevant_chunks(
        query
    )

    for index, result in enumerate(
        results,
        start=1,
    ):

        metadata = result[
            "metadata"
        ]

        print(
            f"  Result {index} "
            f"(distance={result['distance']:.6f})"
        )

        print(
            f"    section: "
            f"{metadata['section']}"
        )

        print(
            f"    subsection: "
            f"{metadata['subsection']}"
        )

        print(
            f"    source: "
            f"{metadata['source']}"
        )

        print(
            "    text:\n      "
            + result["text"].replace(
                chr(10),
                chr(10) + "      ",
            )
        )


# ============================================================
# DIRECT TESTS
# ============================================================

if __name__ == "__main__":

    print(
        f"Vector database path: "
        f"{CHROMA_PATH}"
    )

    print(
        f"Collection name: "
        f"{COLLECTION_NAME}"
    )

    test_queries = [
        "What technologies did Leiya use during her Odoo internship?",
        "What did Leiya learn during her internships?",
        "Tell me about Leiya's internships.",
        "What technologies does Leiya know?",
        "What backend technologies does Leiya use?",
        "What frontend technologies does Leiya know?",
        "Tell me about the AI projects.",
        "Tell me about Leiya's education.",
        "What is your educational background?",
        "What did you study?",
        "What degree did you complete?",
        "What are your technical skills?",
        "What projects have you built?",
        "How can I contact you?",
    ]

    for test_query in test_queries:
        _print_test_results(
            test_query
        )