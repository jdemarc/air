import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = (props) => {
  
  let nav = props.user ?
    <div className="rhs-container">
        <span>Signed in as {props.user.name} </span>
        <Link to=''
          onClick={props.handleLogout}>
          Log out
        </Link>
    </div>
    :
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to='/login'>Log in</Link>
      </li>
      <li className="nav-item pl-3">
        <Link to='/signup'>Sign up</Link>
      </li>
    </ul>;

  return (
    <nav className="navbar navbar-default navbar-expand text-light bg-dark">
      <div className="container">
        <div className="navbar-header">
          <span className="navbar-brand">PARLEY</span>
        </div>
          {nav}
      </div>
    </nav>
  );
};

export default Header