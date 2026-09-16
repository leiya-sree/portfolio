"""Load portfolio knowledge and prepare metadata-rich text chunks.

This module intentionally stops before embeddings or vector storage. It can be
extended later by consuming the dictionaries returned from ``build_chunks``.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

SOURCE_PATH = Path(__file__).resolve().parents[1] / "knowledge" / "portfolio_knowledge.json"


def load_knowledge(path: Path = SOURCE_PATH) -> dict[str, Any]:
    """Load the structured portfolio knowledge JSON document."""
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def _format_fields(fields: dict[str, Any]) -> str:
    """Render scalar and list fields as readable factual lines."""
    lines = []
    for key, value in fields.items():
        label = key.replace("_", " ").capitalize()
        if isinstance(value, list):
            value = ", ".join(str(item) for item in value)
        lines.append(f"{label}: {value}")
    return "\n".join(lines)


def _chunk(section: str, subsection: str, fields: dict[str, Any]) -> dict[str, Any]:
    section_intros = {
        "profile": "Portfolio profile for Leiya Sree M.",
        "about": "About Leiya Sree M and her development focus.",
        "skills": "Leiya's technical skills include the following category and technologies.",
        "experience": "Leiya's internship experience includes the following role and work.",
        "projects": "Leiya's portfolio project has the following project details.",
        "education": "Leiya's education record contains the following qualification details.",
        "contact": "Contact information for Leiya Sree M.",
        "career_goal": "Leiya's career goal and professional objective are as follows.",
    }
    text = f"{section_intros[section]}\n{_format_fields(fields)}"

    if section == "skills":
        if subsection == "Backend":
            text = (
                "Leiya's backend technical skills include server-side and API "
                "development technologies.\n"
                f"{_format_fields(fields)}"
            )
        elif subsection == "Frontend":
            text = (
                "Leiya's frontend technical skills include client-side web "
                "development technologies.\n"
                f"{_format_fields(fields)}"
            )

    return {
        "text": text,
        "metadata": {
            "section": section,
            "subsection": subsection,
            "source": str(SOURCE_PATH),
        },
    }


def build_chunks(knowledge: dict[str, Any]) -> list[dict[str, Any]]:
    """Convert each meaningful knowledge entry into one self-contained chunk."""
    chunks = [
        _chunk("profile", "overview", knowledge["profile"]),
        _chunk("about", "overview", knowledge["about"]),
    ]

    for category, technologies in knowledge["skills"].items():
        chunks.append(
            _chunk(
                "skills",
                category,
                {"category": category, "technologies": technologies},
            )
        )

    for experience in knowledge["experience"]:
        chunks.append(
            _chunk(
                "experience",
                experience["company"],
                experience,
            )
        )

    for project in knowledge["projects"]:
        chunks.append(
            _chunk(
                "projects",
                project["title"],
                project,
            )
        )

    for education in knowledge["education"]:
        chunks.append(
            _chunk(
                "education",
                education["degree_or_qualification"],
                education,
            )
        )

    chunks.extend(
        [
            _chunk("contact", "contact details", knowledge["contact"]),
            _chunk("career_goal", "career direction", knowledge["career_goal"]),
        ]
    )
    return chunks


def main() -> None:
    knowledge = load_knowledge()
    chunks = build_chunks(knowledge)

    print(f"Loaded portfolio knowledge successfully: {SOURCE_PATH}")
    print(f"Chunks created: {len(chunks)}")
    print("Chunk metadata:")
    for index, chunk in enumerate(chunks, start=1):
        metadata = chunk["metadata"]
        print(
            f"{index}. section={metadata['section']}, "
            f"subsection={metadata['subsection']}, source={metadata['source']}"
        )


if __name__ == "__main__":
    main()
