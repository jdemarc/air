import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userService.login(this.state);

      this.props.handleSignupOrLogin();

      this.props.history.push('/dashboard');
    } catch (error) {
      // Do not alert.
      // Show a modal or UI instead.
      alert('Invalid credentials.');
    }
  }

  render() {
    return (
      <div>
        <div>Log In</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />

          <hr />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />

          <button>Log In</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default LoginPage;