import React, { useState } from 'react';
import Swal from 'sweetalert2'
import ProfileEditForm from '../../components/ProfileEditForm';
import Profile from '../../components/Profile';
import './ProfilePage.css'
import userService from '../../utils/userService';
 

const ProfilePage = ( { user, handleSignupOrLogin } ) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const validateUser = async (credentials) => {
    // Check if the user is in the database.
      const response = await userService.verify(credentials);
      if (response.status === 200) {
        setStatus('OK');

      } else {
        setStatus(null)
        Swal.fire(
          'Wrong.',
          'Try again.',
          'error'
        )
      }
  }

  const handleSwalClick = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Enter your password!',
      html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Sign in',
      showCancelButton: true,
      cancelButtonText: 'Nevermind',
      focusConfirm: false,

      preConfirm: () => {
        const password = Swal.getPopup().querySelector('#password').value
        if (!password) {
          Swal.showValidationMessage(`Please enter your password`)
        }
        return( {password} )
      }

    }).then((result) => {
      if (result.value) {
        setPassword(result.value.password);

        const credentials = {
          id: user._id,
          email,
          password: result.value.password
        }
  
        validateUser(credentials);

      } else {
        Swal.close();
      }
    })
  }

  const handleStatus = () => {
    setStatus(null);
  }

  let page = !status
    ? <Profile
        user={user}
        handleSwalClick={handleSwalClick}
      />
    :
      <ProfileEditForm
        user={user}
        handleStatus={handleStatus}
        handleSignupOrLogin={handleSignupOrLogin}
      />

return (
  <div>
    { page }
  </div>  
  );
}
    
export default ProfilePage