from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router

app = FastAPI(
    title="AIOps Platform API",
    version="1.0.0",
    description="AI-powered Kubernetes Operations Platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.56.104:5173",  # Frontend on VM
        "http://192.168.0.112:5173",   # If you run frontend on bridge IP
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to AIOps Platform API"
    }
