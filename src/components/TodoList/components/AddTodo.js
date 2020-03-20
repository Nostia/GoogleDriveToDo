import React from "react";
import { TextField } from "@material-ui/core";
import "../TodoList.css";

export default function(props) {
  return (
    <form onSubmit={props.addTask}>
      <TextField
        className="todo-add-input"
        value={props.newTask}
        onChange={props.handleChange}
        placeholder="Add new task"
      ></TextField>
    </form>
  );
}
