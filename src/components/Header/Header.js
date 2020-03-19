import React from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import "./Header.css";

class Header extends React.Component {
  render() {
    let greeting = `Hi, ${this.props.userName ? this.props.userName : "Guest"}`;
    return (
      <div className="header-wrapper">
        <Typography variant="h3" component="h1" gutterBottom>
          Todo App
        </Typography>
        <div>
          <span className="header-greeting-wrapper">{greeting}</span>
          <GoogleAuth></GoogleAuth>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.GoogleAuth.isSignedIn,
    userName: state.GoogleAuth.user
  };
};

export default connect(mapStateToProps)(Header);
