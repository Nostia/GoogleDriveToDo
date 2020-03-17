import { takeLatest, put } from "redux-saga/effects";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAIL
} from "./GoogleAuthActions";

function* userSignIn(action) {
  try {
    let res = yield window.gapi.auth2.getAuthInstance().signIn();
    yield put({ type: USER_SIGNIN_SUCCESS, value: res });
  } catch (err) {
    yield put({ type: USER_SIGNIN_FAIL, value: err });
  }
}

function* userSignOut(action) {
  console.log("2");
  try {
    let res = yield window.gapi.auth2.getAuthInstance().signOut();
    yield put({ type: USER_SIGNOUT_SUCCESS, value: res });
  } catch (err) {
    yield put({ type: USER_SIGNOUT_FAIL, value: err });
  }
}

export function* onUserSignIn() {
  yield takeLatest(USER_SIGNIN_REQUEST, userSignIn);
}

export function* onUserSignOut() {
  console.log("1");
  yield takeLatest(USER_SIGNOUT_REQUEST, userSignOut);
}
