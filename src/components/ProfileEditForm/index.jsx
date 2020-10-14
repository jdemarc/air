import React from 'react';
import { Link } from 'react-router-dom';

const ProfileEditForm = ( {user} ) => {

  return (
    <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{width: '30rem'}}>
          <h1 className="card-header text-center" id="title">Manage Profile</h1>
          <div className="card-body d-flex text-center">
            <div className="col-3">
              <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-person m-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>

              <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-envelope m-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>

              <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-key m-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>

            </div>
            <div className="d-flex flex-column">
            <div className="col">
                <input className="mt-4 mb-4"
                  placeholder="Display name"
                />

                <input className="mt-3 mb-3"
                  placeholder="Email"
                />

                <input className="mt-3"
                  placeholder="New password"
                />

                <input className=""
                  placeholder="Confirm password"
                />
            </div>
          </div>

            </div>
              <div className="d-flex justify-content-around align-items-center m-3">
                <button className="btn btn-primary">Submit</button>
                
                <Link to='/profile'>
                  <button className="btn btn-primary">Back</button>
                </Link>

              </div>
    </div>
</div>
          
  );
}

export default ProfileEditForm;