from bson import ObjectId
from decouple import config
from pymongo import MongoClient
from fastapi import APIRouter, status

from models import Task

client = MongoClient(config('DB_HOST'))
db = client['3do']

router = APIRouter()


# Gets all tasks
@router.get(
    '/tasks',
    tags=['tasks'],
    summary='Get all tasks',
    response_model=list[Task],
)
async def get_tasks():
    return list(db.tasks.find())


# Deletes a task
@router.delete(
    '/tasks/{task_id}',
    tags=['tasks'],
    response_model=None,
    summary='Delete a task',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_task(task_id: str):
    db.tasks.delete_one({'_id': ObjectId(task_id)})
    return None


# Updates a task
@router.patch(
    '/tasks/{task_id}',
    tags=['tasks'],
    response_model=Task,
    summary='Update a task',
    status_code=status.HTTP_202_ACCEPTED,
)
def update_task(task_id: str, task: Task):
    db.tasks.update_one({'_id': ObjectId(task_id)}, {'$set': task.dict()})
    return task


# Inserts a new task
@router.post(
    '/tasks',
    tags=['tasks'],
    response_model=Task,
    summary='Insert a new task',
    status_code=status.HTTP_201_CREATED,
)
async def insert_task(task: Task):
    db.tasks.insert_one(task.dict())
    return task


# Gets a task by id
@router.get(
    '/tasks/{task_id}',
    tags=['tasks'],
    response_model=Task,
    summary='Get a task by id',
)
async def get_task(task_id: str):
    return Task(**db.tasks.find_one({'_id': ObjectId(task_id)}))
