import React from 'react'
import { Link } from 'react-router-dom'
import './AuthPage.css'

const AuthPage = () => {
  return (
    <div className="primary-container">
      <div className="card" style={{width: '30rem'}}>
        <h1 className="card-header text-center" id="title"> Parley </h1>
          <div className="row">
            <div className="col-6 text-center border-right p-3">
                <h5 className="card-title">
                  Sign up
                </h5>
                <Link to='/signup'>
                  <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-arrow-bar-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </Link>
              </div>
            <div className="col-6 text-center p-3">
                <h5 className="card-title">
                  Login
                </h5>
                  <Link to='/login'>
                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                    </svg>
                  </Link>
            </div>
          </div>
        </div>
        <h3 className="font-italic mt-3">Make your point!</h3>
      </div>
  )
}

export default AuthPage;