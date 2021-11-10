from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import tasks

origins = [
    'http://localhost',
    'http://localhost:8000',
    'http://localhost:3000',
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_origins=origins,
    allow_credentials=True,
)

app.include_router(tasks.router, prefix="/api")
