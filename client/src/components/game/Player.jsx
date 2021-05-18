import React from 'react'
import { useSelector } from 'react-redux'

function Player({ username, userID, onPlayerKick }) {
  const hostID = useSelector(state => state.game.roomHostID);
  const curUserID = useSelector(state => state.user.userID);
  let removeButton = "";
  if (curUserID === hostID && curUserID !== userID) {
    removeButton = <button onClick={() => onPlayerKick(userID)}>Kick</button>;
  }
  return (
    <li>
      <span>
        {username}
        {hostID === userID ? " - Host" : ""}
        {curUserID === userID ? "(You)" : ""}
      </span>
      {
        removeButton
      }
    </li>
  )
}

export default Player
