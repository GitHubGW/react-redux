import { createStore } from "redux";

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = ["Hello"], action) => {
  console.log("state, action", state, action);

  switch (action.type) {
    case ADD_TODO:
      const newTodoObject = { id: action.id, text: action.text };
      const addTodoResult = [newTodoObject, ...state];
      return addTodoResult;
    case DELETE_TODO:
      const deleteTodoResult = state.filter((state) => state.id !== action.id);
      return deleteTodoResult;
    default:
      return state;
  }
};

export const handleAddTodo = (text) => {
  return { type: ADD_TODO, id: Date.now(), text };
};

export const handleDeleteTodo = (id) => {
  return { type: DELETE_TODO, id };
};

const store = createStore(reducer);

export default store;
