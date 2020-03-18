import React from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { connect } from "react-redux";

import { getUserName } from "../GoogleAuth/GoogleAuthReducer";

import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header-wrapper">
        <h1>Todo App</h1>
        <div>
          <span className="header-greeting-wrapper">
            {" "}
            Hey, UserName
            {/* {this.props.userName} */}
          </span>
          <GoogleAuth></GoogleAuth>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.GoogleAuth.isSignedIn,
    userName: getUserName(state)
  };
};

const mapDispatchToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
