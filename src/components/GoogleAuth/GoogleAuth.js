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
    window.gapi.load("client:auth2", initClient.bind(this));

    function initClient() {
      console.log("init client", window.gapi, this);
      let gapi = window.gapi;

      gapi.client
        .init({
          apiKey: this.state.API_KEY,
          clientId: this.state.CLIENT_ID,
          discoveryDocs: this.state.DISCOVERY_DOCS,
          scope: this.state.SCOPES
        })
        .then(
          () => {
            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.props.setSignInStatus);

            // Handle the initial sign-in state.
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
      window.gapi.client.drive.files
        .list({
          pageSize: 10,
          fields: "nextPageToken, files(id, name)"
        })
        .then(response => {
          this.appendPre("Files:");
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              this.appendPre(file.name + " (" + file.id + ")");
            }
          } else {
            this.appendPre("No files found.");
          }
        });
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
    return (
      <div>
        {this.props.isSignedIn ? (
          <div>
            <Button>Add List to Google Drive</Button>
            <Button onClick={this.props.googleUserSignOut}>Sign Out</Button>
          </div>
        ) : (
          <Button onClick={this.syncTodoList}>Sign In</Button>
        )}
        <pre id="content"></pre>
      </div>
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
    setSignInStatus: status => dispatch({ type: "SET_SIGNIN_STATUS", status })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
