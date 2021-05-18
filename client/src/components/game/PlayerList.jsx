import React from 'react'
import Player from './Player';

function PlayerList() {
  return (
    
      <div >
        <div className="list-plaers">Plaers 3 of 5</div>
        <ul className="ul-plaers">
          <li>
            <Player />
          </li>
          <li>
            <Player />
          </li>
          <li>
            <Player />
          </li>
        </ul>
      </div>
    
  )
}

export default PlayerList
