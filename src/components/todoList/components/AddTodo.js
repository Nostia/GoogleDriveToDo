import React from "react";
import { TextField, Button } from "@material-ui/core";

export default function(props) {
  return (
    <form onSubmit={props.addTask}>
      <TextField
        value={props.newTask}
        onChange={props.handleChange}
        placeholder="Add new task"
      ></TextField>
    </form>
  );
}
