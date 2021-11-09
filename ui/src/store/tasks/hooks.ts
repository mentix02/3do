import { useSelector } from "react-redux";

import { Task, TasksState } from "./types";

type TasksStateType = {
  task: TasksState;
};

export const useTasks = (): Task[] =>
  useSelector(({ task }: TasksStateType) => task.tasks);
