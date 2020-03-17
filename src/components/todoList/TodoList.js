import React from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";

import GoogleAuth from "../GoogleAuth/GoogleAuth";

import { Button, TextField } from "@material-ui/core";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          title: "title1",
          id: "1"
        },
        {
          title: "title2",
          id: "2"
        },
        {
          title: "title3",
          id: "3"
        }
      ],
      newTask: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    this.setState({ newTask: e.target.value });
  }

  addTask() {
    this.setState({
      todoList: [
        ...this.state.todoList,
        { title: this.state.newTask, id: new Date().getUTCMilliseconds() }
      ]
    });
  }

  render() {
    return (
      <div>
        <h1>Todo list</h1>
        {this.state.todoList.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
        <TextField
          value={this.state.newTask}
          onChange={this.handleChange}
          placeholder="Add new task"
        ></TextField>
        <Button onClick={this.addTask}>Add task</Button>
        <GoogleAuth></GoogleAuth>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList.items
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
