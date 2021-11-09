import {
  ADD_TASK,
  SET_TASKS,
  TasksState,
  CLEAR_TASKS,
  REMOVE_TASK,
  UPDATE_TASK,
  TaskActionTypes,
} from "./types";

const initialState: TasksState = {
  tasks: [],
};

const tasksReducer = (
  state: TasksState = initialState,
  action: TaskActionTypes
): TasksState => {
  switch (action.type) {
    case SET_TASKS:
      return {
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_TASK:
      return {
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload._id) {
            return {
              ...task,
              ...action.payload,
            };
          }
          return task;
        }),
      };
    case CLEAR_TASKS:
      return {
        tasks: [],
      };
    default:
      return state;
  }
};

export default tasksReducer;
