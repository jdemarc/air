import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';
import userService from '../../utils/userService';

class App extends Component {

  state = {
    user: userService.getUser()
  }

  handleSignup = () => {
    this.setState({
      user: userService.getUser()
    });
  };

  handleLogout = () => {
    userService.logout();

    this.setState({ user: null});
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() =>
            <Dashboard 
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
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
