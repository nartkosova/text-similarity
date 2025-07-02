from fastapi import APIRouter, HTTPException
from schemas.compare_request import CompareRequest
from models.embeddings import compute_score

router = APIRouter()

@router.post("/compute-embeddings", 
    summary="Compare two texts for similarity",
    description="Compute similarity score between two texts using sentence embeddings",
    response_description="Returns a similarity score between 0 and 1")
async def compute_similarity(data: CompareRequest):
    """
    Compute similarity score between two texts using sentence embeddings.
    
    - **text1**: First text to compare (required)
    - **text2**: Second text to compare (required)
    
    Returns a similarity score between 0 and 1, where:
    - 1.0 = identical texts
    - 0.0 = completely different texts
    """
    try:
        score = compute_score(data.text1, data.text2)
        return {"score": score}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to compute similarity: {str(e)}"
        )
