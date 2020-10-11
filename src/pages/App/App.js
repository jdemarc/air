import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';
import userService from '../../utils/userService';
import AuthPage from '../AuthPage';
import messageService from '../../utils/messageService';
import io from 'socket.io-client';

class App extends Component {

  state = {
    user: userService.getUser(),
    users: [],
    messages: [],
    socket: ''
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
    this.state.socket = io('http://localhost:3000/')
    //const messages = await messageService.index();

    this.state.socket.on('init', (msgs) => {
      let msgsReversed = msgs.reverse();

      this.setState({
        messages: [...this.state.messages, ...msgsReversed]
      })

      console.log(this.state.messages)
    })

    this.state.socket.on('push', (newMessage) => {
      this.setState({
        messages: [...this.state.messages, newMessage]
      })
    })

    this.setState({
      users
    })

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
                socket={this.state.socket}
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
