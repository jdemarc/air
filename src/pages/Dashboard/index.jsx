import React from 'react';
import Header from '../../components/Header';

const Dashboard = (props) => {
  return (
    <div>
      <Header
        user={props.user}
        handleLogout={props.handleLogout}
      />
    
        Living in the dash.
    </div>
  )
};

export default Dashboard;