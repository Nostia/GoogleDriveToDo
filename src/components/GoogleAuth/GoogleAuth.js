import React from "react";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CLIENT_ID:
        "852566243904-r719ipv77lgase30qnk47r12q1930dil.apps.googleusercontent.com",
      API_KEY: "AIzaSyBg0WqCuZUMFoLiSDbE1gKdcKCoxiJMSFQ",
      DISCOVERY_DOCS: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
      ],
      SCOPES: "https://www.googleapis.com/auth/drive"
    };

    this.authorizeButton = React.createRef();
    this.signoutButton = React.createRef();

    this.syncTodoList = this.syncTodoList.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }

  loadApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      this.onScriptLoad();
    };
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadApi();
  }

  onScriptLoad() {
    window.gapi.load("client:auth2", this.props.clientInit);

    function initClient() {
      let gapi = window.gapi;

      gapi.client
        .init({
          apiKey: this.state.API_KEY,
          clientId: this.state.CLIENT_ID,
          discoveryDocs: this.state.DISCOVERY_DOCS,
          scope: this.state.SCOPES
        })
        .then(
          res => {
            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.props.setSignInStatus);
            this.props.setSignInStatus(
              gapi.auth2.getAuthInstance().isSignedIn.get()
            );
          },
          function(error) {
            this.appendPre(JSON.stringify(error, null, 2));
          }
        );
    }
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
    }
  }

  appendPre(message) {
    var pre = document.getElementById("content");
    var textContent = document.createTextNode(message + "\n");
    pre.appendChild(textContent);
  }

  syncTodoList() {
    this.props.googleUserSignIn();
  }

  render() {
    return this.props.isSignedIn ? (
      <Button onClick={this.props.googleUserSignOut} variant="contained">
        Sign Out
      </Button>
    ) : (
      <Button onClick={this.syncTodoList} variant="contained">
        Sign In
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.GoogleAuth.isSignedIn
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
