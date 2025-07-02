from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as compare_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare_router)
