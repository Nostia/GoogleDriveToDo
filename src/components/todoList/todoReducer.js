const todoList = (state = [], action) => {
  let newState = state;
  switch (action.type) {
    case "ADD_TODO":
      newState = [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
      // syncTodods(newState);
      return newState;
    case "TOGGLE_TODO":
      newState = state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      // syncTodods(newState);
      return newState;
    case "REMOVE_TODO":
      newState = state.filter(todo => todo.id !== action.id);
      // syncTodods(newState);
      return newState;
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
export const getTodoList = state => state;
export const getCompletedTodos = state => {
  return state.todoList.filter(t => t.completed);
};
export const getIncompletedTodos = state =>
state.todoList.filter(t => !t.completed);
