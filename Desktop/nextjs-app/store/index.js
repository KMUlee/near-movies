import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules";

const makeStore = (context) => createStore(rootReducer);

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
