const todoList = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      let newState = [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
      localStorage.setItem("todoList", JSON.stringify(newState));
      return newState;
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "GET_TODO_LIST":
      try {
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        return todoList;
      } catch (e) {
        return state;
      }

    default:
      return state;
  }
};

export default todoList;
