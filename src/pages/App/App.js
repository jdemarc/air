import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';
import userService from '../../utils/userService';
import AuthPage from '../AuthPage';
import io from 'socket.io-client';
import messageService from '../../utils/messageService';

class App extends Component {

  state = {
    user: userService.getUser(),
    users: [],
    messages: [],
  }

  handleAddMessage = async (newMsg) => {
    const newMessage = await messageService.create(newMsg);
  
    this.setState({
      messages: [...this.state.messages, newMessage]
    })
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
    const messages = await messageService.index();
    const reversedMessages = messages.reverse();

    this.setState({ users, messages: reversedMessages })
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
                messages={this.state.messages}
                handleLogout={this.handleLogout}
                handleAddMessage={this.handleAddMessage}
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
