import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  
  let nav = props.user ?
    <div>
      <Link to=''
        onClick={props.handleLogout}>
          Log out
      </Link>
      <span>Signed in as {props.user.name} </span>
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
          <span className="navbar-brand">AIR</span>
        </div>
          {nav}
      </div>
    </nav>
  );
};

export default Header