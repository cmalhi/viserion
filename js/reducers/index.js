import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import colorReducer from "./colorReducer";
import titleReducer from "./titleReducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  layouts: layoutReducer,
  colors: colorReducer,
  title: titleReducer,
  form: formReducer,
});

export default rootReducer;