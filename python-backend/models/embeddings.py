from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def compute_score(text1: str, text2: str) -> float:
    embeddings = model.encode([text1, text2])
    return float(util.cos_sim(embeddings[0], embeddings[1])[0])
