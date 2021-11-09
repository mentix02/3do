export const ADD_TASK = "ADD_TASK";
export const SET_TASKS = "SET_TASKS";
export const CLEAR_TASKS = "CLEAR_TASKS";
export const REMOVE_TASK = "REMOVE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export type Task = {
  _id?: string;
  content: string;
  priority: number;
  timestamp?: string;
  completed?: boolean;
};

export type TasksState = {
  tasks: Task[];
};

export type SetTasksAction = {
  payload: Task[];
  type: typeof SET_TASKS;
}

export type ClearTaskAction = {
  type: typeof CLEAR_TASKS;
};

export type AddTaskAction = {
  payload: Task;
  type: typeof ADD_TASK;
};

export type RemoveTaskAction = {
  payload: string; // id of task
  type: typeof REMOVE_TASK;
};

export type UpdateTaskAction = {
  payload: Task;
  type: typeof UPDATE_TASK;
};

export type TaskActionTypes =
  | AddTaskAction
  | SetTasksAction
  | ClearTaskAction
  | RemoveTaskAction
  | UpdateTaskAction;
