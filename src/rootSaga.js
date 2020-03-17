import { all } from "redux-saga/effects";

import {
  onUserSignIn,
  onUserSignOut
} from "./components/GoogleAuth/AuthSagas";

export default function* rootSaga() {
  yield all([onUserSignIn(), onUserSignOut()]);
}
