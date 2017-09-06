import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import siteReducer from "./siteReducer";
import keywordReducer from "./keywordReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import preferencesReducer from "./preferencesReducer";
import appendOrderReducer from "./appendOrderReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  site: siteReducer,
  keywords: keywordReducer,
  order: orderReducer,
  auth: authReducer,
  preferences: preferencesReducer,
  appendOrder: appendOrderReducer,
});

export default rootReducer;
