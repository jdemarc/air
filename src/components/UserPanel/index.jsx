import React from 'react';
import './UserPanel.css'

const UserPanel = ( {users} ) => {

  return (
    <div className="d-flex flex-column w-100 text-left">
      <h5>
        <svg id="power-icon" width="1.3em" height="1.3em" viewBox="0 0 16 20" className="bi bi-power" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"/>
          <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z"/>
        </svg>
        Online
      </h5>
      <div className="d-flex">
        {console.log('users in userpanel', users)}
        {users.map(user =>
        <div className="pl-2" key={user.id}>
          {user.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPanel