import React from 'react';
import Header from '../../components/Header';
import ChannelPanel from '../../components/ChannelPanel'
import './Dashboard.css';

const Dashboard = (props) => {
  return (
    <div>
      <div>
        <Header
          user={props.user}
          handleLogout={props.handleLogout}
        />
      </div>

      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col bg-primary">
              <ChannelPanel />
            </div>
            <div className="col-8 bg-warning">
              <p> General or about </p>
            </div>
            <div className="col bg-secondary">
              <p> AU Panel </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Dashboard;