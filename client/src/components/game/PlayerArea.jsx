import React from 'react'
import PlayerList from './PlayerList';
import GameChat from './GameChat';


function PlayerArea() {
  return (
    <div>
      Player Area
      <PlayerList></PlayerList>
      <GameChat></GameChat>
    </div>
  )
}

export default PlayerArea
