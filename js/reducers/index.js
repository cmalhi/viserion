import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import titleReducer from "./titleReducer";
import colorReducer from "./colorReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
});

export default rootReducer;