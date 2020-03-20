import { all } from "redux-saga/effects";

import {
  onUserSignIn,
  onUserSignOut,
  onclientInit
} from "./components/GoogleAuth/GoogleAuthSagas";

import { onUploadTodoList } from "./components/TodoList/TodoSagas";

export default function* rootSaga() {
  yield all([
    onUserSignIn(),
    onUserSignOut(),
    onUploadTodoList(),
    onclientInit()
  ]);
}
