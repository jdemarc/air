import React, { useEffect, useState } from 'react';
import userService from '../../utils/userService';

const UserPanel = ( {users} ) => {
  // const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {

  //   fetchUsers();

  // }, []);

  // const fetchUsers = async () => {
  //   const registeredUsers = await userService.index();
    
  //   setAllUsers(allUsers => [...allUsers, ...registeredUsers]);
  // }

  return (
    <div>
      <ul>
        {users.map(user =>
        <div className="row" key={user._id}>
          {user.name}
        </div>
        )}
      </ul>
    </div>
  );
}

export default UserPanel