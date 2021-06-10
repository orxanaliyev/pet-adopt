import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_()
    : (f) => f
);

export default store;
