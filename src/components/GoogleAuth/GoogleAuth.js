import React from "react";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";
import { getIsSignedIn } from "./GoogleAuthReducer";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);

    this.authorizeButton = React.createRef();
    this.signoutButton = React.createRef();

    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignIn() {
    this.props.googleUserSignIn();
  }

  render() {
    return this.props.isSignedIn ? (
      <Button
        color="inherit"
        variant="outlined"
        onClick={this.props.googleUserSignOut}
      >
        Sign Out
      </Button>
    ) : (
      <Button color="inherit" variant="outlined" onClick={this.handleSignIn}>
        Sign In
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: getIsSignedIn(state)
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
