import React from 'react';

const UserPanel = (props) => {
  return (
    <div>
      <ul>
        {props.users.map(user =>
        <div key={user.email}>
          {user.name}
        </div>
        )}
      </ul>
    </div>
  );
}

export default UserPanel