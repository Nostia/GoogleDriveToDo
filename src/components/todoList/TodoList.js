import React from "react";

import { connect } from "react-redux";

import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

import {
  Button,
  Card,
  List,
  ListItem,
  CardHeader,
  CardContent,
  CardActions
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

  componentDidMount() {
    this.props.getTodoList();
  }

  handleChange(e) {
    this.setState({ newTask: e.target.value });
  }

  addTask(e) {
    e.preventDefault();
    this.props.addTodo(this.state.newTask, new Date().getUTCMilliseconds());
    this.setState({ newTask: "" });
  }

  handleToggleTodo(id, e) {
    this.props.toggleTodo(id);
  }

  handleRemoveTodo(id, e) {
    this.props.removeTodo(id);
  }

  render() {
    return (
      <Card className="todo-list-wrapper">
        <CardHeader title="Todo list">
          <div></div>
        </CardHeader>
        <CardContent>
          <List>
            {this.props.todoList.map(todo => (
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
          <CardActions>
            {this.props.isSignedIn && (
              <Button
                onClick={this.props.uploadTodoList}
                color="primary"
                variant="contained"
              >
                Add List to Google Drive
              </Button>
            )}

            {/* <GoogleAuth></GoogleAuth> */}
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    isSignedIn: state.GoogleAuth.isSignedIn
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
