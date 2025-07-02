from pydantic import BaseModel, Field

class CompareRequest(BaseModel):
    text1: str = Field(..., description="First text to compare", min_length=1)
    text2: str = Field(..., description="Second text to compare", min_length=1)
    
    class Config:
        json_schema_extra = {
            "example": {
                "text1": "Hello world",
                "text2": "Hello there"
            }
        }
