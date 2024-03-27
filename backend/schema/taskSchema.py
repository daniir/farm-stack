from pydantic import BaseModel

class TaskBase(BaseModel):
    name: str
    description: str = None

class TaskStatus(BaseModel):
    status: bool