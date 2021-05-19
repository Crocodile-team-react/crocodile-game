import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '../store/actions/userActions';

function UserSettings() {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const username = useSelector(state => state.user.username);
  const changeName = () => {
    if (username !== inputRef.current.value) {
      dispatch(setUsername(inputRef.current.value.trim()))
    }
  }
  return (
    <div className="settings-block"> 
      <div className="settings-block__avatar">
        <button className="arrow-left"></button>
        <span className="avatar-big avatar-goose"></span>
        <button className="arrow-right"></button>
      </div>
      <div className="settings-block__name">
        <input
          onBlur={changeName} ref={inputRef}
          type="text" className="input"
          placeholder="Ваше имя"
          defaultValue={username}
        />
      </div>
    </div>
  )
}

export default UserSettings
