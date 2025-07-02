from fastapi import APIRouter
from schemas.compare_request import CompareRequest
from models.embeddings import compute_score

router = APIRouter()

@router.post("/compute-embeddings")
async def compute_similarity(data: CompareRequest):
    try:
        score = compute_score(data.text1, data.text2)
        return {"score": score}
    except Exception as e:
        return {"error": str(e)}
