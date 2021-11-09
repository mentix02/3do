import {
  Task,
  ADD_TASK,
  SET_TASKS,
  UPDATE_TASK,
  REMOVE_TASK,
  AddTaskAction,
  SetTasksAction,
  UpdateTaskAction,
  RemoveTaskAction,
} from "./types";

export const setTasks = (tasks: Task[]): SetTasksAction => ({
  payload: tasks,
  type: SET_TASKS,
});

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const removeTask = (id: string): RemoveTaskAction => ({
  type: REMOVE_TASK,
  payload: id,
});

export const updateTask = (task: Task): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: task,
});
