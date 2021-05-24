import React from 'react';
import { useSelector } from 'react-redux';

function Timer() {
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  const [counter, setCounter] = React.useState(190);
  React.useEffect(() => {
    if (isGameStarted) {
      const timer = setInterval(() => {
        setCounter((prev) => {
          return prev - 1;
        });
        if (counter <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }
  }, [isGameStarted]);
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  return (
    <span className="timer-block">
      {minutes>10?minutes:'0'+minutes}:{seconds>10?seconds:'0'+seconds}
    </span>
  );
}

export default Timer;