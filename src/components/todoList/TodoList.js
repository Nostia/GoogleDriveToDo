import React from "react";

import { connect } from "react-redux";
import { getCompletedTodos, getIncompletedTodos } from "./TodoReducer";

import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

import {
  Button,
  Card,
  List,
  ListItem,
  CardHeader,
  CardContent,
  Tooltip,
  Typography
} from "@material-ui/core";
import "./TodoList.css";
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTask: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
  }

  handleChange(e) {
    this.setState({ newTask: e.target.value });
  }

  addTask(e) {
    if (this.state.newTask.length) {
      e.preventDefault();
      this.props.addTodo(this.state.newTask, new Date().getUTCMilliseconds());
      this.setState({ newTask: "" });
    }
  }

  handleToggleTodo(id, e) {
    this.props.toggleTodo(id);
  }

  handleRemoveTodo(id, e) {
    this.props.removeTodo(id);
  }

  render() {
    let canUpload = this.props.isSignedIn && this.props.todoList.length;
    let tooltipTitle = canUpload
      ? ""
      : "To upload todo list first sign in and add todo items";
    return (
      <Card className="todo-list-wrapper" variant="outlined">
        <CardHeader title="Todo list"></CardHeader>
        <CardContent>
          <Tooltip title={tooltipTitle}>
            <span>
              <Button
                disabled={!canUpload}
                onClick={this.props.uploadTodoList}
                color="primary"
                variant="contained"
              >
                Upload List to Google Drive
              </Button>
            </span>
          </Tooltip>

          <List>
            {this.props.incompletedTodos.map(todo => (
              <ListItem key={todo.id}>
                <TodoItem
                  todo={todo}
                  toggleTodo={e => this.handleToggleTodo(todo.id, e)}
                  removeTodo={e => this.handleRemoveTodo(todo.id, e)}
                />
              </ListItem>
            ))}
          </List>
          {this.props.completedTodos.length > 0 && (
            <Typography variant="subtitle1">Completed items:</Typography>
          )}

          <List>
            {this.props.completedTodos.map(todo => (
              <ListItem key={todo.id}>
                <TodoItem
                  todo={todo}
                  toggleTodo={e => this.handleToggleTodo(todo.id, e)}
                  removeTodo={e => this.handleRemoveTodo(todo.id, e)}
                />
              </ListItem>
            ))}
          </List>
          <AddTodo
            newTask={this.state.newTask}
            addTask={this.addTask}
            handleChange={this.handleChange}
          ></AddTodo>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    isSignedIn: state.GoogleAuth.isSignedIn,
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompletedTodos(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (text, id) => {
      dispatch({ type: "ADD_TODO", text, id });
    },
    getTodoList: () => {
      dispatch({ type: "GET_TODO_LIST" });
    },
    toggleTodo: id => {
      dispatch({ type: "TOGGLE_TODO", id });
    },
    removeTodo: id => {
      dispatch({ type: "REMOVE_TODO", id });
    },
    uploadTodoList: () => dispatch({ type: "UPLOAD_TODO_LIST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
