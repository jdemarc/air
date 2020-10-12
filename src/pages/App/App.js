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

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null});
  }

  async componentDidMount() {
    const users = await userService.index();
    const socket = io('http://localhost:3000/')

      this.setState({
        users,
        socket
      })

      this.state.socket.on('init', (msgs) => {
        let msgsReversed = msgs.reverse();
  
        this.setState((state) => ({
          messages: [...state.messages, ...msgsReversed]
        }));
  
        this.state.socket.on('push', (newMessage) => {
          this.setState((state) => ({
            messages: [...state.messages, newMessage]
          }), this.scrollToBottom);
        })
    })
  }

  handleAddMessage = async (newMsg) => {
    const newMessage = await messageService.create(newMsg);

    this.state.socket.emit("message", newMessage);

    this.setState({
      messages: [...this.state.messages, newMessage]
    }, this.scrollToBottom);
  }

  scrollToBottom = () => {
    const chat = document.getElementById('chatbox');
    chat.scrollTop = chat.scrollHeight;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.messages !== this.state.messages) {
  //     console.log('update...')
  //   }
  // }
  
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
