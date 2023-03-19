import { combineReducers } from "redux";
import codeBundleReducer from "./codeBundleReducer";

const reducers = combineReducers({
  codeBundle: codeBundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
