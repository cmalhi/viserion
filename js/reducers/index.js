import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import siteReducer from "./siteReducer";
import keywordReducer from "./keywordReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  site: siteReducer,
  keywords: keywordReducer,
  auth: authReducer,
});

export default rootReducer;
