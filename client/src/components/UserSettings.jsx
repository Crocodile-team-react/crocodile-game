import React from 'react'
import { useSelector } from 'react-redux';

function UserSettings({ inputRef }) {
  const username = useSelector(state => state.user.username);
  return (
    <div>
      <div>
        <span>Choose icon here</span>
      </div>
      <input ref={inputRef} type="text" name="name" placeholder="Your name" defaultValue={username}/>
    </div>
  )
}

export default UserSettings
