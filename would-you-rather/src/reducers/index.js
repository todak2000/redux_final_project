import { combineReducers } from "redux";
import authUser from "./authUsers";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";
export default combineReducers({
  authUser,
  users,
  questions,
  loadingBar: loadingBarReducer, // an added module to cater for loader (react-redux-loading)
});
