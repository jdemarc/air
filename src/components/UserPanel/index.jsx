import React from 'react';

const UserPanel = (props) => {
  return (
    <div>
      <ul>
        {props.users.map(user =>
        <div className="row" key={user.id}>
          {user.name}
        </div>
        )}
      </ul>
    </div>
  );
}

export default UserPanel