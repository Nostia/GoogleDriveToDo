export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";

export const googleUserSignInRequest = () => ({
  type: USER_SIGNIN_REQUEST
});

export const USER_SIGNOUT_REQUEST = "USER_SIGNOUT_REQUEST";
export const USER_SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS";
export const USER_SIGNOUT_FAIL = "USER_SIGNOUT_FAIL";

export const googleUserSignOutRequest = () => ({
  type: USER_SIGNOUT_REQUEST
});

export const SET_SIGNIN_STATUS = "SET_SIGNIN_STATUS";
export const setSignInStatus = status => ({
  type: SET_SIGNIN_STATUS,
  status
});

export const CLIENT_INIT = "CLIENT_INIT";
export const CLIENT_INIT_FAIL = "CLIENT_INIT_FAIL";
