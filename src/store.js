import { createStore } from "redux";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
const localStorageTodo = JSON.parse(localStorage.getItem("todo"));
const currentState = localStorageTodo ? localStorageTodo : [];

const reducer = (state = currentState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObject = { id: action.id, text: action.text };
      const addTodoResult = [newTodoObject, ...state];
      localStorage.setItem("todo", JSON.stringify(addTodoResult));
      return addTodoResult;
    case DELETE_TODO:
      const deleteTodoResult = state.filter((state) => state.id !== action.id);
      localStorage.setItem("todo", JSON.stringify(deleteTodoResult));
      return deleteTodoResult;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
