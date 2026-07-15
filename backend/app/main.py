from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.api.ws.logs import router as ws_logs_router
from app.watchers.watch_manager import WatchManager


@asynccontextmanager
async def lifespan(app: FastAPI):

#    WatchManager.start()

    yield


app = FastAPI(
    title="AIOps Platform API",
    version="1.0.0",
    description="AI-powered Kubernetes Operations Platform",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(ws_logs_router)
