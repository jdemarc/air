import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    //
  }

  handleSubmit = (e) => {
    e.preventDefault();
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