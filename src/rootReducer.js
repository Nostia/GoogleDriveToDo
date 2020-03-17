import { combineReducers } from "redux";
import todoList from "./components/todoList/todoReducer.js";
import GoogleAuth from "./components/GoogleAuth/GoogleAuthReducer.js";

export default combineReducers({
  todoList,
  GoogleAuth
});
