import configureEndpoint from "./host";
import { Task } from "../store/tasks/types";

const BASE_URL = configureEndpoint("tasks");

// get tasks
export const getTasks = async (): Promise<Task[]> => {
  const resp = await fetch(`${BASE_URL}`);
  return await resp.json();
};

// update task
export const updateTask = async (task: Task): Promise<Task> => {
  const resp = await fetch(`${BASE_URL}/${task._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await resp.json();
};

// add task
export const addTask = async (task: Task): Promise<Task> => {
  const resp = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });
  return await resp.json();
};

// delete task
export const deleteTask = async (id: string)=> {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
