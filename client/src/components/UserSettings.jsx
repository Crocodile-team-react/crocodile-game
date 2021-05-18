import React from 'react';

function UserSettings() {
  return (
  <div className="settings-block"> 
    <div className="settings-block__avatar">
      <button className="arrow-left"></button>
      <span className="avatar-big avatar-goose"></span>
      <button className="arrow-right"></button>
    </div>
    <div className="settings-block__name">
      <input type="text" className="input" placeholder="Ваше имя"/>
    </div>
  </div>
  );
}

export default UserSettings;
