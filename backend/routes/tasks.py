from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from services.taskServices import TaskService
from schema.taskSchema import TaskBase, TaskStatus
from bson import json_util
import json
from models.task import Task
from helpers.responseHelper import taskListResponse, taskResponse

route = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

taskService = TaskService()

@route.get("/",
           status_code=status.HTTP_200_OK,
           response_model=list[Task])
async def tasks():
    result = await taskService.getTasks()
    if result is False:
        return JSONResponse(
            content={
                "message": "[]"
            },
            status_code=status.HTTP_200_OK
        )
    else:
        task_list = taskListResponse(result)
        return JSONResponse(content=task_list, status_code=status.HTTP_200_OK)
    
@route.get("/{id}",
           status_code=status.HTTP_200_OK,
           response_model=Task)
async def task(id: str):
    resp = await taskService.getTaskById(id)
    if resp is False:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Task not found")
    else:
        task = taskResponse(resp)
        return JSONResponse(content=task, status_code=status.HTTP_200_OK)

@route.post("/",
            status_code=status.HTTP_200_OK,
            response_model=Task)
async def createTask(task: TaskBase):
    try:
        resp = await taskService.createTask(task)
        task = taskResponse(resp)
        return JSONResponse(content=task, status_code=status.HTTP_201_CREATED)
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something wrong happened")

@route.put("/{id}")
async def updateTask(id: str, task: TaskBase):
    try:
        taskMssg = await taskService.updateTask(id, task)
        return JSONResponse(content=taskMssg, status_code=status.HTTP_200_OK)
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something wrong happened")

@route.put("/status/{id}")
async def updateStatusTask(id: str, taskStatus: TaskStatus):
    try:
        taskMssg = await taskService.updateStatusTask(id, taskStatus.status)
        return {
            "status":  HTTPException(status.HTTP_200_OK,
                                     detail=taskMssg)
        }
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something wrong happened")

@route.delete("/{id}")
async def deleteTask(id: str):
    try:
        taskMssg = await taskService.deleteTask(id)
        return JSONResponse(content=taskMssg, status_code=status.HTTP_200_OK)
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something wrong happened")