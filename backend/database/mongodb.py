from motor.motor_asyncio import AsyncIOMotorClient
from settings.settings import user, passwd, host, port

MONGO_URL = f"mongodb://{user}:{passwd}@{host}:{port}"

client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database("taskslist")
task_collection = db.get_collection("tasks")