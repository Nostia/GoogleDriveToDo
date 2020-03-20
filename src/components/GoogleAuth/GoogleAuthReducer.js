const initialState = {
  isSignedIn: false,
  user: null,
  signInError: null,
  initError: null
};

const GoogleAuth = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        isSignedIn: true,
        user: action.userName
      };
    case "USER_SIGNIN_FAIL":
      return {
        ...state,
        isSignedIn: false
      };
    case "USER_SIGNOUT_SUCCESS":
      return {
        ...state,
        user: null,
        isSignedIn: false,
        signInError: action.error
      };
    case "SET_SIGNIN_STATUS":
      return {
        ...state,
        isSignedIn: action.status
      };
    case "CLIENT_INIT_FAIL":
      return {
        ...state,
        initError: action.error
      };
    default:
      return state;
  }
};

export default GoogleAuth;

export const getIsSignedIn = state => {
  return state.GoogleAuth.isSignedIn;
};
export const getUserName = state => {
  return state.GoogleAuth.user;
};

export const getSignInErrorMessage = state => {
  if (!state.GoogleAuth.signInError) return null;
  return {
    type: "error",
    message: `Sign in failed. Reason: ${state.GoogleAuth.signInError}`
  };
};
