import React from 'react'
import PlayerList from './PlayerList';
import { useSelector } from 'react-redux';
import GameChat from './GameChat';


function PlayerArea({onPlayerKick}) {
    const isAdmin = useSelector(state => state.user.isAdmin);
  return (
    <div className="player-area-block">
      <PlayerList onPlayerKick={onPlayerKick}/>
      {/*<GameChat/>*/}
      {/* Host */}
     {isAdmin && (<div className="start-game-block">
        <div className="start-game-block__private">
          <input id="in" type="checkbox" className="checkbox"/>
          <label htmlFor="in">
            Сделать комнату приватной
          </label>
        </div>
        <div className="start-game-block__buttons">
          <button className="button-medium-unfilled" onClick={f=>f}>Пригласить</button>
          <button className="button-medium-filled" onClick={f=>f}>Начать</button>
        </div>
      </div>)}
      {!isAdmin && (<div className="start-game-block">
        <p className="text">Ждем когда ведущий запустит игру...</p>
      </div>)}      
    </div>
  )
}

export default PlayerArea
