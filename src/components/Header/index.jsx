import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = ( {user, handleLogout}) => {
  
  let nav = user ?
    <div className="d-flex flex-row justify-content-around align-items-center p-2">
        <span>Signed in as {user.name}
          <Link to={"/profile"}>
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg>
          </Link>
        </span>

        <Link to=''
          onClick={handleLogout}>
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-box-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
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
      <div className="container-fluid rounded-top border border-secondary" id="header">
        <h1 className="mt-2" id="title"> Parley </h1>
          {nav}
      </div>
  );
};

export default Header