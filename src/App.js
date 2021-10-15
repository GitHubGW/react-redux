import { HashRouter, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

const App = () => {
  return (
    <HashRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/:id" component={Detail}></Route>
    </HashRouter>
  );
};

export default App;
