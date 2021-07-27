import { combineReducers } from "redux";
import auth from "./user/authReducer";

export default combineReducers({
  auth,
});
