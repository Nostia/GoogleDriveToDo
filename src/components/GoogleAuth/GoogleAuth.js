import React from "react";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";
import { getIsSignedIn, getSignInErrorMessage } from "./GoogleAuthReducer";

import UploadNotification from "../TodoList/components/uploadNotification";
class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);

    this.authorizeButton = React.createRef();
    this.signoutButton = React.createRef();
  }

  componentDidMount() {
    this.loadApi();
  }

  loadApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      this.onScriptLoad();
    };
    document.body.appendChild(script);
  }

  onScriptLoad() {
    window.gapi.load("client:auth2", this.props.clientInit);
  }

  handleSignIn = () => {
    this.props.googleUserSignIn();
  };

  resetSignInStatus = () => {
    this.props.setSignInStatus(null);
  };

  render() {
    return (
      <div>
        {this.props.isSignedIn ? (
          <Button
            color="inherit"
            variant="outlined"
            onClick={this.props.googleUserSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            color="inherit"
            variant="outlined"
            onClick={this.handleSignIn}
          >
            Sign In
          </Button>
        )}
        <UploadNotification
          uploadResult={this.props.uploadResult}
          handleResetResult={this.resetSignInStatus}
        ></UploadNotification>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: getIsSignedIn(state),
    uploadResult: getSignInErrorMessage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    googleUserSignIn: () => dispatch({ type: "USER_SIGNIN_REQUEST" }),
    googleUserSignOut: () => dispatch({ type: "USER_SIGNOUT_REQUEST" }),
    setSignInStatus: status => dispatch({ type: "SET_SIGNIN_STATUS", status }),
    clientInit: () => dispatch({ type: "CLIENT_INIT" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
