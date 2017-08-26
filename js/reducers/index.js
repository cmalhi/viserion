import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import siteReducer from "./siteReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  site: siteReducer,
});

export default rootReducer;
