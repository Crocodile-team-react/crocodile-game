import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';

function StartPage({ onFindGameClick, onNewGameClick }) {
  const inputRef = React.useRef();
  const handleQuickGameClick = () => {
    onFindGameClick(inputRef.current.value)
  }
  return (
    <div>
      <Logo />
      <UserSettings inputRef={inputRef}/>
      <UserControls onNewGameClick={onNewGameClick} onQuickGameClick={handleQuickGameClick}/>
    </div>
  )
}

export default StartPage
