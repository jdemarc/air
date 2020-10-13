import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = (props) => {
  
  let nav = props.user ?
    <div className="navbar-nav flex-row">
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
      <div className="container">
        <div className=""> PARLEY </div>
          {nav}
      </div>
  );
};

export default Header