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
  Typography,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./TodoList.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTask: "",
      showNotification: false
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

  notification() {
    if (!this.props.uploadResult) return "";
    let type = this.props.uploadResult === "success" ? "success" : "error";
    let text =
      this.props.uploadResult && this.props.uploadResult != "success"
        ? `Todo list upload failed. Reason: ${this.props.uploadResult.message}`
        : "Todo list was uploaded successfully";
    return (
      <div>
        <Snackbar
          open={!!this.props.uploadResult}
          autoHideDuration={3000}
          onClose={() => this.props.resetUploadResult()}
        >
          <Alert severity={type} onClose={() => this.props.resetUploadResult()}>
            {text}
          </Alert>
        </Snackbar>
      </div>
    );
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
        {this.notification()}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList.list,
    isSignedIn: state.GoogleAuth.isSignedIn,
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompletedTodos(state),
    isListUploading: state.todoList.isListUploading,
    uploadResult: state.todoList.uploadResult
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
