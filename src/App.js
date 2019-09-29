import React, { useState } from 'react';
import './App.css';
import Login from './containers/Login/Login'
import Service from './components/Service/Service'

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function App() {
  const [loginState, setLoginState] = useState(0);

  const createLogout = () =>
    <button id='logout-button' onClick={() => setLoginState(0)}>Logout</button>
  
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/login' exact render={() => !loginState ? <Login onSuccess={() => setLoginState(1)} /> : <div className='wrapper'>{createLogout()}<Service/></div> } /> 
        <Redirect exact from='/' to='/login' />
      </div>
    </BrowserRouter>
  );
}

export default App;
