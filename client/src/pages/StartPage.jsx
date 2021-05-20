import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';

function StartPage({ onFindGameClick, onNewGameClick, onJoinByCodeClick, socketGetConnection}) {

  const handleQuickGameClick = () => {
    onFindGameClick()
  }
  React.useEffect(() => {
    socketGetConnection(true, 2000)
      .catch(msg => {
      if (msg instanceof Error) {
        console.error(msg.message); // handle reject connection
      } else {
        console.warn(msg);
      }
    });
  }, [])
  return (
    <div className="start-page-block">
      <Logo>
        <span className="logo-big"></span>
      </Logo>
      <UserSettings />
      <UserControls
        onNewGameClick={onNewGameClick}
        onQuickGameClick={handleQuickGameClick}
        onJoinByCodeClick={onJoinByCodeClick}
      />
    </div>
  )
}

export default StartPage
