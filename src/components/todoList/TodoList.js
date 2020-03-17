import React from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";

import GoogleAuth from "../GoogleAuth/GoogleAuth";

import { Button, TextField } from "@material-ui/core";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTask: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    this.props.getTodoList()
  }

  handleChange(e) {
    this.setState({ newTask: e.target.value });
  }

  addTask(e) {
    e.preventDefault();
    this.props.addTodo(this.state.newTask, new Date().getUTCMilliseconds());
    this.setState({ newTask: "" });
  }

  render() {
    return (
      <div>
        <h1>Todo list</h1>
        {this.props.todoList.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
        <form onSubmit={this.addTask}>
          <TextField
            value={this.state.newTask}
            onChange={this.handleChange}
            placeholder="Add new task"
          ></TextField>
          <Button type="submit">Add task</Button>
        </form>
        <GoogleAuth></GoogleAuth>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (text, id) => {
      dispatch({ type: "ADD_TODO", text, id });
    },
    getTodoList: () => {dispatch({ type: "GET_TODO_LIST"});}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
