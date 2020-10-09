import React from 'react'
import { Link } from 'react-router-dom'
import './AuthPage.css'

const AuthPage = () => {
  return (
    <div className="landing">
        <h1 className="display-4"> AIR </h1>

        <div className="custom-flex">
          <div className="card">
            <div className="card-header">
              Sign Up
            </div>
            <div className="card-body">
              <Link to='/signup'>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              Login
            </div>
            <div className="card-body">
              <Link to='/login'>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                </svg>
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default AuthPage;