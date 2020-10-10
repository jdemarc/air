import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';
import userService from '../../utils/userService';
import AuthPage from '../AuthPage';

class App extends Component {

  state = {
    user: userService.getUser(),
    users: [],
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null});
  }

  async componentDidMount() {
    const users = await userService.index();
    this.setState({ users })
  }
  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() =>
            <AuthPage />
          }/>

          <Route exact path='/dashboard' render={() =>
            userService.getUser() ? 
              <Dashboard
                user={this.state.user}
                users={this.state.users}
                handleLogout={this.handleLogout}
              />
              :
              <Redirect to='/' />
          }/>

          <Route exact path="/signup" render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
  
          <Route exact path="/login" render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
  
      </div>
    );
  }
}

export default App;
