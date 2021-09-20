import React from 'react';
import { Route, Switch } from "react-router-dom";

import Landing from './components/Landing';
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import JoinRoom from './components/JoinRoom';
import LogIn from './components/LogIn';
import ErrorPage from './components/ErrorPage';
import Game from './components/game';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/login'>
          <Welcome />
        </Route>
        <Route exact path='/log-in'>
          <LogIn />
        </Route>
        <Route exact path='/profile/:user'>
          <NavBar />
          <Profile />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route exact path='/rooms'>
          <JoinRoom />
        </Route>
        <Route exact path='/game'>
          <Game/>
        </Route>
        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default App;
