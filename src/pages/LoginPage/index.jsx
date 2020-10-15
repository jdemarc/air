import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import Swal from 'sweetalert2';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: '',
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
      Swal.fire({
        icon: 'error',
        title: 'Your e-mail or password is incorrect.'
      })
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{width: '30rem'}}>
          <h1 className="card-header text-center" id="title">Login</h1>
          <div className="card-body">
            <form className="text-center"
            onSubmit={this.handleSubmit}>
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
        </div>
      </div>
    );
  }
}

export default LoginPage;