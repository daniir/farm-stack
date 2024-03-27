from database.mongodb import task_collection
from bson import ObjectId
from models.task import Task
from schema.taskSchema import TaskBase

class TaskService():

    def __init__(self) -> None:
        pass

    async def getTasks(self):
        taskList = []
        tasks = task_collection.find()
        if tasks is None:
            return False
        else:
            for document in await tasks.to_list(length=50):
                taskList.append(document)
            return taskList
        
    async def getTaskById(self, id: str) -> Task:
        task = await task_collection.find_one({ "_id": ObjectId(id)  })
        if task is None:
            return False
        else:
            return task

    async def createTask(self, task: TaskBase) -> Task:
        newTask = await task_collection.insert_one({
                "name": task.name,
                "description": task.description,
                "status": False
            })
        created_task = await self.getTaskById(newTask.inserted_id)
        return created_task

    async def updateTask(self, id: str, task: TaskBase) -> str:
        await task_collection.update_one({ "_id": ObjectId(id) }, {
            "$set": {
                "name": task.name,
                "description": task.description
            }
        })
        return f"task with _id: {id}, has been updated"
    
    async def updateStatusTask(self, id: str, status: bool) -> str:
        await task_collection.update_one({ "_id": ObjectId(id) }, {
            "$set": {
                "status": status
            }
        })
        return f"task with _id: {id}, is complete"

    async def deleteTask(self, id: str) -> str:
        await task_collection.delete_one({ "_id": ObjectId(id) })
        return f"task with _id: {id}, has been deleted"
