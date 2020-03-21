import React from "react";
import "./App.css";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";
import HowTo from "./components/HowTo";

const { persistor, store } = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHowToVisible: false };
  }

  handleCloseHowTo = () => {
    this.setState({ isHowToVisible: false });
  };

  handleOpenHowTo = () => {
    this.setState({ isHowToVisible: true });
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app-wrapper">
            <Header showHowTo={this.handleOpenHowTo}></Header>
            <TodoList></TodoList>
          </div>
          <HowTo
            open={this.state.isHowToVisible}
            handleClose={this.handleCloseHowTo}
          ></HowTo>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
