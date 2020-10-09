import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/">AIR</Link>
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  )
}

export default Header