import React from 'react'
import PlayerList from './PlayerList';
import GameChat from './GameChat';


function PlayerArea({onPlayerKick}) {
  return (
    <div>
      Player Area
      <PlayerList onPlayerKick={onPlayerKick}></PlayerList>
      <GameChat></GameChat>
    </div>
  )
}

export default PlayerArea
