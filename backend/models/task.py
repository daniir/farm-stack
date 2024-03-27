from pydantic import BaseModel

class Task(BaseModel):
    _id: str
    name: str
    description: str | None = None
    status: bool