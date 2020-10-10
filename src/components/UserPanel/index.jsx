import React from 'react';

const UserPanel = (props) => {
  console.log(props)
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