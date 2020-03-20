const initState = { list: [], isListUploading: false, uploadResult: null };

const todoList = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        list: state.list.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case "REMOVE_TODO":
      return {
        ...state,
        list: state.list.filter(todo => todo.id !== action.id)
      };
    case "UPLOAD_TODO_LIST":
      return {
        ...state,
        isListUploading: true
      };
    case "UPLOAD_TODO_LIST_SUCCESS":
      return {
        ...state,
        isListUploading: false,
        uploadResult: "success"
      };
    case "UPLOAD_TODO_LIST_FAIL":
      return {
        ...state,
        isListUploading: false,
        uploadResult: action.error
      };
    case "RESET_UPLOAD_RESULT":
      return {
        ...state,
        uploadResult: null
      };
    default:
      return state;
  }
};

export default todoList;
export const getCompletedTodos = state => {
  return state.todoList.list.filter(t => t.completed);
};
export const getIncompletedTodos = state => {
  return state.todoList.list.filter(t => !t.completed);
};
export const getIsListUploading = state => {
  return state.todoList.isListUploading;
};
export const getUploadResultMessage = state => {
  if (!state.todoList.uploadResult) return state.todoList.uploadResult;
  return state.todoList.uploadResult === "success"
    ? { type: "success", message: "Todo list was uploaded successfully" }
    : {
        type: "error",
        message: `Todo list upload failed. Reason: ${state.todoList.uploadResult.message}`
      };
};
export const getTodoList = state => {
  return state.todoList.list;
};
