import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';

function StartPage({ onFindGameClick, onNewGameClick, onJoibByCodeClick, socketGetConnection}) {

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
        onJoibByCodeClick={onJoibByCodeClick}
      />
    </div>
  )
}

export default StartPage
