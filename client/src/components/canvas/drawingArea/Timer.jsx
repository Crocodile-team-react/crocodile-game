import React from 'react';

function Timer(props) {
  return (
    <span className="timer-block">
      {props.minutes>10?props.minutes:'0'+props.minutes}:{props.seconds>10?props.seconds:'0'+props.seconds}
    </span>
  );
}

export default Timer;