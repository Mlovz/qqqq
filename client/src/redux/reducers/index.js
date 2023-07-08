import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import article from "./articleReducer";

export default rootReducer = combineReducers({
  auth,
  alert,
  article,
});
