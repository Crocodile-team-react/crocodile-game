import React from 'react';
import Avatar from '../Avatar';

function Player(props) {
  return (
    <li className="player-list__block__item">
      <Avatar avatar={props.avatar} userName={props.name}/>
      <span className="score">
        <span className="point-count">{props.pointCount}</span>
        <span className="coin"></span>
      </span>
    </li>
  );
}

export default Player;
