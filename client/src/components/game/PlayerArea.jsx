import React from 'react'
import PlayerList from './PlayerList';
import GameChat from './GameChat';


function PlayerArea() {
  return (
    <div className="text-small container-play-list">
      <PlayerList></PlayerList>
      <GameChat></GameChat>
    </div>
  )
}

export default PlayerArea
