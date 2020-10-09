import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() =>
            <Dashboard />
          }/>

          <Route exact path="/signup" render={({ history }) => 
            <SignupPage history={history}/>
          }/>
  
          <Route exact path="/login" render={() => 
            <LoginPage />
          }/>
        </Switch>
  
      </div>
    );
  }
}

export default App;
