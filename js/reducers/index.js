import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import siteReducer from "./siteReducer";
import keywordReducer from "./keywordReducer";
import authReducer from "./authReducer";
import preferencesReducer from "./preferencesReducer";
import preferencesAllReducer from "./preferencesAllReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  site: siteReducer,
  keywords: keywordReducer,
  auth: authReducer,
  preferences: preferencesReducer,
  preferencesAll: preferencesAllReducer,

});

export default rootReducer;
