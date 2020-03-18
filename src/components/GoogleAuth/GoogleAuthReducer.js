import { createSelector } from "reselect";

const initialState = {
  isSignedIn: false,
  user: null
};

const GoogleAuth = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        isSignedIn: true,
        user: action.user
      };
    case "USER_SIGNIN_FAIL":
      return {
        ...state,
        isSignedIn: false
      };
    case "SET_SIGNIN_STATUS":
      return {
        ...state,
        isSignedIn: action.status
      };
    default:
      return state;
  }
};

export const getUserName = state => state.user && state.user.getName();

export default GoogleAuth;
