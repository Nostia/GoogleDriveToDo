import React from "react";
import { Checkbox, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
      <Button onClick={props.removeTodo} className="todo-btn-remove">
        x
      </Button>
    </div>
  );
}
