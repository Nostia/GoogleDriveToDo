import React from "react";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import {
  getCompletedTodos,
  getIncompletedTodos,
  getIsListUploading,
  getUploadResultMessage,
  getTodoList
} from "./TodoReducer";
import { getIsSignedIn } from "../GoogleAuth/GoogleAuthReducer";

import AddTodo from "./components/AddTodo.js";
import TodoItem from "./components/TodoItem.js";

import {
  Button,
  Card,
  List,
  ListItem,
  CardHeader,
  CardContent,
  Tooltip,
  Typography,
  CircularProgress
} from "@material-ui/core";
import "./TodoList.css";
import UploadNotification from "./components/uploadNotification";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: "",
      showNotification: false
    };
  }

  handleChange = e => {
    this.setState({ newTask: e.target.value });
  };

  addTask = e => {
    if (this.state.newTask.length) {
      e.preventDefault();
      this.props.addTodo(this.state.newTask, uuidv4());
      this.setState({ newTask: "" });
    }
  };

  handleToggleTodo = (id, e) => {
    this.props.toggleTodo(id);
  };

  handleRemoveTodo(id, e) {
    this.props.removeTodo(id);
  }

  renderTodos(list) {
    return (
      <List>
        {list.map(todo => (
          <ListItem key={todo.id}>
            <TodoItem
              todo={todo}
              toggleTodo={e => this.handleToggleTodo(todo.id, e)}
              removeTodo={e => this.handleRemoveTodo(todo.id, e)}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  render() {
    let canUpload = this.props.isSignedIn && this.props.todoList.length;
    let tooltipTitle = canUpload
      ? ""
      : "To upload todo list first sign in and add tasks";
    return (
      <Card className="todo-list-wrapper" variant="outlined">
        <CardHeader title="Todo list"></CardHeader>
        <CardContent>
          <Tooltip title={tooltipTitle}>
            <span className="todo-btn-wrapper">
              <Button
                disabled={!canUpload || this.props.isListUploading}
                onClick={this.props.uploadTodoList}
                color="primary"
                variant="contained"
              >
                Upload List to Google Drive
              </Button>
              {this.props.isListUploading && (
                <CircularProgress size={24} className="todo-button-progress" />
              )}
            </span>
          </Tooltip>
          {this.renderTodos(this.props.incompletedTodos)}
          {this.props.completedTodos.length > 0 && (
            <Typography variant="subtitle1">Completed items:</Typography>
          )}
          {this.renderTodos(this.props.completedTodos)}
          <AddTodo
            newTask={this.state.newTask}
            addTask={this.addTask}
            handleChange={this.handleChange}
          ></AddTodo>
        </CardContent>
        <UploadNotification
          uploadResult={this.props.uploadResult}
          handleResetResult={this.props.resetUploadResult}
        ></UploadNotification>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: getTodoList(state),
    isSignedIn: getIsSignedIn(state), //state.GoogleAuth.isSignedIn,
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompletedTodos(state),
    isListUploading: getIsListUploading(state),
    uploadResult: getUploadResultMessage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (text, id) => dispatch({ type: "ADD_TODO", text, id }),
    toggleTodo: id => dispatch({ type: "TOGGLE_TODO", id }),
    removeTodo: id => dispatch({ type: "REMOVE_TODO", id }),
    uploadTodoList: () => dispatch({ type: "UPLOAD_TODO_LIST" }),
    resetUploadResult: () => dispatch({ type: "RESET_UPLOAD_RESULT" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
