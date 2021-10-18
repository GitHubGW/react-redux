## React & Redux

- https://react-redux.js.org/introduction/getting-started

#### Provider

- React Redux는 Provider컴포넌트를 가지고 있고, 이 컴포넌트를 이용해서 Redux store를 사용할 수 있다.
- Provider컴포넌트를 사용하기 위해 App컴포넌트를 Provider컴포넌트로 감싸준다.
- Provider컴포넌트는 store프로퍼티를 가지고 이 프로퍼티에 우리가 생성한 store를 받게된다.

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### mapStateToProps

- https://react-redux.js.org/using-react-redux/connect-mapstate
- connect()메서드를 사용해서 mapStateToProps함수와 Home컴포넌트를 연결시킨다.
- mapStateToProps함수는 이름 그대로 State를 Props로 전달하는 함수이다.
- mapStateToProps함수는 기본적으로 2개의 파라미터를 가지는데 첫 번째는 store에 있는 현재 state값이다.
- 두 번쨰는 mapStateToProps함수와 연결된 현재 컴포넌트가 가지고 있는 prop이다. (react-router로부터 받은 prop이다.)
- 현재 여기서는 mapStateToProps함수와 Home컴포넌트가 연결되어있기 때문에 Home컴포넌트에 대한 prop를 가지게 된다.
- 또한 mapStateToProps함수가 리턴하는 값이 Home컴포넌트의 prop에 들어가게 된다. (ownProps가 아닌 Home이 가지는 props에 들어간다.)
- 아래에서 connect()메서드를 사용해서 mapStateToProps함수와 Home컴포넌트를 연결했기 때문에 Home으로 보내는 props에 state를 추가할 수 있는 것이다.

```javascript
import { connect } from "react-redux";

const Home = ({state}) => {
  console.log("state", state);

  return (
    <>
      <h1>📋 ToDo List</h1>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("state, ownProps", state, ownProps);
  return {state};
};

export default connect(mapStateToProps)(Home);
```

#### mapDispatchToProps

- https://react-redux.js.org/using-react-redux/connect-mapdispatch
- mapDispatchToProps함수는 connect()메서드의 두 번째 파라미터로, dispatch함수를 파라미터로 가지는 함수이다.
- dispatch함수를 파라미터로 받아서, 리턴해주게 되면 dispatch함수를 Home컴포넌트의 prop에서 꺼내서 사용할 수 있다.
- 만약 mapStateToProps만 필요하고 mapDispatchToProps함수는 필요하지 않다면 connect(null, mapDispatchToProps)로 쓰면 된다.

```javascript
import { connect } from "react-redux";

const Home = ({state, dispatch}) => {
  console.log("state", state);
  console.log("dispatch", dispatch);

  return (
    <>
      <h1>📋 ToDo List</h1>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("state, ownProps", state, ownProps);
  return {state};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("dispatch, ownProps", dispatch, ownProps);
  return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

#### Function mapStateToProps

- mapStateToProps함수는 현재 state값과 현재 컴포넌트의 props(history, location, match)값을 파라미터로 받는다.
- 그리고 mapStateToProps함수가 받은 state값을 리턴하게 되면 mapStateToProps함수가 속해 있는 컴포넌트의 props안에 전달된다.

```javascript
const mapStateToProps = (state, ownProps) => {
  console.log("state, ownProps", state, ownProps);
  return {state};
};

export default connect(mapStateToProps, null)(Home);
```

#### Function mapDispatchToProps

- mapDispatchToProps함수는 dispatch함수와 현재 컴포넌트의 props(history, location, match)값을 파라미터로 받는다.
- 그리고 mapDispatchToProps함수가 받은 dispatch함수를 리턴하게 되면 mapDispatchToProps함수가 속해 있는 컴포넌트의 props안에 전달된다.

```javascript
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("dispatch, ownProps", dispatch, ownProps);
  return {dispatch};
};

export default connect(null, mapDispatchToProps)(Home);
```

#### Local Storage를 이용해서 state값 저장

- `localStorage.setItem("todo", JSON.stringify(addTodoResult))`: 로컬 스토리지를 이용해서 새로고침시에도 state값을 초기화하지 않고 저장한다.
- 로컬 스토리지에 저장할 때는 JSON.stringify()를 이용해서 배열을 문자화해서 저장한다.
- `JSON.parse(localStorage.getItem("todo"))`: 로컬 스토리지에서 저장되어있는 todo를 가져온다.
- 위에서 로컬 스토리지에 저장할 때 배열을 문자화해서 저장했기 때문에 가져올 때는 JSON.parse()를 이용해서 파싱해서 가져온다.

```javascript
// store.js
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
```

#### Dispatch함수를 이용해서 todo 삭제

- mapDispatchToProps함수를 이용해서 dispatch를 가져와서 return해서 Detail컴포넌트의 prop로 받는다.
- Detail컴포넌트는 prop으로 state, dispatch, history를 가져와서 handleDeleteToDo함수의 인자로 넘겨준다.
- handleDeleteToDo함수는 받은 state와 dispatch함수를 이용해서 todo를 삭제하고, history.push("/")를 이용해서 삭제 후 홈으로 보낸다.

```javascript
// Detail.js
import { connect } from "react-redux";
import { DELETE_TODO } from "../store";

const Detail = ({ state, dispatch, history }) => {
  const handleDeleteToDo = (state, dispatch, history) => {
    dispatch({ type: DELETE_TODO, id: state.id });
    return history.push("/");
  };

  return (
    <>
      <h1>🚗 {state?.text}</h1>
      <h3>⏰ {state?.id}</h3>
      <button onClick={() => handleDeleteToDo(state, dispatch, history)}>Delete</button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { state: state?.find((state) => state.id === +id) };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
```

#### Spread Operator

- ({ state, dispatch, ...props })을 하게 되면 Home컴포넌트가 가지는 props들 중에서 state와 dispatch를 바로 뽑아온다는 의미이다.
- 마지막에 ...props를 하게 되면 뽑아온 state와 dispatch를 제외한 나머지 prop들을 객체로 가져올 수 있다.

```javascript
const Home = ({ state, dispatch, ...props }) => {}
```