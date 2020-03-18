import React from "react";
import "./App.css";
import store from "./configureStore";
import { Provider } from "react-redux";

import TodoList from "./components/todoList/TodoList";
import Header from "./components/Header/Header";

function App() {
  return (
    <Provider store={store}>
      <div className="app-list-wrapper">
        <Header></Header>
        <TodoList></TodoList>
      </div>
    </Provider>
  );
}

export default App;
