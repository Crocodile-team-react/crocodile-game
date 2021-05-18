import React from 'react'
import Player from './Player';
import { useSelector } from 'react-redux';

function PlayerList({onPlayerKick}) {
  const users = useSelector(store => store.game.users);
  return (
    <div>
      <ul>
        {
          users &&
          users.map(user => {
            return <Player onPlayerKick={onPlayerKick} key={user.userID} {...user}/>
          })
        }
      </ul>
      
    </div>
  )
}

export default PlayerList
