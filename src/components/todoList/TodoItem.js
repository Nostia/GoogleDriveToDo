import React from "react";

export default function todoItem(props) {
  return (
    <div>
      {props.todo.text}
    </div>
  );
}
