import React from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

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
    <div>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </div>;

  return (
    <nav className="navbar navbar-light bg-light">
      {nav}
    </nav>
  );
};

export default Header