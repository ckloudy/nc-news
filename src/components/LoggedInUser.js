import React from 'react';

const LoggedInUser = () => {
  return (
    <div>
      <div className="user_img__indicator">
        <div className="user_img" />
        <div className="online_indicator" />
        <p>Username, here's what's happening...</p>
      </div>
    </div>
  );
};

export default LoggedInUser;
