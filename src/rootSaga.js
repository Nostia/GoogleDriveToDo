import { all } from "redux-saga/effects";

import { onUserSignIn, onUserSignOut } from "./components/GoogleAuth/AuthSagas";

import { onUploadTodoList } from "./components/todoList/TodoSagas";

export default function* rootSaga() {
  yield all([onUserSignIn(), onUserSignOut(), onUploadTodoList()]);
}
