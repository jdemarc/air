import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import userService from '../../utils/userService';

class SignupForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  handleChange = (e) => {
    this.props.updateMessage('');

    //Using computed property name syntax
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userService.signup(this.state);

      // Try to login.
      this.props.handleSignupOrLogin();

      // Successful sign-in 'redirects' to dashboard.
      this.props.history.push('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'This e-mail has been taken.'
      })
    }
  }
  
  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConfirm);
  }

  render() {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{width: '30rem'}}>
          <h1 className="card-header text-center" id="title">Sign up</h1>
        <div className="card-body">
          <form className="text-center"
          onSubmit={this.handleSubmit}>
            <input className="form-control mb-4"
              type="text"
              placeholder="Name"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />

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

            <input className="form-control mb-4"
              type="password"
              placeholder="Confirm Password"
              value={this.state.passwordConfirm}
              name="passwordConfirm"
              onChange={this.handleChange}
            />

            <button className="btn btn-info btn-block mb-4" disabled={this.isFormInvalid()}>Sign Up</button>
            <Link to='/'>Cancel</Link>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default SignupForm