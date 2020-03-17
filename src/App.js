import React from "react";
import "./App.css";
import store from "./configureStore";
import { Provider } from "react-redux";

import TodoList from "./components/todoList/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList></TodoList>
      </div>
    </Provider>
  );
}

export default App;
