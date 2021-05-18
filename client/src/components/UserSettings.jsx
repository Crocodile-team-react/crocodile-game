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
    <div>
      <div>
        <span>Choose icon here</span>
      </div>
      <input onBlur={changeName} ref={inputRef}
        type="text" name="name" placeholder="Your name" defaultValue={username} />
    </div>
  )
}

export default UserSettings
