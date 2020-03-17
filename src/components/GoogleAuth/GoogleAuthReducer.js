const GoogleAuth = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        isSignedIn: true
      };
    case "USER_SIGNIN_FAIL":
      return {
        ...state,
        isSignedIn: false
      };
    case "SET_SIGNIN_STATUS":
      return {
        isSignedIn: action.status
      };
    default:
      return StyleSheet;
  }
};

export default GoogleAuth;
