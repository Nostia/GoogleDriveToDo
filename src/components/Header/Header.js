import React from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { connect } from "react-redux";

import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import "./Header.css";
import { getUserName } from "../GoogleAuth/GoogleAuthReducer";

class Header extends React.Component {
  render() {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const smallScreen = viewportWidth < 600;
    let greeting = `Welcome, ${
      this.props.userName ? this.props.userName : "Guest"
    } :)`;
    return (
      <AppBar position="static" className="header-wrapper">
        <Toolbar>
          <Typography variant="h6" component="h1" className="header-title">
            Todo App
          </Typography>
          {!smallScreen && <div className="header-greeting">{greeting}</div>}
          <GoogleAuth></GoogleAuth>
          <IconButton
            aria-label="info"
            color="inherit"
            onClick={this.props.showHowTo}
          >
            <InfoIcon></InfoIcon>
          </IconButton>
        </Toolbar>
        {smallScreen && <Toolbar>{greeting}</Toolbar>}
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: getUserName(state)
  };
};

export default connect(mapStateToProps)(Header);
