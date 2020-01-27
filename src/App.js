import React from 'react';
import logo from './logo.svg';
import './App.css';

import UserList from './pages/UserList.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import Request from './pages/Request.jsx';

import UnknownRoute from "./pages/UnknownRoute.jsx";

import "./utilities/pushalert_setup"; // our piece-de-resistance...

import { Route, Switch } from 'react-router-dom';


// are we going to make Home the login page???????
// NO, general information is on the Home page and the option to login (if one is not yet logged in)
// guess we can do that with a Navbar that we put on every page
function App(){
  return(<div className="App">
      {/* a bit of a gamble to see if this works */}
      <Switch>
        {/* modern style notation */}
        <Route exact path="/"><Home/></Route>
        <Route exact path='/help' component={Help}/>
        {window.localStorage.user
          ? <>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/request" component={Request}/>
            </>
          :
            <Route exact path="/login" component={Login}/>
        }
        {/* fallthrough route */}
        <Route path="/"><UnknownRoute/></Route>
      </Switch>
    </div>);
}

export default App;
