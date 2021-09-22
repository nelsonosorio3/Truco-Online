import React from 'react';
import { Route, Switch } from "react-router-dom";

import Landing from './components/Landing';
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Rooms from './components/rooms/Rooms';
import LogIn from './components/LogIn';
import ErrorPage from './components/ErrorPage';
import Game from './components/game';
import Ranking from './components/Ranking';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/welcome'>
          <Welcome />
        </Route>
        <Route exact path='/log-in'>
          <LogIn />
        </Route>
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        {/* <Route exact path='/profile/:id'>
          <NavBar />
          <Profile />
        </Route> */}
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route exact path='/rooms'>
          <Rooms />
        </Route>
        <Route exact path='/game'>
          <Game/>
        </Route>
        <Route exact path='/ranking'>
          <NavBar />
          <Ranking/>
        </Route>
        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default App;
