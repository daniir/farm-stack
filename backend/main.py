from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.route)

@app.get("/")
def home():
    return {
        "Message": "Hello World!"
    }