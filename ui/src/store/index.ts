import { compose, createStore, applyMiddleware } from "redux";

import { rootReducer } from "./reducer";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware())
);

export default store;
