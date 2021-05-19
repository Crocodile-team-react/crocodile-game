import React from 'react';
import Player from './Player';

function PlayerList() {
  const playerCount = 2, needCount = 5;
  return (
    <div className="player-list">
      <h3 className="player-list__title">Игроков {playerCount} из {needCount}</h3>
      <ul className="player-list__block">
        <Player avatar="avatar-crocodile" name="Player 1" pointCount="100"/>
        <Player avatar="avatar-goose" name="Player 2" pointCount="50"/>
        <Player avatar="avatar-cat" name="Player 3" pointCount="30"/>
        <Player avatar="avatar-monkey" name="Player 4" pointCount="20"/>
        <Player avatar="avatar-crocodile" name="Player 5" pointCount="12"/>
      </ul>
    </div>
  );
}

export default PlayerList;
