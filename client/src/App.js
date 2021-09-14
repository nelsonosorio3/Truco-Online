import Welcome from "./components/Welcome";
import {Route, Switch} from "react-router-dom";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Welcome />
        </Route>
        <Route exact path='/profile'>
          <NavBar />
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
