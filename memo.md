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

- connect()메서드를 사용해서 mapStateToProps함수와 Home컴포넌트를 연결시킨다.
- mapStateToProps함수는 이름 그대로 State를 Props로 전달하는 함수이다.
- mapStateToProps함수는 기본적으로 2개의 파라미터를 가지는데 첫 번째는 store에 있는 현재 state값이다.
- 두 번쨰는 mapStateToProps함수와 연결된 현재 컴포넌트가 가지고 있는 prop이다. (react-router로부터 받은 prop이다.)
- 현재 여기서는 mapStateToProps함수와 Home컴포넌트가 연결되어있기 때문에 Home컴포넌트에 대한 prop를 가지게 된다.
- 또한 mapStateToProps함수가 리턴하는 값이 Home컴포넌트의 prop에 들어가게 된다. (ownProps가 아닌 Home이 가지는 props에 들어간다.)
- 위에서 connect()메서드를 사용해서 mapStateToProps함수와 Home컴포넌트를 연결했기 때문에 Home으로 보내는 props에 추가될 수 있는 것이다.

```javascript
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  console.log("state, ownProps", state, ownProps);
  return {state};
};

export default connect(mapStateToProps)(Home);
```