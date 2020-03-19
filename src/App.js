import React from "react";
import "./App.css";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app-list-wrapper">
          <Header></Header>
          <TodoList></TodoList>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
