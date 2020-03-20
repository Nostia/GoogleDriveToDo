import { takeLatest, put } from "redux-saga/effects";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAIL,
  CLIENT_INIT
} from "./GoogleAuthActions";

const googleAuthData = {
  clientId:
    "852566243904-r719ipv77lgase30qnk47r12q1930dil.apps.googleusercontent.com",
  apiKey: "AIzaSyBg0WqCuZUMFoLiSDbE1gKdcKCoxiJMSFQ",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  scope: "https://www.googleapis.com/auth/drive"
};

function* userSignIn(action) {
  try {
    let res = yield window.gapi.auth2.getAuthInstance().signIn();
    const userProfile = res.getBasicProfile();
    yield put({ type: USER_SIGNIN_SUCCESS, userName: userProfile.getName() });
  } catch (err) {
    yield put({ type: USER_SIGNIN_FAIL, value: err });
  }
}

function* userSignOut(action) {
  try {
    yield window.gapi.auth2.getAuthInstance().signOut();
    yield put({ type: USER_SIGNOUT_SUCCESS });
  } catch (err) {
    yield put({ type: USER_SIGNOUT_FAIL, value: err });
  }
}

function* clientInit(action) {
  try {
    yield window.gapi.client.init(googleAuthData).then(
      res => {
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.props.setSignInStatus);
        this.props.setSignInStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      },
      function(error) {
        this.appendPre(JSON.stringify(error, null, 2));
      }
    );
  } catch (e) {}
}

export function* onUserSignIn() {
  yield takeLatest(USER_SIGNIN_REQUEST, userSignIn);
}

export function* onUserSignOut() {
  yield takeLatest(USER_SIGNOUT_REQUEST, userSignOut);
}

export function* onclientInit() {
  yield takeLatest(CLIENT_INIT, clientInit);
}
