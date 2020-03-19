import { combineReducers } from "redux";
import todoList from "./components/TodoList/TodoReducer.js";
import GoogleAuth from "./components/GoogleAuth/GoogleAuthReducer.js";

export default combineReducers({
  todoList,
  GoogleAuth
});
