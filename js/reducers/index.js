import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import siteReducer from "./siteReducer";
import keywordReducer from "./keywordReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import addComponentReducer from "./addComponentReducer";

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  site: siteReducer,
  keywords: keywordReducer,
  order: orderReducer,
  auth: authReducer,
  addComponentReducer: addComponentReducer,
});

export default rootReducer;
