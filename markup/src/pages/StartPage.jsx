import React from 'react';
import { Logo, UserSettings, UserControls } from '../components';

function StartPage() {
  return (
    <div className="start-page-block">
      <Logo>
        <span className="logo-big"></span>
      </Logo>
      <UserSettings />
      <UserControls />
    </div>
  );
}

export default StartPage;
