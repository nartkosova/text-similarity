from pydantic import BaseModel

class CompareRequest(BaseModel):
    text1: str
    text2: str
