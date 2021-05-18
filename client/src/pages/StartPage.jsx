import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';

function StartPage({ onFindGameClick, onNewGameClick, onJoibByCodeClick}) {

  const handleQuickGameClick = () => {
    onFindGameClick()
  }
  
  return (
    <div>
      <Logo />
      <UserSettings />
      <UserControls
        onNewGameClick={onNewGameClick}
        onQuickGameClick={handleQuickGameClick}
        onJoibByCodeClick={onJoibByCodeClick}
      />
    </div>
  )
}

export default StartPage
