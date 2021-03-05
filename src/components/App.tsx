import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';

const App = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path='/landingPage'>
          <ul className='landingPage'>
            <li id='login' onClick={() => {
              setOpenLogin(!openLogin);
              setOpenSignup(false);
            }} className='route'>Login</li>
            <Collapse in={openLogin}>
              <div>
                <Login />
              </div>
            </Collapse>
            <li id='signup' onClick={() => {
              setOpenSignup(!openSignup);
              setOpenLogin(false);
            }} className='route'>Sign up</li>
            <Collapse in={openSignup}>
              <div>
                <Signup />
              </div>
            </Collapse>
          </ul>
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;