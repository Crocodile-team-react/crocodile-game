import React from 'react'
import PlayerList from './PlayerList';
import GameChat from './GameChat';
import { useSelector } from 'react-redux';

function PlayerArea({ onPlayerKick }) {
  const hostID = useSelector(state => state.game.roomHostID);
  const userID = useSelector(state => state.user.userID);
  let startGameBlock = "";
  if (hostID === userID) {
    startGameBlock = <div className="start-game-block">
      <div className="start-game-block__private">
        <input id="in" type="checkbox" className="checkbox" />
        <label htmlFor="in">
          Сделать комнату приватной
        </label>
      </div>
      <div className="start-game-block__buttons">
        <button className="button-medium-unfilled" onClick={f => f}>Пригласить</button>
        <button className="button-medium-filled" onClick={f => f}>Начать</button>
      </div>
    </div>
  } else {
    startGameBlock = <div className="start-game-block">
        <p className="text">Ждем когда ведущий запустит игру...</p>
      </div>
  }
  return (
    <div className="player-area-block">
      <PlayerList onPlayerKick={onPlayerKick}/>
      {/*<GameChat/>*/}
      {/*Host or Player view*/}
      {startGameBlock}
    </div>
  )
}

export default PlayerArea
