import React from 'react';
import { Route, Switch } from "react-router-dom";

import Landing from './components/Landing';
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Rooms from './components/rooms/Rooms';
import LogIn from './components/LogIn';
import ErrorPage from './components/ErrorPage';
import Game from './components/game';
import Ranking from './components/Ranking';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/log-in' component={LogIn} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/rooms' component={Rooms} />
        <Route exact path='/game' component={Game} />
        <PrivateRoute exact path="/ranking" component={Ranking} />
        <Route path='/adminpanel' component={AdminPanel} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default App;
