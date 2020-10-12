import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './LoginPage.css';

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
      <div className="wrapper">
        <form className="text-center border border-light p-5"
        onSubmit={this.handleSubmit}>

          <p className="h4 mb-4">Login</p>
          <input className="form-control mb-4"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />

          <input className="form-control mb-4"
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />

          <button className="btn btn-info btn-block mb-4">Log In</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default LoginPage;