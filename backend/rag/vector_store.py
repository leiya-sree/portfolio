"""Build and persist the portfolio knowledge vector store."""
from __future__ import annotations

import hashlib
from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer

try:
	from .ingest import build_chunks, load_knowledge
except ImportError:
	from ingest import build_chunks, load_knowledge


MODEL_NAME = "all-MiniLM-L6-v2"
COLLECTION_NAME = "portfolio_knowledge"
CHROMA_PATH = Path(__file__).resolve().parent / "chroma_db"


def stable_chunk_id(chunk: dict) -> str:
	"""Return an ID that identifies one logical section/subsection chunk."""
	metadata = chunk["metadata"]
	identity = "|".join([metadata["section"], metadata["subsection"]])
	return hashlib.sha256(identity.encode("utf-8")).hexdigest()


def build_vector_store() -> tuple[object, int]:
	"""Embed the portfolio chunks and upsert them into the persistent collection."""
	knowledge = load_knowledge()
	chunks = build_chunks(knowledge)
	print(f"Loaded {len(chunks)} chunks from portfolio knowledge")
	print(f"Loading embedding model: {MODEL_NAME}")

	model = SentenceTransformer(MODEL_NAME)
	client = chromadb.PersistentClient(path=str(CHROMA_PATH))
	collection = client.get_or_create_collection(name=COLLECTION_NAME)
	existing_ids = collection.get(include=[]).get("ids", [])
	if existing_ids:
		collection.delete(ids=existing_ids)
		print(f"Removed {len(existing_ids)} previous chunks before refresh")

	documents = [chunk["text"] for chunk in chunks]
	metadatas = [chunk["metadata"] for chunk in chunks]
	ids = [stable_chunk_id(chunk) for chunk in chunks]
	embeddings = model.encode(documents).tolist()

	collection.upsert(
		ids=ids,
		documents=documents,
		metadatas=metadatas,
		embeddings=embeddings,
	)

	stored_count = collection.count()
	print(f"Embedding model loaded successfully: {MODEL_NAME}")
	print(f"Documents stored: {stored_count}")
	print(f"Collection: {COLLECTION_NAME}")
	print(f"Vector database: {CHROMA_PATH}")
	return collection, stored_count


if __name__ == "__main__":
	build_vector_store()
