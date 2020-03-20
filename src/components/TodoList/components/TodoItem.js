import React from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";

export default function todoItem(props) {
  return (
    <div className="todo-item-wrapper">
      <FormControlLabel
        control={
          <Checkbox
            checked={props.todo.completed}
            onChange={props.toggleTodo}
          ></Checkbox>
        }
        label={props.todo.text}
      />
      <IconButton
        aria-label="delete"
        onClick={props.removeTodo}
        className="todo-btn-remove"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
