import { combineReducers } from "redux";

import tasksReducer from "./tasks/reducer";

export const rootReducer = combineReducers({
  task: tasksReducer
});

export type RootState = ReturnType<typeof rootReducer>;
