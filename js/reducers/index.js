import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
});

export default rootReducer;