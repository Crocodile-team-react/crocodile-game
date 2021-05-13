import React from 'react'

function UserControls({ onQuickGameClick, onNewGameClick }) {
  return (
    <div>
      <button onClick={onQuickGameClick}>Quick game</button>
      <span>OR</span>
      <button onClick={onNewGameClick}>New room</button>
      <span>OR</span>
      <input type="text" placeholder="join by link" />
      <button>OK</button>
    </div>
  )
}

export default UserControls
