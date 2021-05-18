import React from 'react'

function UserControls({ onQuickGameClick, onNewGameClick, onJoibByCodeClick }) {
  const inputRef = React.useRef();

  const onJoinByCode = () => {
    let code = inputRef.current.value.match(/^\w+$/g)
    if (code === null) {
      console.error("incorrect code value"); // need handle
    } else {
      onJoibByCodeClick(code);
    }
  }
  return (
    <div>
      <button onClick={onQuickGameClick}>Quick game</button>
      <span>OR</span>
      <button onClick={onNewGameClick}>New room</button>
      <span>OR</span>
      <input ref={inputRef} type="text" placeholder="join by link" />
      <button onClick={onJoinByCode}>OK</button>
    </div>
  )
}

export default UserControls
